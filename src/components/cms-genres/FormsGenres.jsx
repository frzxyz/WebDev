import { useState } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import "../../styles/Countries.css";
import "../../styles/Awards.css";

function FormsGenres({ onAddGenre }) {
  const [genreName, setGenreName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!genreName.trim()) {
      alert("Please enter a valid genre name.");
      return;
    }

    // Regex untuk memeriksa apakah input valid (huruf, spasi, tanda hubung, apostrof)
    const validNameRegex = /^[A-Za-z\s'-]+$/;

    // Cek apakah input valid
    if (!validNameRegex.test(genreName)) {
      alert("Genre name must only contain letters, spaces, hyphens, and apostrophes.");
      return;
    }

    // Mengirim request POST ke API untuk menambahkan genre baru
    try {
      const response = await fetch('/api/genre', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: genreName,
          description: description, }), // Kirim nama negara ke API
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      alert(`Genre "${result.name}" added successfully!`);

      // Reset form setelah submit
      setGenreName("");
      setDescription("");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Genre already exists!"); // Jika genre duplikat
      }
      console.error("Failed to add genre", error);
    }
  };

  return (
    <div className="add-country">
      <h5>Add Genre</h5>
      <div className="card">
        <div className="card-body">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupGenreName">
              <Form.Label>Genre Name</Form.Label>
              <Form.Control
                type="text"
                name="genreName"
                placeholder="Enter genre name"
                value={genreName}
                onChange={(e) => setGenreName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Enter genre description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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

export default FormsGenres;
