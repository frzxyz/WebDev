import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { TiEdit, TiTrash } from "react-icons/ti";
import "bootstrap/dist/css/bootstrap.min.css";

import "../../styles/Countries.css";
import "../../styles/Awards.css";

function TableAwards() {
  return (
    <div className="table-countries">
      <h4 >List Awards</h4>
    <Table responsive striped>
          <thead>
            <tr>
              <th>Id</th>
              <th>Countries</th>
              <th>Years</th>
              <th>Awards</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Japan</td>
              <td>2024</td>
              <td>Japanese Drama Awards Spring 2024</td>
              <td>
                <button className="btn btn-success mx-2">
                  <span className="d-flex align-items-center">
                    <TiEdit className="me-2" />
                    Edit
                  </span>
                </button>
                <button className="btn btn-danger">
                  <span className="d-flex align-items-center">
                    <TiTrash className="me-2" />
                    Delete
                  </span>
                </button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Korea</td>
              <td>2024</td>
              <td>Korean Drama Awards Spring 2024</td>
              <td>
                <button className="btn btn-success mx-2">
                  <span className="d-flex align-items-center">
                    <TiEdit className="me-2" />
                    Edit
                  </span>
                </button>
                <button className="btn btn-danger">
                  <span className="d-flex align-items-center">
                    <TiTrash className="me-2" />
                    Delete
                  </span>
                </button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>China</td>
              <td>2024</td>
              <td>Chinese Drama Awards Spring 2024</td>
              <td>
                <button className="btn btn-success mx-2">
                  <span className="d-flex align-items-center">
                    <TiEdit className="me-2" />
                    Edit
                  </span>
                </button>
                <button className="btn btn-danger">
                  <span className="d-flex align-items-center">
                    <TiTrash className="me-2" />
                    Delete
                  </span>
                </button>
              </td>
            </tr>
          </tbody>
        </Table>
        </div>
  );
}


export default TableAwards;