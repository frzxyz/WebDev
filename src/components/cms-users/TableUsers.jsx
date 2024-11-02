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
  const [editingUserId, setEditingUserId] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
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
      const response = await axios.get('/api/cms/users'); // Mengambil data users dari API
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
        await axios.delete(`/api/cms/users?id=${id}`); // Menghapus user melalui API
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

  // Handle edit click
  const handleEditClick = (userId, username, email) => {
    setEditingUserId(userId);
    setNewUsername(username);
    setNewEmail(email);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingUserId(null);
    setNewUsername("");
    setNewEmail("");
  };

  // Handle save edit
  const saveEdit = async (id) => {
    if (!newUsername.trim() || !newEmail.trim()) {
      alert("Username and email cannot be empty.");
      return;
    }

    try {
      const response = await axios.put('/api/cms/users', {
        id,
        username: newUsername,
        email: newEmail
      });

      if (response.status >= 200 && response.status < 300) {
        setUsers(
          users.map((user) =>
            user.id === id ? { ...user, username: newUsername, email: newEmail } : user
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

    setEditingUserId(null);
  };

  return (
    <div className="table-countries">
      <h5>List Users</h5>
      
      <div className="sort-buttons">
        <button className="sort-button" onClick={() => sortBy("username")}>
          Sort By Username {sortConfig.key === "username" && (sortConfig.direction === "asc" ? "↑" : "↓")}
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
          {users.map((user, index) => (
            <tr key={user.id} id={`row${user.id}`}>
              <td>{index + 1}</td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                ) : (
                  user.username
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                <button className="btn btn-warning mx-2">
                    Suspend
                </button>
                {editingUserId === user.id ? (
                  <>
                    <button className="btn btn-success mx-2" onClick={() => saveEdit(user.id)}>
                      Save
                    </button>
                    <button className="btn btn-warning mx-2" onClick={handleCancelEdit}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-success mx-2"
                      onClick={() => handleEditClick(user.id, user.username, user.email)}
                    >
                      <TiEdit className="me-2" />
                      Edit
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteUser(user.id)}
                    >
                      <TiTrash className="me-2" />
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TableUsers;
