import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { TiEdit, TiTrash } from "react-icons/ti";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Countries.css";
import "../../styles/Awards.css";
import { useEdit } from "../cms-global/cms-edit"; 
import Pagination from 'react-bootstrap/Pagination'; 
import StatusPopup from "../StatusPopup";

function TableActors() {
  const { cancelEdit, edit } = useEdit();
  const [actors, setActors] = useState([]);
  const [editingActorId, setEditingActorId] = useState(null);
  const [newName, setNewName] = useState("");
  const [newUrlPhoto, setNewUrlPhoto] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);  
  const [actorsPerPage] = useState(30);
  const [searchQuery, setSearchQuery] = useState("");

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
  
  // Fungsi untuk melakukan sorting
  const sortBy = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedActors = [...actors].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setActors(sortedActors);
  };

  // Fetch actors from the API
  const fetchActors = async () => {
    try {
      const response = await axios.get('/api/cms/actors'); 
      setActors(response.data);
    } catch (error) {
      console.error("Failed to fetch actors:", error);
    }
  };

  // useEffect to fetch actors when the component is mounted
  useEffect(() => {
    fetchActors();
  }, []);

  // Handle delete actor (DELETE)
  const deleteActor = async (id) => {
    const onConfirm = async () => {
      try {
        const response = await axios.delete('/api/cms/actors', { params: { id } });
  
        if (response.status === 200) {
          setActors(actors.filter((actor) => actor.id !== id)); // Update state
          showPopup("success", response.data.message || "Actor deleted successfully!");
        }
      } catch (error) {
        const errorMessage = error.response?.data?.error || "Failed to delete actor.";
        showPopup("error", errorMessage);
      }
    };
  
    showPopup("warning", "Are you sure you want to delete this actor?", onConfirm, true);
  };  

  // Handle editing the actor name
  const handleEditClick = (actor) => {
    console.log("Editing actor:", actor);
    setEditingActorId(actor.id); 
    setNewName(actor.name); 
    setNewUrlPhoto(actor.photo || ""); 
};

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingActorId(null); 
    setNewName(""); 
    setNewUrlPhoto("");
  };

  // Handle save edit (PUT)
  const saveEdit = async (id) => {
    const trimmedName = newName.trim();
    const trimmedUrlPhoto = newUrlPhoto.trim();

    if (!trimmedName || !trimmedUrlPhoto) {
      showPopup("error", "Actor name and Url Photo cannot be empty.");
        return;
    }

    try {
        const response = await axios.put('/api/cms/actors', {
            id, 
            name: trimmedName,
            photo: trimmedUrlPhoto,
        });

        if (response.status >= 200 && response.status < 300) {
            setActors(
                actors.map((actor) =>
                    actor.id === id ? { ...actor, name: trimmedName, photo: trimmedUrlPhoto } : actor
                )
            );
            showPopup("success", "Actor updated successfully!");
        } else {
          showPopup("error", "Failed to update actor.");
        }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Failed to update actor.";
      showPopup("error", errorMessage);
    }

    setEditingActorId(null); 
};

  // Filter actors based on the search query
  const filteredActors = actors.filter(actors =>
    actors.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const indexOfLastActor = currentPage * actorsPerPage;
  const indexOfFirstActor = indexOfLastActor - actorsPerPage;
  const currentActors = filteredActors.slice(indexOfFirstActor, indexOfLastActor);

  const totalPages = Math.ceil(filteredActors.length / actorsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="table-countries">
      <h5>List of Actors</h5>

      {statusPopup.show && (
        <StatusPopup
          type={statusPopup.type}
          message={statusPopup.message}
          onClose={hidePopup}
          onConfirm={statusPopup.onConfirm}
          isConfirm={statusPopup.isConfirm}
        />
      )}

      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <button className="sort-button" onClick={() => sortBy("name")}>
          Sort By Name {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
          </button>
        </div>
        <input
          type="text"
          placeholder="Search by Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control search-form w-25"
        />
      </div>

      <Table responsive striped>
        <thead>
          <tr>
            <th>Id</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Country</th>
            <th>Movies Acted</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {currentActors.length > 0 ? (
          currentActors.map((actor, index) => (
            <tr key={actor.id} id={`row${actor.id}`}>
              <td>{indexOfFirstActor + index + 1}</td>
              <td>
                {editingActorId === actor.id ? (
                  <input
                    type="text"
                    value={newUrlPhoto}
                    onChange={(e) => setNewUrlPhoto(e.target.value)}
                  />
                ) : (
                  <img src={actor.photo || "default_poster_url.jpg"} alt={actor.name} width="100" />
                )}
              </td>
              <td>
                {editingActorId === actor.id ? (
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Enter new name"
                  />
                ) : (
                  actor.name
                )}
              </td>
              <td>{actor.country?.name}</td>
              <td>{actor.dramas.length > 0
                  ? actor.dramas.map(drama => drama.title).join(', ')
                  : 'No movies available'}
              </td>
              <td>
                {editingActorId === actor.id ? (
                  <>
                    <button className="btn btn-success mx-2" onClick={() => saveEdit(actor.id)}>
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
                      onClick={() => handleEditClick(actor)}
                    >
                      <TiEdit className="me-2" />
                      Edit
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteActor(actor.id)}
                    >
                      <TiTrash className="me-2" />
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" className="text-center">
              No actor available
            </td>
          </tr>
        )}
        </tbody>
      </Table>

      {/* Pagination Component */}
      <Pagination>
        {[...Array(totalPages).keys()].map(number => (
          <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
            {number + 1}
          </Pagination.Item>
        ))}
      </Pagination>

    </div>
  );
}

export default TableActors;
