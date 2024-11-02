import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Countries.css";
import "../../styles/Awards.css";

function FormsActors() {
  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    countryId: "",
  });
  const [countries, setCountries] = useState([]);

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
    const { name, photo, countryId } = formData;

    if (!name.trim()) {
      alert("Please enter a valid actor name.");
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
        alert("Actor successfully added");
        setFormData({
          name: "",
          photo: "",
          countryId: "",
        });
      } else {
        const errorResponse = await response.json();
        alert(`Failed to add actor: ${errorResponse.error}`);
      }
    } catch (error) {
      const errorResponse = await response.json();
      alert(`Failed to add actor: ${errorResponse.error}`);
    }
  };

  return (
    <div className="add-country">
      <h5>Add Actor</h5>
      <div className="card">
        <div className="card-body">
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
