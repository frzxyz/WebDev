import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { TiEdit, TiTrash } from "react-icons/ti";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from 'react-bootstrap/Pagination';
import StatusPopup from "../StatusPopup";

function TableAwards() {
  const [awards, setAwards] = useState([]);
  const [editingAwardId, setEditingAwardId] = useState(null);
  const [newName, setNewName] = useState("");
  const [newYear, setNewYear] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [awardsPerPage] = useState(10);

  const [statusPopup, setStatusPopup] = useState({
    show: false,
    type: "",
    message: "",
    onConfirm: null,
    isConfirm: false,
  });  
  
  const showPopup = (type, message, onConfirm = null, isConfirm = false) => {
    setStatusPopup({ show: true, type, message, onConfirm, isConfirm });
  };  
  
  const hidePopup = () => {
    setStatusPopup({ show: false, type: "", message: "", onConfirm: null, isConfirm: false });
  };

  const fetchAwards = async () => {
    try {
      const response = await axios.get('/api/cms/awards');
      setAwards(response.data);
    } catch (error) {
      console.error("Failed to fetch awards:", error);
    }
  };

  useEffect(() => {
    fetchAwards();
  }, []);

  const deleteAward = async (id) => {
    const onConfirm = async () => {
      try {
        await axios.delete(`/api/cms/awards?id=${id}`);
        setAwards(awards.filter((award) => award.id !== id));
        showPopup("success", "Award deleted successfully!");
      } catch (error) {
        console.error("Failed to delete award:", error);
        showPopup("error", "Failed to delete award.");
      }
    };
  
    showPopup("warning", "Are you sure you want to delete this award?", onConfirm, true);
  };  

  const handleEditClick = (award) => {
    setEditingAwardId(award.id);
    setNewName(award.name);
    setNewYear(award.year);
  };

  const saveEdit = async (id) => {
    if (!newName || !newYear) {
      showPopup("error", "Name and Year fields are required.");
      return;
    }
  
    try {
      const response = await axios.put('/api/cms/awards', {
        id,
        name: newName,
        year: parseInt(newYear),
      });
  
      if (response.status >= 200 && response.status < 300) {
        setAwards(
          awards.map((award) =>
            award.id === id ? { ...award, name: newName, year: parseInt(newYear) } : award
          )
        );
        showPopup("success", "Award updated successfully!");
      } else {
        showPopup("error", "Failed to update award.");
      }
    } catch (error) {
      console.error("Error updating award:", error);
      showPopup("error", "Failed to update award.");
    }
  
    setEditingAwardId(null);
  };  

  const indexOfLastAward = currentPage * awardsPerPage;
  const indexOfFirstAward = indexOfLastAward - awardsPerPage;
  const currentAwards = awards.slice(indexOfFirstAward, indexOfLastAward);
  const totalPages = Math.ceil(awards.length / awardsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <div className="table-countries">
      <h5 className="mb-4">List of Awards</h5>

      {statusPopup.show && (
          <StatusPopup
            type={statusPopup.type}
            message={statusPopup.message}
            onClose={hidePopup}
            onConfirm={statusPopup.onConfirm}
            isConfirm={statusPopup.isConfirm}
          />
        )}

      <Table responsive striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Year</th>
            <th>Drama</th>
            <th>Country</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentAwards.map((award) => (
            <tr key={award.id}>
              <td>{award.id}</td>
              <td>
                {editingAwardId === award.id ? (
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                ) : (
                  award.name
                )}
              </td>
              <td>
                {editingAwardId === award.id ? (
                  <input
                    type="number"
                    value={newYear}
                    onChange={(e) => setNewYear(e.target.value)}
                  />
                ) : (
                  award.year
                )}
              </td>
              <td>{award.drama.title}</td>
              <td>{award.country.name}</td>
              <td>
                {editingAwardId === award.id ? (
                  <>
                    <button className="btn btn-success mx-2" onClick={() => saveEdit(award.id)}>
                      Save
                    </button>
                    <button className="btn btn-warning mx-2" onClick={() => setEditingAwardId(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(award)}className="btn btn-success mx-2">
                      <TiEdit /> Edit
                    </button>
                    <button onClick={() => deleteAward(award.id)}className="btn btn-danger btn-sm">
                      <TiTrash /> Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        {[...Array(totalPages).keys()].map(number => (
          <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
            {number + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
    </div>
  );
}

export default TableAwards;
