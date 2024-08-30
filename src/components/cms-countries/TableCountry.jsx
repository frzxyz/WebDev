import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { TiEdit, TiTrash } from "react-icons/ti";

function TableCountries() {
  return (
    <div className="Table-countries">
      <h4 style={{marginLeft: "37px"}}>List Countries</h4>
      <Container fluid="md">
        <Table responsive striped>
          <thead>
            <tr>
              <th>Id</th>
              <th>Countries</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Japan</td>
              {/* <th>
                <Col className="col-md-12" xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="Country Name"
                    className=" mr-sm-2"
                  />
                </Col>
                <th></th>
              </th> */}
              <td>
                <button class="btn btn-success mx-2">
                  <TiEdit />
                  Edit
                </button>
                <button class="btn btn-danger">
                  <TiTrash />
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Korea</td>
              <td>
                <button class="btn btn-success mx-2">
                  <TiEdit />
                  Edit
                </button>
                <button class="btn btn-danger">
                  <TiTrash />
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>China</td>
              <td>
                <button class="btn btn-success mx-2">
                  <TiEdit />
                  Edit
                </button>
                <button class="btn btn-danger">
                  <TiTrash />
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default TableCountries;
