import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { TiEdit, TiTrash } from "react-icons/ti";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import StatusPopup from "../StatusPopup";

function TableMovies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const [statusPopup, setStatusPopup] = useState({
    show: false,
    type: "",
    message: "",
  });

  const showPopup = (type, message) => {
    setStatusPopup({ show: true, type, message });
  };

  const hidePopup = () => {
    setStatusPopup({ show: false, type: "", message: "" });
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
    if (window.confirm("Are you sure you want to delete this movie?")) {
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
    }
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

  return (
    <div className="table-countries">
      <h5>List of Movies</h5>

      {statusPopup.show && (
        <StatusPopup
          type={statusPopup.type}
          message={statusPopup.message}
          onClose={hidePopup}
        />
      )}

      <Table responsive striped bordered>
        <thead>
          <tr>
            <th>Id</th>
            <th>Poster</th>
            <th>Title</th>
            <th>Year</th>
            <th>Genres</th>
            <th>Actors</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, index) => (
            <tr key={movie.id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={movie.urlPhoto || "default_poster_url.jpg"}
                  alt={movie.title}
                  width="100"
                />
              </td>
              <td>{movie.title}</td>
              <td>{movie.year}</td>
              <td>
                {movie.genres.map((genre) => genre.name).join(", ")}
              </td>
              <td>
                {movie.actors.map((actor) => actor.name).join(", ")}
              </td>
              <td>
                <button
                  className="btn btn-success mx-2"
                  onClick={() => handleEditClick(movie)}
                >
                  <TiEdit className="me-2" />
                  Edit
                </button>
                <button 
                  className="btn btn-danger mx-2"
                  onClick={() => deleteMovie(movie.id)}
                >
                  <TiTrash className="me-2" />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      {editingMovie && (
        <Modal show={editModalVisible} onHide={handleEditModalClose}>
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