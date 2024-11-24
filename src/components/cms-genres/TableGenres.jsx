import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { TiEdit, TiTrash } from "react-icons/ti";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "../../styles/Countries.css";
import "../../styles/Awards.css";
import { useEdit } from "../cms-global/cms-edit";
import StatusPopup from "../StatusPopup";

function TableGenres() {
  const { cancelEdit} = useEdit(); // Destructure from custom hook
  const [genres, setGenres] = useState([]);
  const [editingGenreId, setEditingGenreId] = useState(null);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const [statusPopup, setStatusPopup] = useState({
    show: false,
    type: "",
    message: "",
    onConfirm: null,
    isConfirm: false,
  });  
  
  const showPopup = (type, message, onConfirm = null, isConfirm = false) => {
    setStatusPopup({ show: true, type, message, onConfirm, isConfirm });
  };  
  
  const hidePopup = () => {
    setStatusPopup({ show: false, type: "", message: "", onConfirm: null, isConfirm: false });
  };

  // Sorting function
  const sortBy = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedGenres = [...genres].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setSortConfig({ key, direction });
    setGenres(sortedGenres);
  };

  // Fungsi untuk mengambil data genres dari API
  const fetchGenres = async () => {
    try {
      const response = await axios.get('/api/cms/genre'); // Mengambil semua genre
      setGenres(response.data);
    } catch (error) {
      console.error("Failed to fetch genres:", error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  // Fungsi untuk menghapus genre
  const deleteGenre = async (id) => {
    const onConfirm = async () => {
      try {
        const response = await axios.delete('/api/cms/genre', { data: { id } });
  
        if (response.status === 200) {
          setGenres(genres.filter((genre) => genre.id !== id)); // Update state
          showPopup("success", response.data.message || "Genre deleted successfully!");
        } else {
          throw new Error("Unexpected response");
        }
      } catch (error) {
        showPopup("error", error.response?.data?.error || "Failed to delete genre.");
      }
    };

    showPopup("warning", "Are you sure you want to delete this genre?", onConfirm, true);
  };

  // Handle edit button click
  const handleEditClick = (genreId, genreName, genreDesc) => {
    setEditingGenreId(genreId);
    setNewName(genreName);
    setNewDescription(genreDesc);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingGenreId(null);
    setNewName("");
    setNewDescription("");
  };

  // Save edited genre (PUT)
  const saveEdit = async (id) => {
    if (!newName.trim() || !newDescription.trim()) {
      showPopup("error", "Genre name and description cannot be empty.");
      return;
    }

    try {
      const response = await axios.put("/api/cms/genre", {
        id,
        name: newName,
        description: newDescription,
      });

      if (response.status >= 200 && response.status < 300) {
        setGenres(
          genres.map((genre) =>
            genre.id === id ? { ...genre, name: newName, description: newDescription } : genre
          )
        );
        showPopup("success", "Genre updated successfully!");
      } else {
        showPopup("error", "Failed to update genre.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Failed to update actor.";
      showPopup("error", errorMessage);
    }

    handleCancelEdit();
  };

  return (
    <div className="table-countries">
      <h5>List of Genres</h5>

      {statusPopup.show && (
          <StatusPopup
            type={statusPopup.type}
            message={statusPopup.message}
            onClose={hidePopup}
            onConfirm={statusPopup.onConfirm}
            isConfirm={statusPopup.isConfirm}
          />
        )}

      <div className="sort-buttons">
        <button className="sort-button" onClick={() => sortBy("name")}>
          Sort By Genre Name {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
        </button>
        <button className="sort-button" onClick={() => sortBy("description")}>
          Sort By Description {sortConfig.key === "description" && (sortConfig.direction === "asc" ? "↑" : "↓")}
        </button>
      </div>

      <Table responsive striped>
        <thead>
          <tr>
            <th>Id</th>
            <th>Genre Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {genres.map((genre, index) => (
            <tr key={genre.id} id={`row${genre.id}`}>
              <td>{index + 1}</td>
              <td>
                {editingGenreId === genre.id ? (
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Enter new genre name"
                  />
                ) : (
                  genre.name
                )}
              </td>
              <td>
                {editingGenreId === genre.id ? (
                  <input
                    type="text"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Enter new description"
                  />
                ) : (
                  genre.description
                )}
              </td>
              <td>
                {editingGenreId === genre.id ? (
                  <>
                    <button className="btn btn-success mx-2" onClick={() => saveEdit(genre.id)}>
                      Save
                    </button>
                    <button className="btn btn-warning mx-2" onClick={handleCancelEdit}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-success mx-2"
                      onClick={() => handleEditClick(genre.id, genre.name, genre.description)}
                    >
                      <TiEdit className="me-2" />
                      Edit
                    </button>
                    <button className="btn btn-danger mx-2" onClick={() => deleteGenre(genre.id)}>
                      <TiTrash className="me-2" />
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TableGenres;
