import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { TiEdit, TiTrash, TiMail } from "react-icons/ti";
import "bootstrap/dist/css/bootstrap.min.css";

import "../../styles/Countries.css";
import "../../styles/Awards.css";
import axios from 'axios';
import { useEdit } from "../cms-global/cms-edit";

function TableUsers() {
  const { cancelEdit, edit } = useEdit(); // Destructure dari objek
  const [users, setUsers] = useState([]);
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

  // Fungsi untuk mengambil data dari API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users'); // Mengambil data users dari API
      setUsers(response.data); // Set data users ke state
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  // useEffect untuk memanggil fetchUsers saat komponen di-mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fungsi untuk menghapus user (DELETE)
  const deleteUser = async (id) => {
    const isConfirmed = window.confirm("Apakah Anda yakin ingin menghapus data ini?");
    
    if (isConfirmed) {
      try {
        await axios.delete(`/api/users?id=${id}`); // Menghapus user melalui API
        setUsers(users.filter(user => user.id !== id)); // Menghapus dari state
        alert("User deleted successfully!");
      } catch (error) {
        console.error("Failed to delete user:", error);
        alert("Failed to delete user.");
      }
    } else {
      console.log("Penghapusan dibatalkan oleh pengguna.");
    }
  };

  // Fungsi untuk menyimpan perubahan (PUT)
  const saveEdit = async (id) => {
    const tr = document.getElementById(`row${id}`);
    const tds = tr.getElementsByTagName("td");
    let updatedUsername = "";
    let updatedEmail = "";

    for (let i = 1; i < tds.length - 1; i++) {
      const td = tds[i];
      const input = td.getElementsByTagName("input")[0];
      if (input) {
        if (i === 1) {
          updatedUsername = input.value;
        } else if (i === 2) {
          updatedEmail = input.value;
        }
        td.innerHTML = input.value; // Ubah input menjadi teks biasa
      }
    }

    // Kirim request PUT ke API untuk menyimpan perubahan
    try {
      const response = await axios.put('/api/users', {
        id, // Kirim ID user yang akan diperbarui
        username: updatedUsername, // Kirim username yang baru
        email: updatedEmail // Kirim email yang baru
      });

      if (response.status >= 200 && response.status < 300) {
        setUsers(
          users.map((user) =>
            user.id === id ? { ...user, username: updatedUsername, email: updatedEmail } : user
          )
        );
        alert("User updated successfully!");
      } else {
        alert("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
    }

    // Ubah tombol setelah menyimpan
    const editBtn = document.getElementById(`editBtn${id}`);
    const saveBtn = document.getElementById(`saveBtn${id}`);
    const deleteBtn = document.getElementById(`deleteBtn${id}`);
    const cancelBtn = document.getElementById(`cancelBtn${id}`);

    if (editBtn) editBtn.classList.remove("d-none");
    if (saveBtn) saveBtn.classList.add("d-none");
    if (deleteBtn) deleteBtn.classList.remove("d-none");
    if (cancelBtn) cancelBtn.classList.add("d-none");
  };

  return (
    <div className="table-countries">
      <h5>List Users</h5>
      
      <div className="sort-buttons">
        <button className="sort-button" onClick={() => sortBy("username")}>
          Sort By Username {sortConfig.key === "username" && (sortConfig.direction === "asc" ? "↑" : "↓")}
        </button>
        <button className="sort-button" onClick={() => sortBy("id")}>
          Sort By id {sortConfig.key === "id" && (sortConfig.direction === "asc" ? "↑" : "↓")}
        </button>
      </div>

      <Table responsive striped>
        <thead>
          <tr>
            <th>Id</th>
            <th onClick={() => sortBy("username")} style={{ cursor: "pointer" }}>
              Username {sortConfig.key === "username" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => sortBy("email")} style={{ cursor: "pointer" }}>
              Email {sortConfig.key === "email" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} id={`row${user.id}`}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button className="btn btn-warning">
                  <span className="d-flex align-items-center">
                    <TiMail className="me-2" />
                    Send Email
                  </span>
                </button>
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
                <button 
                  className="btn btn-danger mx-2"
                  id={`deleteBtn${user.id}`}
                  onClick={() => deleteUser(user.id)}
                  >
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

export default TableUsers;
