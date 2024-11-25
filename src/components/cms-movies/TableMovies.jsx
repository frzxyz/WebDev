import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { TiEdit, TiTrash } from "react-icons/ti";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import StatusPopup from "../StatusPopup";
import Pagination from 'react-bootstrap/Pagination'; 

function TableMovies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
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
      const response = await axios.get("/api/cms/movies");
      setMovies(response.data);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      showPopup("error", "Failed to fetch movies. Please try again.");
    }
  };

  // Fetch genres from the API
  const fetchGenres = async () => {
    try {
      const response = await axios.get("/api/cms/genre");
      setGenres(response.data);
    } catch (error) {
      console.error("Failed to fetch genres:", error);
      showPopup("error", "Failed to fetch genres. Please try again.");
    }
  };

  // Fetch actors from the API
  const fetchActors = async () => {
    try {
      const response = await axios.get("/api/cms/actors");
      setActors(response.data);
    } catch (error) {
      console.error("Failed to fetch actors:", error);
      showPopup("error", "Failed to fetch actors. Please try again.");
    }
  };

  // Delete movie function
  const deleteMovie = async (id) => {
    const onConfirm = async () => {
      try {
        const response = await axios.delete(`/api/cms/movies?id=${id}`);
        if (response.status === 200) {
          setMovies(movies.filter((movie) => movie.id !== id));
          showPopup("success", response.data.message || "Movie deleted successfully!");
        } else {
          throw new Error("Unexpected response status");
        }
      } catch (error) {
        const errorMessage = error.response?.data?.error || "Server error occurred. Please try again.";
        showPopup("error", errorMessage);
      }
    };

    showPopup("warning", "Are you sure you want to delete this movie?", onConfirm, true);
  };

  // Initial data fetch
  useEffect(() => {
    fetchMovies();
    fetchGenres();
    fetchActors();
  }, []);

  const handleEditClick = (movie) => {
    setEditingMovie({
      ...movie,
      genre: movie.genres.map((g) => g.id),
      actors: movie.actors.map((a) => a.id),
    });
    setEditModalVisible(true);
  };

  const saveEdit = async () => {
    if (!editingMovie) return;

    try {
      const response = await axios.put("/api/cms/movies", {
        id: editingMovie.id,
        title: editingMovie.title,
        year: editingMovie.year,
        synopsis: editingMovie.synopsis,
        urlPhoto: editingMovie.urlPhoto,
        genre: editingMovie.genre,
        actors: editingMovie.actors,
      });

      if (response.status >= 200 && response.status < 300) {
        setMovies(
          movies.map((movie) =>
            movie.id === editingMovie.id ? { ...movie, ...editingMovie } : movie
          )
        );
        showPopup("success", "Movie updated successfully!");
        setEditModalVisible(false);
      } else {
        showPopup("error", "Failed to update movie.");
      }
    } catch (error) {
      console.error("Error updating movie:", error);
      showPopup("error", "Failed to update movie. Please try again.");
    }
  };

  const handleEditModalClose = () => {
    setEditModalVisible(false);
    setEditingMovie(null);
  };

  const handleInputChange = (field, value) => {
    setEditingMovie({ ...editingMovie, [field]: value });
  };

  const toggleGenre = (genreId) => {
    setEditingMovie((prev) => {
      const updatedGenres = prev.genre.includes(genreId)
        ? prev.genre.filter((id) => id !== genreId)
        : [...prev.genre, genreId];
      return { ...prev, genre: updatedGenres };
    });
  };

  const toggleActor = (actorId) => {
    setEditingMovie((prev) => {
      const updatedActors = prev.actors.includes(actorId)
        ? prev.actors.filter((id) => id !== actorId)
        : [...prev.actors, actorId];
      return { ...prev, actors: updatedActors };
    });
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
            <th>Genres</th>
            <th>Actors</th>
            <th>Synopsis</th>
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
                <td>{movie.title}
                </td>
                <td>{movie.year}
                </td>
                <td>{movie.genres.map(genre => genre.name).join(', ')}</td>
                <td>{movie.actors.map(actor => actor.name).join(', ')}</td>
                <td>{movie.synopsis}
              </td>
              <td>
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

      {/* Edit Modal */}
      {editingMovie && (
        <Modal show={editModalVisible} onHide={handleEditModalClose} className="custom-modal-background">
          <Modal.Header closeButton>
            <Modal.Title>Edit Movie</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
            <Form.Group className="mb-3">
                <Form.Label>urlPhoto</Form.Label>
                <Form.Control
                  type="text"
                  value={editingMovie.urlPhoto}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={editingMovie.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Year</Form.Label>
                <Form.Control
                  type="number"
                  value={editingMovie.year}
                  onChange={(e) => handleInputChange("year", e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Genres</Form.Label>
                <div>
                  {genres.map((genre) => (
                    <Form.Check
                      key={genre.id}
                      type="checkbox"
                      label={genre.name}
                      checked={editingMovie.genre.includes(genre.id)}
                      onChange={() => toggleGenre(genre.id)}
                    />
                  ))}
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Actors</Form.Label>
                <div>
                  {actors.map((actor) => (
                    <Form.Check
                      key={actor.id}
                      type="checkbox"
                      label={actor.name}
                      checked={editingMovie.actors.includes(actor.id)}
                      onChange={() => toggleActor(actor.id)}
                    />
                  ))}
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditModalClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={saveEdit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default TableMovies;