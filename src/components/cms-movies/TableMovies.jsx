import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { TiEdit, TiTrash } from "react-icons/ti";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination'; 
import StatusPopup from "../StatusPopup";

function TableMovies() {
  const [movies, setMovies] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);  
  const [moviesPerPage] = useState(30);
  const [newTitle, setNewTitle] = useState("");
  const [newYear, setNewYear] = useState("");
  const [newSynopsis, setNewSynopsis] = useState("");
  const [newUrlPhoto, setNewUrlPhoto] = useState("");
  const [editingMovieId, setEditingMovieId] = useState(null);
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
      const response = await axios.get('/api/cms/movies');
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
    const onConfirm = async () => {
      try {
        const response = await axios.delete(`/api/cms/movies?id=${id}`);
        if (response.status === 200) {
          setMovies(movies.filter((movie) => movie.id !== id)); // Remove from state
          showPopup("success", response.data.message || "Movie deleted successfully!");
        } else {
          throw new Error("Unexpected response status");
        }
      } catch (error) {
        const errorMessage = error.response?.data?.error || "Server error occurred. Please try again.";
        showPopup("error", errorMessage);
      }
    };
  
    // Panggil showPopup untuk konfirmasi
    showPopup("warning", "Are you sure you want to delete this movie?", onConfirm, true);
  };  

  const saveEdit = async (id) => {
    if (!id) {
      showPopup("error", "Missing movie ID for update."); 
      return;
    }

    try {
      const response = await axios.put('/api/cms/movies', {
        id,
        title: newTitle.trim(),
        year: parseInt(newYear, 10),
        synopsis: newSynopsis.trim(),
        urlPhoto: newUrlPhoto.trim(),
      });

      if (response.status >= 200 && response.status < 300) {
        setMovies(
          movies.map((movie) =>
            movie.id === id
              ? { ...movie, title: newTitle, year: newYear, synopsis: newSynopsis, urlPhoto: newUrlPhoto }
              : movie
          )
        );
        showPopup("success", response.data.message || "Movie updated successfully!");
        setEditingMovieId(null); // Exit edit mode
      } else {
        showPopup("error", response.data.message || "Failed to update movie.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error|| "Failed to update movie. Please try again.";
      showPopup("error", errorMessage);
    }
  };

  const handleEditClick = (movie) => {
    setEditingMovieId(movie.id);
    setNewTitle(movie.title);
    setNewYear(movie.year);
    setNewSynopsis(movie.synopsis);
    setNewUrlPhoto(movie.urlPhoto);
  };

  const handleCancelEdit = () => {
    setEditingMovieId(null);
    setNewTitle("");
    setNewYear("");
    setNewSynopsis("");
    setNewUrlPhoto("");
  };

  // Filter movies based on the search query
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="table-countries">
      <h5>List of Movies</h5>

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
          <button className="sort-button me-2" onClick={() => sortBy("title")}>
            Sort By Title {sortConfig.key === "title" && (sortConfig.direction === "asc" ? "↑" : "↓")}
          </button>
          <button className="sort-button" onClick={() => sortBy("year")}>
            Sort By Year {sortConfig.key === "year" && (sortConfig.direction === "asc" ? "↑" : "↓")}
          </button>
        </div>
        <input
          type="text"
          placeholder="Search by Title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control search-form w-25"
        />
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
            <th>
              Genres
            </th>
            <th>
              Actors
            </th>
            <th>
              Synopsis
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
                {editingMovieId === movie.id ? (
                  <input
                    type="text"
                    value={newUrlPhoto}
                    onChange={(e) => setNewUrlPhoto(e.target.value)}
                  />
                ) : (
                  <img src={movie.urlPhoto || "default_poster_url.jpg"} alt={movie.title} width="100" />
                )}
                </td>
                <td>
                  {editingMovieId === movie.id ? (
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                ) : (movie.title)}
                </td>
                <td>
                  {editingMovieId === movie.id ? (
                  <input
                    type="number"
                    value={newYear}
                    onChange={(e) => setNewYear(e.target.value)}
                  />
                ) : (movie.year)}
                </td>
                <td>{movie.genres.map(genre => genre.name).join(', ')}</td>
                <td>{movie.actors.map(actor => actor.name).join(', ')}</td>
                <td>
                {editingMovieId === movie.id ? (
                  <input
                    type="text"
                    value={newSynopsis}
                    onChange={(e) => setNewSynopsis(e.target.value)}
                  />
                ) : (
                  movie.synopsis
                )}
              </td>
              <td>
                {editingMovieId === movie.id ? (
                  <>
                    <button className="btn btn-success mx-2" onClick={() => saveEdit(movie.id)}>
                      Save
                    </button>
                    <button className="btn btn-warning mx-2" onClick={handleCancelEdit}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-success mx-2" onClick={() => handleEditClick(movie)}>
                      <TiEdit className="me-2" />
                      Edit
                    </button>
                    <button className="btn btn-danger mx-2" onClick={() => deleteMovie(movie.id)}>
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
                No movies available
              </td>
            </tr>
          )
        }
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
