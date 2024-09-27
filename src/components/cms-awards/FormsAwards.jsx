import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { TiEdit, TiTrash } from "react-icons/ti";

import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

import "../../styles/Countries.css";
import "../../styles/Awards.css";

function FormsAwards() {
  return (
    <div className="add-country">
      <h5 >Add Awards</h5>
    <div class="card">
      <div class="card-body">
        <Form>
          <Form.Group className="mb-3" controlId="formGroupCountry">
            <Form.Label>Country</Form.Label>
            <Form.Control type="country" placeholder="Enter country" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupYear">
            <Form.Label>Year</Form.Label>
            <Form.Control type="year" placeholder="Enter year" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupAward">
            <Form.Label>Award</Form.Label>
            <Form.Control type="award" placeholder="Enter award" />
          </Form.Group>
          <button type="submit" class="btn btn-primary">Add</button>
        </Form>
      </div>
    </div>
    </div>
  );
}

export default FormsAwards;
