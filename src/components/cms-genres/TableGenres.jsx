import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { TiEdit, TiTrash } from "react-icons/ti";
import "bootstrap/dist/css/bootstrap.min.css";

import "../../styles/Countries.css";
import "../../styles/Awards.css";
import { useEdit } from "../cms-global/cms-edit";

function TableGenres() {
  const { cancelEdit, edit, saveEdit } = useEdit(); // Destructure from custom hook

  const [genres, setGenres] = useState([
    { genreId: 1, genreName: "Action", description: "Fast-paced and exciting" },
    { genreId: 2, genreName: "Drama", description: "Emotionally intense narratives" },
    { genreId: 3, genreName: "Comedy", description: "Light-hearted and humorous" },
  ]);

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

  return (
    <div className="table-genres">
      <h4>List of Genres</h4>

      <div className="sort-buttons">
        <button className="sort-button" onClick={() => sortBy("genreName")}>
          Sort By Genre Name {sortConfig.key === "genreName" && (sortConfig.direction === "asc" ? "↑" : "↓")}
        </button>
        <button className="sort-button" onClick={() => sortBy("description")}>
          Sort By Description {sortConfig.key === "description" && (sortConfig.direction === "asc" ? "↑" : "↓")}
        </button>
      </div>

      <Table responsive striped>
        <thead>
          <tr>
            <th>Id</th>
            <th onClick={() => sortBy("genreName")} style={{ cursor: "pointer" }}>
              Genre Name {sortConfig.key === "genreName" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => sortBy("description")} style={{ cursor: "pointer" }}>
              Description {sortConfig.key === "description" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {genres.map((genre) => (
            <tr key={genre.genreId}>
              <td>{genre.genreId}</td>
              <td>{genre.genreName}</td>
              <td>{genre.description}</td>
              <td>
                <button className="btn btn-success mx-2" onClick={() => edit(genre.genreId)}>
                  <span className="d-flex align-items-center">
                    <TiEdit className="me-2" />
                    Edit
                  </span>
                </button>
                <button className="btn btn-success mx-2 d-none" id={`cancelBtn${genre.genreId}`} onClick={() => cancelEdit(genre.genreId)}>
                  <span className="d-flex align-items-center">
                    <TiEdit className="me-2" />
                    Cancel
                  </span>
                </button>
                <button className="btn btn-success mx-2 d-none" id={`saveBtn${genre.genreId}`} onClick={() => saveEdit(genre.genreId)}>
                  <span className="d-flex align-items-center">
                    <TiEdit className="me-2" />
                    Save
                  </span>
                </button>
                <button className="btn btn-danger" onClick={() => {
                  const filteredGenres = genres.filter(g => g.genreId !== genre.genreId);
                  setGenres(filteredGenres);
                }}>
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
