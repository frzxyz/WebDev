import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Countries.css";
import "../../styles/Awards.css";

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
  const [showModal, setShowModal] = useState(false);
  const [genreRequired, setGenreRequired] = useState(false);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  const availabilities = [
    "Netflix", "Prime Video", "Vidio", "Amazon Prime", "Apple TV",
    "Disney+ Hotstar", "Bstation", "Microsoft Store", "Google Play Movies",
    "Microsoft Store Google Play", "Amazon Prime Video", "Hulu", "Crunchyroll"
  ];

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch("/api/cms/genre");
      const data = await res.json();
      setGenres(data);
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
        setGenreRequired(updatedGenres.length === 0);
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

    if (formData.genre.length === 0) {
      setGenreRequired(true); // Tampilkan error jika genre kosong
      return;
    }

    // Prepare the awards if necessary
  const parsedAwards = formData.award
  ? formData.award.split(',').map((award) => {
      const [category, name, year] = award.split(',').map((item) => item.trim());
      return { category, name, year: parseInt(year) };
    })
  : [];

  const movieData = {
    ...formData,
    genres: formData.genre, 
    awards: parsedAwards,
    views: parseInt(formData.views) || 0, // Ensure views are an integer
    year: parseInt(formData.year),         // Ensure year is an integer
    rating: formData.rating ? parseFloat(formData.rating) : 0,   // Ensure rating is a float
    duration: formData.duration ? parseInt(formData.duration) : 0, // Ensure duration is an integer
    availability: selectedAvailability.join(', '),
  };

    try {
      const response = await fetch('/api/cms/movies', {
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
          rating: 0,
          views: 0,
          duration: 0,
          urlPhoto: "",
          countryId: "",
          actors: [],
          awards: [],
          availability: [],
        });
      } else {
        const errorResponse = await response.json();
        alert(`Failed to add movie: ${errorResponse.error}`);
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
                <Form.Group className="mb-3" controlId="formGroupAward">
                  <Form.Label>Award</Form.Label>
                  <Form.Control
                    type="text"
                    name="award"
                    value={formData.award}
                    onChange={(e) => setFormData({ ...formData, award: e.target.value })}
                    placeholder="Enter Category, Award, Year (ex. Best Animated Feature, Annie Awards, 2023)"
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
              <div className="dropdown d-inline-block w-auto me-2 ms-2 mb-1 bg-dark">
                    <button
                      className="btn dropdown-toggle btn-outline-secondary text-white mb-1 btn-filter"
                      type="button"
                      id="dropdownAvailability"
                      aria-expanded={openDropdown === "availability"}
                      onClick={() => toggleDropdown("availability")}
                    >
                      Availability
                    </button>
                    <ul
                      className={`dropdown-menu ${openDropdown === "availability" ? "show" : ""}`}
                      aria-labelledby="dropdownAvailability"
                    >
                      <div className="scrollable-dropdown">
                        {availabilities.map((platform) => (
                          <li key={platform} className="dropdown-item">
                            <div className="form-check">
                              <input
                                type="checkbox"
                                id={`availability-${platform}`}
                                className="form-check-input"
                                value={platform}
                                checked={selectedAvailability.includes(platform)}
                                onChange={() => handleAvailabilityChange(platform)}
                              />
                              <label
                                htmlFor={`availability-${platform}`}
                                className="form-check-label availability-label"
                              >
                                {platform}
                              </label>
                            </div>
                          </li>
                        ))}
                      </div>
                    </ul>
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
                    list="actors-list"
                    onChange={(e) => handleActorSelect(e)}
                    required
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
