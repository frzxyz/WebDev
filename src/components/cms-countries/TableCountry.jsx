import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { TiEdit, TiTrash } from "react-icons/ti";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEdit } from "../cms-global/cms-edit";

import "../../styles/Countries.css";
import "../../styles/Awards.css";

function TableCountries() {
  const { cancelEdit, edit, saveEdit } = useEdit(); // Destructure dari objek

  const [users, setUsers] = useState([
    { id: 1, countries: "Japan" },
    { id: 2, countries: "Korea" },
    { id: 3, countries: "China" },
  ]); 

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // Fungsi untuk melakukan sorting
  const sortBy = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedUsers = [...users].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setSortConfig({ key, direction });
    setUsers(sortedUsers);
  };

  return (
    <div className="table-countries">
      <h4 >List Countries</h4>

      <div className="sort-buttons">
        <button className="sort-button" onClick={() => sortBy("countries")}>
          Sort By Countries {sortConfig.key === "countries" && (sortConfig.direction === "asc" ? "↑" : "↓")}
        </button>
      </div>

        <Table responsive striped>
          <thead>
            <tr>
              <th>Id</th>
              <th onClick={() => sortBy("countries")} style={{ cursor: "pointer" }}>
              Countries {sortConfig.key === "countries" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {users.map((user) => (
            <tr key={user.id} id={`row${user.id}`}>
              <td>{user.id}</td>
              <td>{user.countries}</td>
              <td>
                <button
                  className="btn btn-success mx-2"
                  id={`editBtn${user.id}`}
                  onClick={() => edit(user.id)}
                >
                  <span className="d-flex align-items-center">
                    <TiEdit className="me-2" />
                    Edit
                  </span>
                </button>
                <button
                  className="btn btn-success mx-2 d-none"
                  id={`cancelBtn${user.id}`}
                  onClick={() => cancelEdit(user.id)}
                >
                  <span className="d-flex align-items-center">
                    <TiEdit className="me-2" />
                    Cancel
                  </span>
                </button>
                <button className="btn btn-success mx-2 d-none" id={`saveBtn${user.id}`}
                  onClick={() => saveEdit(user.id)}>
                  <span className="d-flex align-items-center">
                    <TiEdit className="me-2" />
                    Save
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
          ))}
        </tbody>
        </Table>
    </div>
  );
}

export default TableCountries;
