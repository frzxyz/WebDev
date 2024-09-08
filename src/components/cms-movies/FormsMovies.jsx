import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Countries.css";
import "../../styles/Awards.css";

function FormsMovies({ onAddMovie }) {
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    genre: "",
    rating: "",
    views: "",
    status: "",
    poster: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddMovie(formData);
    setFormData({
      title: "",
      year: "",
      genre: "",
      rating: "",
      views: "",
      status: "",
      poster: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="add-movie">
      <h4>Add Movie</h4>
      <div className="card">
        <div className="card-body">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter movie title"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupYear">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="Enter release year"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupGenre">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                placeholder="Enter genre"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupRating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                step="0.1"
                min="0"
                max="5"
                placeholder="Enter movie rating"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupViews">
              <Form.Label>Views</Form.Label>
              <Form.Control
                type="number"
                name="views"
                value={formData.views}
                onChange={handleChange}
                placeholder="Enter number of views"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                placeholder="Enter status (e.g., Completed, Ongoing)"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPoster">
              <Form.Label>Poster URL</Form.Label>
              <Form.Control
                type="text"
                name="poster"
                value={formData.poster}
                onChange={handleChange}
                placeholder="Enter poster URL"
                required
              />
            </Form.Group>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default FormsMovies;
