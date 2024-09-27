import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { TiEdit, TiTrash } from "react-icons/ti";
import "bootstrap/dist/css/bootstrap.min.css";
import { dramas } from "../../data/dramas"; // Import directly

function TableMovies() {
  const [movies, setMovies] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Initialize movies with dramas data when component mounts
  useEffect(() => {
    setMovies(dramas); // Use dramas from the import
  }, []);

  // Function for sorting the table
  const sortBy = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedMovies = [...movies].sort((a, b) => {
      if (typeof a[key] === "number" && typeof b[key] === "number") {
        return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
      } else {
        return direction === "asc"
          ? a[key].toString().localeCompare(b[key].toString())
          : b[key].toString().localeCompare(a[key].toString());
      }
    });

    setSortConfig({ key, direction });
    setMovies(sortedMovies);
  };

  return (
    <div className="table-countries">
      <h5>List of Dramas</h5>

      <div className="sort-buttons">
        <button className="sort-button" onClick={() => sortBy("title")}>
          Sort By Title {sortConfig.key === "title" && (sortConfig.direction === "asc" ? "↑" : "↓")}
        </button>
        <button className="sort-button" onClick={() => sortBy("year")}>
          Sort By Year {sortConfig.key === "year" && (sortConfig.direction === "asc" ? "↑" : "↓")}
        </button>
      </div>

      <Table responsive striped bordered>
        <thead>
          <tr>
            <th>Poster</th>
            <th onClick={() => sortBy("title")} style={{ cursor: "pointer" }}>
              Title {sortConfig.key === "title" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => sortBy("year")} style={{ cursor: "pointer" }}>
              Year {sortConfig.key === "year" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => sortBy("genre")} style={{ cursor: "pointer" }}>
              Genre {sortConfig.key === "genre" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => sortBy("rating")} style={{ cursor: "pointer" }}>
              Rating {sortConfig.key === "rating" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => sortBy("views")} style={{ cursor: "pointer" }}>
              Views {sortConfig.key === "views" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <tr key={movie.id}>
                <td>
                  <img src={movie.poster} alt={movie.title} width="100" />
                </td>
                <td>{movie.title}</td>
                <td>{movie.year}</td>
                <td>{movie.genre}</td>
                <td>{movie.rating}</td>
                <td>{movie.views}</td>
                <td>{movie.status || "N/A"}</td>
                <td>
                  <button className="btn btn-success mx-2">
                    <TiEdit className="me-2" />
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      const updatedMovies = movies.filter((m) => m.id !== movie.id);
                      setMovies(updatedMovies);
                    }}
                  >
                    <TiTrash className="me-2" />
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No movies available
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default TableMovies;
