import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { TiEdit, TiTrash } from "react-icons/ti";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { useEdit } from "../cms-global/cms-edit";
import Pagination from 'react-bootstrap/Pagination'; 

function TableMovies() {
  const { cancelEdit, edit } = useEdit();
  const [movies, setMovies] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);  
  const [moviesPerPage] = useState(30);
  
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

  // Fetch movies from the API
  const fetchMovies = async () => {
    try {
      const response = await axios.get('/api/movies');
      setMovies(response.data); // Set data from API
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };

  // Fetch movies when the component is mounted
  useEffect(() => {
    fetchMovies();
  }, []);

  // Delete movie
  const deleteMovie = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this movie?");
    
    if (isConfirmed) {
      try {
        await axios.delete(`/api/movies?id=${id}`);
        setMovies(movies.filter(movie => movie.id !== id)); // Remove movie from state
        alert("Movie deleted successfully!");
      } catch (error) {
        console.error("Failed to delete movie:", error);
        alert("Failed to delete movie.");
      }
    }
  };

  const saveEdit = async (id) => {
    const tr = document.getElementById(`row${id}`);
    const tds = tr.getElementsByTagName("td");

    let updatedTitle = "";
    let updatedYear = "";

    for (let i = 1; i < tds.length - 1; i++) {
      const td = tds[i];
      const input = td.getElementsByTagName("input")[0];
      if (input) {
        if (i === 1) {
          updatedTitle = input.value;
        } else if (i === 2) {
          updatedYear = input.value;
        }
        td.innerHTML = input.value; // Change input back to plain text
      }
    }

    // Send PUT request to update the movie
    try {
      const response = await axios.put('/api/movies', {
        id,
        title: updatedTitle,
        year: updatedYear,
      });

      if (response.status >= 200 && response.status < 300) {
        setMovies(
          movies.map((movie) =>
            movie.id === id ? { ...movie, title: updatedTitle, year: updatedYear } : movie
          )
        );
        alert("Movie updated successfully!");
      } else {
        alert("Failed to update movie.");
      }
    } catch (error) {
      console.error("Error updating movie:", error);
      alert("Failed to update movie.");
    }

    // Toggle the edit and save buttons
    const editBtn = document.getElementById(`editBtn${id}`);
    const saveBtn = document.getElementById(`saveBtn${id}`);
    const deleteBtn = document.getElementById(`deleteBtn${id}`);
    const cancelBtn = document.getElementById(`cancelBtn${id}`);

    if (editBtn) editBtn.classList.remove("d-none");
    if (saveBtn) saveBtn.classList.add("d-none");
    if (deleteBtn) deleteBtn.classList.remove("d-none");
    if (cancelBtn) cancelBtn.classList.add("d-none");
  };

  // Pagination
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          <th>Id</th>
            <th>Poster</th>
            <th onClick={() => sortBy("title")} style={{ cursor: "pointer" }}>
              Title {sortConfig.key === "title" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => sortBy("year")} style={{ cursor: "pointer" }}>
              Year {sortConfig.key === "year" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => sortBy("genres")} style={{ cursor: "pointer" }}>
              Genres {sortConfig.key === "genres" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => sortBy("actors")} style={{ cursor: "pointer" }}>
              Actors {sortConfig.key === "actors" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => sortBy("synopsis")} style={{ cursor: "pointer" }}>
              Synopsis {sortConfig.key === "synopsis" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentMovies.length > 0 ? (
            currentMovies.map((movie, index) => (
              <tr key={movie.id}>
                <td>{indexOfFirstMovie + index + 1}</td>
                <td>
                  <img src={movie.urlPhoto || "default_poster_url.jpg"} alt={movie.title} width="100" />
                </td>
                <td>{movie.title}</td>
                <td>{movie.year}</td>
                <td>{movie.genres.map(genre => genre.name).join(', ')}</td>
                <td>{movie.actors.map(actor => actor.name).join(', ')}</td>
                <td>{movie.synopsis}</td>
                <td>
                <button
                  className="btn btn-success mx-2"
                  id={`editBtn${movie.id}`}
                  onClick={() => edit(movie.id)}
                >
                  <span className="d-flex align-items-center">
                    <TiEdit className="me-2" />
                    Edit
                  </span>
                </button>
                <button
                  className="btn btn-success mx-2 d-none"
                  id={`cancelBtn${movie.id}`}
                  onClick={() => cancelEdit(movie.id)}
                >
                  <span className="d-flex align-items-center">
                    <TiEdit className="me-2" />
                    Cancel
                  </span>
                </button>
                <button className="btn btn-success mx-2 d-none" id={`saveBtn${movie.id}`}
                  onClick={() => saveEdit(movie.id)}>
                  <span className="d-flex align-items-center">
                    <TiEdit className="me-2" />
                    Save
                  </span>
                </button>
                <button 
                  className="btn btn-danger mx-2"
                  id={`deleteBtn${movie.id}`}
                  onClick={() => deleteMovie(movie.id)}
                  >
                  <span className="d-flex align-items-center">
                    <TiTrash className="me-2" />
                    Delete
                  </span>
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

export default TableMovies;
