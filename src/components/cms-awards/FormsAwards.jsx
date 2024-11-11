import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Countries.css";
import "../../styles/Awards.css";

function FormsAwards() {
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    dramaId: "",
    countryId: "",
  });
  const [dramas, setDramas] = useState([]);
  const [countries, setCountries] = useState([]);

  // Fetch dramas and countries when the component mounts
  useEffect(() => {
    const fetchDramas = async () => {
      try {
        const res = await fetch("/api/cms/movies");
        const data = await res.json();
        setDramas(data);
      } catch (error) {
        console.error("Failed to fetch dramas:", error);
      }
    };

    const fetchCountries = async () => {
      try {
        const res = await fetch("/api/cms/countries");
        const data = await res.json();
        setCountries(data);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };

    fetchDramas();
    fetchCountries();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, year, dramaId, countryId } = formData;
  
    if (!name.trim() || !year.trim() || !dramaId || !countryId) {
      alert("All fields are required and must be valid.");
      return;
    }
  
    try {
      const res = await fetch("/api/cms/awards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          year: parseInt(year),         // Convert year to integer
          dramaId: parseInt(dramaId),    // Convert dramaId to integer
          countryId: parseInt(countryId) // Convert countryId to integer
        }),
      });
  
      if (res.ok) {
        alert("Award successfully added");
        setFormData({
          name: "",
          year: "",
          dramaId: "",
          countryId: "",
        });
      } else {
        const errorResponse = await res.json();
        alert(`Failed to add award: ${errorResponse.error}`);
      }
    } catch (error) {
      console.error("Failed to add award:", error);
      alert("Failed to add award.");
    }
  };
  

  return (
    <div className="add-award">
      <h5>Add Award</h5>
      <div className="card">
        <div className="card-body">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupAwardName">
              <Form.Label>Award Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter award name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupAwardYear">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                name="year"
                placeholder="Enter award year"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupDrama">
              <Form.Label>Drama</Form.Label>
              <Form.Control
                as="select"
                name="dramaId"
                value={formData.dramaId}
                onChange={(e) =>
                  setFormData({ ...formData, dramaId: e.target.value })
                }
                required
              >
                <option value="" disabled hidden>
                  Select Drama
                </option>
                {dramas.map((drama) => (
                  <option key={drama.id} value={drama.id}>
                    {drama.title}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                as="select"
                name="countryId"
                value={formData.countryId}
                onChange={(e) =>
                  setFormData({ ...formData, countryId: e.target.value })
                }
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

export default FormsAwards;
