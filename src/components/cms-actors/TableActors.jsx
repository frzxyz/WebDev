import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { TiEdit, TiTrash } from "react-icons/ti";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Countries.css";
import "../../styles/Awards.css";
import { useEdit } from "../cms-global/cms-edit"; 

function TableActors() {
  const { cancelEdit, edit } = useEdit();
  const [actors, setActors] = useState([]);
  const [editingActorId, setEditingActorId] = useState(null);
  const [newName, setNewName] = useState(""); // Store the new name during edit

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

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
      const response = await axios.get('/api/actors'); 
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
    const isConfirmed = window.confirm("Are you sure you want to delete this actor?");
    if (isConfirmed) {
      try {
        await axios.delete(`/api/actors?id=${id}`); 
        setActors(actors.filter((actor) => actor.id !== id)); 
        alert("Actor deleted successfully!");
      } catch (error) {
        console.error("Failed to delete actor:", error);
        alert("Failed to delete actor.");
      }
    }
  };

  // Handle editing the actor name
  const handleEditClick = (actorId, actorName) => {
    setEditingActorId(actorId); 
    setNewName(actorName); 
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingActorId(null); 
    setNewName(""); 
  };

  // Handle save edit (PUT)
  const saveEdit = async (id) => {
    if (!newName.trim()) {
      alert("Actor name cannot be empty.");
      return;
    }

    try {
      const response = await axios.put('/api/actors', {
        id, // Send actor ID
        name: newName, // Send updated actor name
      });

      if (response.status >= 200 && response.status < 300) {
        setActors(
          actors.map((actor) =>
            actor.id === id ? { ...actor, name: newName } : actor
          )
        );
        alert("Actor updated successfully!");
      } else {
        alert("Failed to update actor.");
      }
    } catch (error) {
      console.error("Error updating actor:", error);
      alert("Failed to update actor.");
    }

    setEditingActorId(null); 
  };

  return (
    <div className="table-countries">
      <h5>List of Actors</h5>

      <div className="sort-buttons">
        <button className="sort-button" onClick={() => sortBy("name")}>
          Sort By Name {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
        </button>
        <button className="sort-button" onClick={() => sortBy("movies")}>
          Sort By Movies {sortConfig.key === "movies" && (sortConfig.direction === "asc" ? "↑" : "↓")}
        </button>
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
          {actors.map((actor, index) => (
            <tr key={actor.id} id={`row${actor.id}`}>
              <td>{index + 1}</td>
              <td>
                <img src={actor.photo || "default_poster_url.jpg"} alt={actor.name} width="100" />
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
              <td>{actor.movies}</td>
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
                      onClick={() => handleEditClick(actor.id, actor.name)}
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
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TableActors;
