import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Countries.css";
import "../../styles/Awards.css";

function FormsMovies({ onAddMovie }) {
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    genre: [],
    rating: "",
    views: "",
    status: "",
    poster: "",
    countryId: "",
    actors: [],
  });

  const [genres, setGenres] = useState([]);
  const [countries, setCountries] = useState([]);
  const [actors, setActors] = useState([]);
  const [selectedActors, setSelectedActors] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch("/api/genre");
      const data = await res.json();
      setGenres(data);
    };
    const fetchCountries = async () => {
      const res = await fetch("/api/countries");
      const data = await res.json();
      setCountries(data);
    };
    const fetchActors = async () => {
      try {
        const res = await fetch("/api/actors");
        const data = await res.json();
        console.log("Actors fetched: ", data); // Add this line to check if actors are being fetched
        setActors(data);
      } catch (error) {
        console.error('Failed to fetch actors', error);
      }
    };

    fetchGenres();
    fetchCountries();
    fetchActors();
  }, []);

  const handleGenreChange = (genreId) => {
    setFormData((prevFormData) => {
      const updatedGenres = prevFormData.genre.includes(genreId)
        ? prevFormData.genre.filter((id) => id !== genreId)
        : [...prevFormData.genre, genreId];
      return { ...prevFormData, genre: updatedGenres };
    });
  };

  const handleActorSelect = (e) => {
    const actor = actors.find((actor) => actor.name === e.target.value);
  
    if (actor) {
      // Check if the actor is already selected
      if (!selectedActors.some((selectedActor) => selectedActor.id === actor.id)) {
        setSelectedActors([...selectedActors, actor]);
        setFormData((prevFormData) => ({
          ...prevFormData,
          actors: [...prevFormData.actors, actor.id],
        }));
      } else {
        console.error('Actor is already selected');
      }
    } else {
      console.error('Actor not found');
    }
  };

  const handleAddMovie = async (movieData) => {
    try {
      const response = await fetch('/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData),
      });
  
      if (response.ok) {
        const newMovie = await response.json();
        console.log('Movie successfully added:', newMovie);
      } else {
        console.error('Failed to add movie');
      }
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData),
      });

      if (response.ok) {
        const newMovie = await response.json();
        console.log('Movie successfully added:', newMovie);
        alert('Movie successfully added');
        setFormData({
          title: "",
          year: "",
          genre: [],
          rating: "",
          views: 0,
          status: "",
          poster: "",
          countryId: "",
          actors: [],
        });
      } else {
        console.error('Failed to add movie');
      }
    } catch (error) {
      console.error('Error adding movie:', error);
      alert('Failed to add movie');
    }
    
    setShowModal(false); // Close modal on submit
  };
  
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div className="col-2 col-10 px-md-4">
      {/* Button to trigger modal */}
      <Button variant="primary" onClick={handleShow}>
        Add Movie
      </Button>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} >
          <Row>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="formGroupPoster">
                  <Form.Label>Poster URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="poster"
                    onChange={(e) => setFormData({ ...formData, urlPhoto: e.target.value })}
                    placeholder="Enter poster URL"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formGroupTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter movie title"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="formGroupAlternativeTitle">
                  <Form.Label>Alternative Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="alternativeTitle"
                    value={formData.alternativeTitle}
                    onChange={(e) => setFormData({ ...formData, alternativeTitle: e.target.value })}
                    placeholder="Enter alternative title"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formGroupCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    as="select"
                    name="countryId"
                    value={formData.countryId}
                    onChange={(e) => setFormData({ ...formData, countryId: e.target.value })}
                    placeholder="Enter country"
                    required
                    >
                      {countries.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                    </Form.Control>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="formGroupYear">
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="Enter release year"
                    min="1900" 
                    max={new Date().getFullYear()}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="formGroupSynopsis">
                  <Form.Label>Synopsis</Form.Label>
                  <Form.Control
                    type="text"
                    name="synopsis"
                    value={formData.synopsis}
                    onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
                    placeholder="Enter synopsis"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
            <Col md={6}>
                <Form.Group className="mb-3" controlId="formGroupDuration">
                  <Form.Label>Duration</Form.Label>
                  <Form.Control
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="Enter Duration (minutes)"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="formGroupAward">
                  <Form.Label>Award</Form.Label>
                  <Form.Control
                    type="text"
                    name="award"
                    value={formData.award}
                    onChange={(e) => setFormData({ ...formData, award: e.target.value })}
                    placeholder="Enter Category, Award, Year (ex. Best Animated Feature, Annie Awards, 2023)"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="formGroupGenre">
                  <Form.Label>Genre</Form.Label>
                  <Row>
                    {genres.map((genre) => (
                      <Col md={3} key={genre.id}>
                        <Form.Check
                          type="checkbox"
                          label={genre.name}
                          value={genre.id}
                          onChange={() => handleGenreChange(genre.id)}
                          checked={formData.genre.includes(genre.id)}
                        />
                      </Col>
                    ))}
                  </Row>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formGroupTrailerLink">
                  <Form.Label>Trailer Link</Form.Label>
                  <Form.Control
                    type="text"
                    name="trailerLink"
                    value={formData.trailerLink}
                    onChange={(e) => setFormData({ ...formData, trailerLink: e.target.value })}
                    placeholder="Enter trailer link (from Youtube)"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="formGroupAvailability">
                  <Form.Label>Availability on</Form.Label>
                  <Form.Control
                    type="text"
                    name="availability"
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    placeholder="Enter availability (e.g., Netflix, Disney+)"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="formGroupActors">
                  <Form.Label>Actors (Search & Add)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Search Actor Names"
                    list="actors-list"
                    onChange={(e) => handleActorSelect(e)}
                  />
                  <datalist id="actors-list">
                    {actors.map((actor) => (
                      <option key={actor.id} value={actor.name}>
                        {actor.name}
                      </option>
                    ))}
                  </datalist>
                  <div className="selected-actors-grid">
                    {selectedActors.map((actor, index) => (
                      <div key={index} className="selected-actor-item">
                        <img src={actor.photo} alt={actor.name} className="actor-photo" />
                        <span>{actor.name}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedActors(selectedActors.filter((a) => a.id !== actor.id))
                          }
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FormsMovies;
