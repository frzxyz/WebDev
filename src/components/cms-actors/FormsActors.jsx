import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Countries.css";
import "../../styles/Awards.css";

function FormsActors() {
  const [formData, setFormData] = useState({
    actorName: "",
    photo: "",
    countryId: "",
  });
  const [countries, setCountries] = useState([]);

  // Fetch the countries when the component mounts
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("/api/countries");
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
    const { actorName, photo, countryId } = formData;
  
    if (!actorName.trim()) {
      alert("Please enter a valid actor name.");
      return;
    }
  
    try {
      const res = await fetch('/api/actors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: actorName, photo, countryId }),  // Send countryId
      });
  
      if (res.ok) {
        const data = await res.json();
        alert('Actor successfully added');
        setFormData({
          actorName: "",
          photo: "",
        });
      } else {
        throw new Error(`Error: ${res.status}`);
      }
    } catch (error) {
      console.error('Error adding actor:', error);
      alert('Failed to add actor');
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
                name="actorName"
                placeholder="Enter actor name"
                value={formData.actorName}
                onChange={(e) => setFormData({ ...formData, actorName: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                required
              />
            </Form.Group>
            <button type="submit" className="btn btn-primary">Submit</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default FormsActors;
