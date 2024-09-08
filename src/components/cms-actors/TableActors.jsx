import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { TiEdit, TiTrash } from "react-icons/ti";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Countries.css";
import "../../styles/Awards.css";

function TableActors() {
  const [actors, setActors] = useState([
    { id: 1, name: "Leonardo DiCaprio", movies: "Inception, Titanic", biography: "An American actor and producer." },
    { id: 2, name: "Meryl Streep", movies: "The Devil Wears Prada, Mamma Mia", biography: "One of the most talented actresses." },
    { id: 3, name: "Tom Hanks", movies: "Forrest Gump, Cast Away", biography: "Actor known for Forrest Gump." },
  ]);

  const [editActorId, setEditActorId] = useState(null); // Track which actor is being edited
  const [editFormData, setEditFormData] = useState({ name: "", movies: "", biography: "" });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // Handle sorting
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

  // Handle the edit click
  const handleEditClick = (actor) => {
    setEditActorId(actor.id);
    setEditFormData({ name: actor.name, movies: actor.movies, biography: actor.biography });
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditActorId(null);
  };

  // Handle save edit
  const handleSaveEdit = (actorId) => {
    const updatedActors = actors.map((actor) =>
      actor.id === actorId ? { ...actor, ...editFormData } : actor
    );
    setActors(updatedActors);
    setEditActorId(null); // Exit edit mode
  };

  // Handle form data change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  return (
    <div className="table-actors">
      <h4>List of Actors</h4>

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
            <th onClick={() => sortBy("name")} style={{ cursor: "pointer" }}>
              Name {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => sortBy("movies")} style={{ cursor: "pointer" }}>
              Movies Acted {sortConfig.key === "movies" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th>Biography</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {actors.map((actor) => (
            <tr key={actor.id} id={`row${actor.id}`}>
              <td>{actor.id}</td>
              <td>
                {editActorId === actor.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleFormChange}
                  />
                ) : (
                  actor.name
                )}
              </td>
              <td>
                {editActorId === actor.id ? (
                  <input
                    type="text"
                    name="movies"
                    value={editFormData.movies}
                    onChange={handleFormChange}
                  />
                ) : (
                  actor.movies
                )}
              </td>
              <td>
                {editActorId === actor.id ? (
                  <input
                    type="text"
                    name="biography"
                    value={editFormData.biography}
                    onChange={handleFormChange}
                  />
                ) : (
                  actor.biography
                )}
              </td>
              <td>
                {editActorId === actor.id ? (
                  <>
                    <button
                      className="btn btn-success mx-2"
                      onClick={() => handleSaveEdit(actor.id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-warning mx-2"
                      onClick={handleCancelEdit}
                    >
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
                      onClick={() => setActors(actors.filter((a) => a.id !== actor.id))}
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
