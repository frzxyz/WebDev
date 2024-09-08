import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

import "../../styles/Countries.css";
import "../../styles/Awards.css";

function FormsGenres({ onAddGenre }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const genreName = event.target.elements.genreName.value;
    const description = event.target.elements.description.value;

    // Call the onAddGenre function to add the new genre to the table
    onAddGenre({ genreName, description });

    // Reset the form after submission
    event.target.reset();
  };

  return (
    <div className="add-genre">
      <h4>Add Genre</h4>
      <div className="card">
        <div className="card-body">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupGenreName">
              <Form.Label>Genre Name</Form.Label>
              <Form.Control
                type="text"
                name="genreName"
                placeholder="Enter genre name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Enter genre description"
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
