import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { TiEdit, TiTrash } from "react-icons/ti";

import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

import "../../styles/Countries.css";
import "../../styles/Awards.css";

function FormsUsers() {
  return (
    <div className="add-country">
      <h5 >Add Users</h5>
    <div class="card">
      <div class="card-body">
        <Form>
          <Form.Group className="mb-3" controlId="formGroupUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" placeholder="Enter username" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <button type="submit" class="btn btn-primary">Submit</button>
        </Form>
      </div>
    </div>
    </div>
  );
}

export default FormsUsers;
