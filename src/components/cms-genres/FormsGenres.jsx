import { useState } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Countries.css";
import "../../styles/Awards.css";

function FormsGenres({ onAddGenre }) {
  const [genreName, setGenreName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(""); // Clear any previous error message

    if (!genreName.trim()) {
      alert("Please enter a valid genre name.");
      return;
    }

    // Regex to validate the input (letters, spaces, hyphens, apostrophes)
    const validNameRegex = /^[A-Za-z\s'-]+$/;

    if (!validNameRegex.test(genreName)) {
      alert("Genre name must only contain letters, spaces, hyphens, and apostrophes.");
      return;
    }

    try {
      const response = await fetch('/api/cms/genre', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: genreName,
          description: description,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Failed to add genre");
        return;
      }

      const result = await response.json();
      alert(`Genre "${result.name}" added successfully!`);

      // Reset form after successful submit
      setGenreName("");
      setDescription("");
    } catch (error) {
      console.error("Failed to add genre", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
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
            {errorMessage && (
              <div className="alert alert-danger mt-3" role="alert">
                {errorMessage}
              </div>
            )}
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
