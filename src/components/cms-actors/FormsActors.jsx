import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

import "../../styles/Countries.css";
import "../../styles/Awards.css";

function FormsActors({ onAddActor }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const actorName = event.target.elements.actorName.value;
    const dateOfBirth = event.target.elements.dateOfBirth.value;
    const biography = event.target.elements.biography.value;

    // Call the onAddActor function to add the new actor to the list
    onAddActor({ actorName, dateOfBirth, biography });

    // Reset the form after submission
    event.target.reset();
  };

  return (
    <div className="add-actor">
      <h4>Add Actor</h4>
      <div className="card">
        <div className="card-body">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupActorName">
              <Form.Label>Actor Name</Form.Label>
              <Form.Control
                type="text"
                name="actorName"
                placeholder="Enter actor name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupDateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                placeholder="Enter date of birth"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupBiography">
              <Form.Label>Biography</Form.Label>
              <Form.Control
                as="textarea"
                name="biography"
                rows={3}
                placeholder="Enter biography"
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
