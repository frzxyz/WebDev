import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { TiEdit, TiTrash, TiMail } from "react-icons/ti";
import "bootstrap/dist/css/bootstrap.min.css";

import "../../styles/Countries.css";
import "../../styles/Awards.css";
import { useEdit } from "../cms-global/cms-edit";

function TableComments() {
  const { cancelEdit, edit, saveEdit } = useEdit(); // Destructure from your custom hook

  const [comments, setComments] = useState([
    { commentId: 1, username: "welsyaalmaira13", email: "welsyaalmaira@gmail.com", comment: "This is a great article!", date: "2024-09-01" },
    { commentId: 2, username: "rendi123", email: "rendi@polban.ac.id", comment: "I have some questions about the content.", date: "2024-09-02" },
    { commentId: 3, username: "farrelrahandika", email: "farrel456@gmail.com", comment: "Thank you for the insights.", date: "2024-09-03" },
  ]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // Sorting function
  const sortBy = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedComments = [...comments].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setSortConfig({ key, direction });
    setComments(sortedComments);
  };

  return (
    <div className="table-comments">
      <h4>List Comments</h4>

      <div className="sort-buttons">
        <button className="sort-button" onClick={() => sortBy("username")}>
          Sort By Username {sortConfig.key === "username" && (sortConfig.direction === "asc" ? "↑" : "↓")}
        </button>
        <button className="sort-button" onClick={() => sortBy("date")}>
          Sort By Date {sortConfig.key === "date" && (sortConfig.direction === "asc" ? "↑" : "↓")}
        </button>
      </div>

      <Table responsive striped>
        <thead>
          <tr>
            <th>Id</th>
            <th onClick={() => sortBy("username")} style={{ cursor: "pointer" }}>
              Username {sortConfig.key === "username" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th>Email</th>
            <th>Comment</th>
            <th onClick={() => sortBy("date")} style={{ cursor: "pointer" }}>
              Date {sortConfig.key === "date" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment.commentId}>
              <td>{comment.commentId}</td>
              <td>{comment.username}</td>
              <td>{comment.email}</td>
              <td>{comment.comment}</td>
              <td>{comment.date}</td>
              <td>
                <button className="btn btn-warning">
                  <span className="d-flex align-items-center">
                    <TiMail className="me-2" />
                    Send Email
                  </span>
                </button>
                <button
                  className="btn btn-success mx-2"
                  onClick={() => edit(comment.commentId)}
                >
                  <span className="d-flex align-items-center">
                    <TiEdit className="me-2" />
                    Edit
                  </span>
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    const filteredComments = comments.filter(c => c.commentId !== comment.commentId);
                    setComments(filteredComments);
                  }}
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

export default TableComments;
