import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Countries.css";
import "../../styles/Awards.css";
import StatusPopup from "../StatusPopup";

function FormsActors() {
  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    countryId: "",
  });
  const [countries, setCountries] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

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
    setStatusPopup({
      show: false,
      type: "",
      message: "",
      onConfirm: null,
      isConfirm: false,
    });
  };

  // Fetch the countries when the component mounts
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("/api/cms/countries");
        const data = await res.json();
        setCountries(data);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    const { name, photo, countryId } = formData;

    // Validasi nama aktor menggunakan regex
    const validNameRegex = /^[A-Za-z\s'-]+$/;
    if (!validNameRegex.test(name)) {
      showPopup(
        "error",
        "Actor name must only contain letters, spaces, hyphens, and apostrophes."
      );
      return;
    }

    if (!name.trim()) {
      showPopup("error", "Please enter a valid actor name.");
      return;
    }

    if (!photo.trim()) {
      showPopup("error", "Please enter a valid photo URL.");
      return;
    }

    try {
      const res = await fetch("/api/cms/actors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, photo, countryId }), // Send countryId
      });

      if (res.ok) {
        const data = await res.json();
        showPopup("success", "Actor successfully added");
        setFormData({
          name: "",
          photo: "",
          countryId: "",
        });
      } else {
        const errorData = await res.json();
        showPopup("error", errorData.error || "Failed to add actor.");
      }
    } catch (error) {
      const errorResponse = await response.json();
      showPopup(
        "error",
        errorResponse.error ||
          "An error occurred while adding the actor. Please try again."
      );
    }
  };

  return (
    <div className="add-country">
      <h5>Add Actor</h5>
      <div className="card">
        <div className="card-body">
          {statusPopup.show && (
            <StatusPopup
              type={statusPopup.type}
              message={statusPopup.message}
              onClose={hidePopup}
              onConfirm={statusPopup.onConfirm}
              isConfirm={statusPopup.isConfirm}
            />
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupActorName">
              <Form.Label>Actor Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter actor name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPhoto">
              <Form.Label>Photo URL</Form.Label>
              <Form.Control
                type="text"
                name="photo"
                placeholder="Enter URL Photo"
                value={formData.photo}
                onChange={(e) =>
                  setFormData({ ...formData, photo: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Country</Form.Label>
              <Form.Control
                as="select"
                name="countryId"
                value={formData.countryId}
                onChange={(e) =>
                  setFormData({ ...formData, countryId: e.target.value })
                }
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
            {errorMessage && (
              <div className="alert alert-danger mt-3" role="alert">
                {errorMessage}
              </div>
            )}
            <button type="submit" className="btn btn-primary mt-3">
              Submit
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default FormsActors;
