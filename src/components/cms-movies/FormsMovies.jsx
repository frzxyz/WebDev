import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Countries.css";
import "../../styles/Awards.css";
import StatusPopup from "../StatusPopup";

function FormsMovies() {
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    genre: [],
    rating: 0,
    views: 0,
    duration: 0,
    urlPhoto: "",
    countryId: "",
    actors: [],
    availability: [],
  });

  const [genres, setGenres] = useState([]);
  const [countries, setCountries] = useState([]);
  const [actors, setActors] = useState([]);
  const [selectedActors, setSelectedActors] = useState([]);
  const [filteredActors, setFilteredActors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [genreRequired, setGenreRequired] = useState(false);
  const [actorRequired, setActorRequired] = useState(false);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [errors, setErrors] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const availabilities = [
    "Netflix", "Prime Video", "Vidio", "Amazon Prime", "Apple TV",
    "Disney+ Hotstar", "Bstation", "Microsoft Store", "Google Play Movies", "Hulu", "Crunchyroll"
  ];

  const [statusPopup, setStatusPopup] = useState({ show: false, type: "", message: "" });

  const showPopup = (type, message) => {
    setStatusPopup({ show: true, type, message });
  };

  const hidePopup = () => {
    setStatusPopup({ show: false, type: "", message: "" });
  };

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch("/api/cms/genre");
      const data = await res.json();
      const sortedGenres = data.sort((a, b) => a.name.localeCompare(b.name));
      setGenres(sortedGenres);
    };
    const fetchCountries = async () => {
      const res = await fetch("/api/cms/countries");
      const data = await res.json();
      setCountries(data);
    };
    const fetchActors = async () => {
      try {
        const res = await fetch("/api/cms/actors");
        const data = await res.json();
        console.log("Actors fetched: ", data); // Tambahkan log untuk memeriksa data
        if (Array.isArray(data)) {
          setActors(data);
        } else {
          console.error("Invalid data format from API");
        }
      } catch (error) {
        console.error('Failed to fetch actors:', error);
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
        setGenreRequired(updatedGenres.length === 0);
      return { ...prevFormData, genre: updatedGenres };
    });
  };

  const handleSearch = (e) => {
    const query = e.target.value.trim().toLowerCase();
    setSearchQuery(query);

    if (query.length > 0) {
      const results = actors.filter((actor) =>
        actor.name.toLowerCase().includes(query)
      );
      setFilteredActors(results);
    } else {
      setFilteredActors([]);
    }
  };

  const handleSelectActor = (actor) => {
    if (!selectedActors.some((selected) => selected.id === actor.id)) {
      setSelectedActors([...selectedActors, actor]);
      setFormData((prevFormData) => ({
        ...prevFormData,
        actors: [...prevFormData.actors, actor.id],
      }));
      setSearchQuery(""); // Kosongkan input setelah memilih aktor
      setFilteredActors([]); // Kosongkan hasil pencarian
    }
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleAvailabilityChange = (platform) => {
    setSelectedAvailability((prevSelectedAvailability) => {
      if (prevSelectedAvailability.includes(platform)) {
        return prevSelectedAvailability.filter((p) => p !== platform);
      } else {
        return [...prevSelectedAvailability, platform];
      }
    });
    setFormData((prevFormData) => ({
      ...prevFormData,
      availability: selectedAvailability.includes(platform)
        ? selectedAvailability.filter((p) => p !== platform)
        : [...prevFormData.availability, platform],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setErrors('');
  
    if (formData.genre.length === 0) {
      setGenreRequired(true); // Tampilkan error jika genre kosong
      return;
    }
  
    if (formData.actors.length === 0) {
      setActorRequired(true); // Tampilkan error jika actors kosong
      return;
    }
  
    const movieData = {
      ...formData,
      genres: formData.genre,
      views: parseInt(formData.views) || 0,
      year: parseInt(formData.year),
      rating: formData.rating ? parseFloat(formData.rating) : 0,
      duration: formData.duration ? parseInt(formData.duration) : 0,
      availability: selectedAvailability.join(', '),
    };
  
    try {
      const response = await fetch('/api/cms/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData),
      });
      const validNameRegex = /^[A-Za-z\s'-]+$/;
      if (!validNameRegex.test(formData.title)) {
        showPopup(
          "error",
          "Title must only contain letters, spaces, hyphens, and apostrophes."
        );
        return;
      }
      if (response.ok) {
        const result = await response.json();
        console.log('Movie successfully added:', result);
        showPopup("success", result.message || "Movie successfully added!");
        setFormData({
          title: "",
          year: "",
          genre: [],
          rating: 0,
          views: 0,
          duration: 0,
          urlPhoto: "",
          countryId: "",
          actors: [],
          availability: [],
        });
        setShowModal(false);
      } else {
        const errorResponse = await response.json();
        setErrors(errorResponse.error); // Set errors dari backend
        showPopup("error", errorResponse.error || "Failed to add movie. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting movie:", error);
      showPopup("error", "Failed to add movie. Please try again.");
    }
  };
  
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div className="col-2 col-10 px-md-4">
      {/* Button to trigger modal */}
      <Button variant="primary" onClick={handleShow}>
        Add Movie
      </Button>

      {statusPopup.show && (
      <StatusPopup
        type={statusPopup.type}
        message={statusPopup.message}
        onClose={hidePopup}
      />
    )}

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose} size="lg" className="custom-modal-background">
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
                    name="urlPhoto"
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
                      <option value="" disabled hidden>
                        Select Country
                      </option>
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
                  {genreRequired && (
                    <p style={{ color: 'red' }}>Please select at least one genre.</p>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
              <Form.Group className="mb-3" controlId="formGroupAvailability">
              <Form.Label>Availability on</Form.Label>
              <div className="dropdown">
                    <button
                      className="btn dropdown-toggle availability-button"
                      type="button"
                      onClick={() => setOpenDropdown(!openDropdown)}
                      aria-expanded={openDropdown}
                    >
                      {selectedAvailability.length > 0
                        ? selectedAvailability.join(", ")
                        : "Select Availability"}
                    </button>
                    {openDropdown && (
                      <ul className="dropdown-menu show">
                        {availabilities.map((platform) => (
                          <li key={platform} className="dropdown-item">
                            <div className="form-check">
                              <input
                                type="checkbox"
                                id={`availability-${platform}`}
                                className="form-check-input"
                                checked={selectedAvailability.includes(platform)}
                                onChange={() => handleAvailabilityChange(platform)}
                              />
                              <label
                                htmlFor={`availability-${platform}`}
                                className="form-check-label"
                              >
                                {platform}
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
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
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                    {filteredActors.length > 0 && (
                      <ul className="dropdown-menu show" style={{ display: "block" }}>
                        {filteredActors.map((actor) => (
                          <li
                            key={actor.id}
                            className="dropdown-item"
                            onClick={() => handleSelectActor(actor)}
                          >
                            {actor.name}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="selected-actors-grid mt-2">
                      {selectedActors.map((actor) => (
                        <div key={actor.id} className="selected-actor-item">
                          <img
                            src={actor.photo}
                            alt={actor.name}
                            className="actor-photo"
                          />
                          <span>{actor.name}</span>
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedActors(
                                selectedActors.filter((a) => a.id !== actor.id)
                              )
                            }
                          >
                            -
                          </button>
                        </div>
                      ))}
                    </div>
                </Form.Group>
              </Col>
            </Row>

            {errors && (
            <Alert variant="danger" className="text-center">
              {errors}
            </Alert>
          )}

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
