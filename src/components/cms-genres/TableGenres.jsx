import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { TiEdit, TiTrash } from "react-icons/ti";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import "../../styles/Countries.css";
import "../../styles/Awards.css";
import { useEdit } from "../cms-global/cms-edit";

function TableGenres() {
  const { cancelEdit, edit} = useEdit(); // Destructure from custom hook
  const [genres, setGenres] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

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
      const response = await axios.get('/api/genre'); // Mengambil semua genre
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
    const isConfirmed = window.confirm("Apakah Anda yakin ingin menghapus data ini?");

    if (isConfirmed) {
      try {
        await axios.delete('/api/genre', { data: { id } });
        setGenres(genres.filter((genre) => genre.id !== id)); // Update state setelah dihapus
        alert("Genre deleted successfully!");
      } catch (error) {
        console.error("Failed to delete genre", error);
        alert("Failed to delete genre.");
      }
    } else {
      console.log("Penghapusan dibatalkan oleh pengguna.");
    }
  };

  // Fungsi untuk menyimpan perubahan (PUT)
  const saveEdit = async (id) => {
    const tr = document.getElementById(`row${id}`);
    const tds = tr.getElementsByTagName("td");
    let updatedGenreName = ""; 
    let updatedGenreDesc = "";
    
    for (let i = 1; i < tds.length - 1; i++) {
      const td = tds[i];
      const input = td.getElementsByTagName("input")[0];
      if (input) {
        updatedGenreName = input.value;
        td.innerHTML = updatedGenreName; // Ubah input menjadi teks biasa
        updatedGenreDesc = input.value;
        td.innerHTML = updatedGenreDesc;
      }
    }

    // Kirim request PUT ke API untuk menyimpan perubahan
    try {
      const response = await axios.put('/api/genre', {
        id, // Kirim ID negara yang akan diperbarui
        name: updatedGenreName, // Kirim nama negara yang baru
        description: updatedGenreDesc
      });

      if (response.status >= 200 && response.status < 300) {
        // Update state countries untuk mencerminkan perubahan
        setGenres(
          genres.map((genre) =>
            genre.id === id ? { ...genre, name: updatedCountryName, description: updatedGenreDesc } : genre
          )
        );
        alert("Genre updated successfully!");
      } else {
        alert("Failed to update genre.");
      }
    } catch (error) {
      console.error("Error updating genre:", error);
      alert("Failed to update genre.");
    }

    // Ubah tombol setelah menyimpan
    const editBtn = document.getElementById(`editBtn${id}`);
    const saveBtn = document.getElementById(`saveBtn${id}`);
    const deleteBtn = document.getElementById(`deleteBtn${id}`);
    const cancelBtn = document.getElementById(`cancelBtn${id}`);

    if (editBtn) editBtn.classList.remove("d-none");
    if (saveBtn) saveBtn.classList.add("d-none");
    if (deleteBtn) deleteBtn.classList.remove("d-none");
    if (cancelBtn) cancelBtn.classList.add("d-none");
  };

  return (
    <div className="table-countries">
      <h5>List of Genres</h5>

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
            <th onClick={() => sortBy("name")} style={{ cursor: "pointer" }}>
              Genre Name {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => sortBy("description")} style={{ cursor: "pointer" }}>
              Description {sortConfig.key === "description" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {genres.map((genre, index) => (
            <tr key={genre.id} id={`row${genre.id}`}>
              <td>{index + 1}</td>
              <td>{genre.name}</td>
              <td>{genre.description}</td>
              <td>
                <button className="btn btn-success mx-2" onClick={() => edit(genre.id)}>
                  <span className="d-flex align-items-center">
                    <TiEdit className="me-2" />
                    Edit
                  </span>
                </button>
                <button className="btn btn-success mx-2 d-none" id={`cancelBtn${genre.id}`} onClick={() => cancelEdit(genre.id)}>
                  <span className="d-flex align-items-center">
                    <TiEdit className="me-2" />
                    Cancel
                  </span>
                </button>
                <button className="btn btn-success mx-2 d-none" id={`saveBtn${genre.id}`} onClick={() => saveEdit(genre.id)}>
                  <span className="d-flex align-items-center">
                    <TiEdit className="me-2" />
                    Save
                  </span>
                </button>
                <button className="btn btn-danger" onClick={() => deleteGenre(genre.id)}>
                  <span className="d-flex align-items-center">
                    <TiTrash className="me-2" />
                    Delete
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TableGenres;
