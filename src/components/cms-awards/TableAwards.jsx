import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { TiEdit, TiTrash } from "react-icons/ti";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from 'react-bootstrap/Pagination';

function TableAwards() {
  const [awards, setAwards] = useState([]);
  const [editingAwardId, setEditingAwardId] = useState(null);
  const [newName, setNewName] = useState("");
  const [newYear, setNewYear] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [awardsPerPage] = useState(10);

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
    const isConfirmed = window.confirm("Are you sure you want to delete this award?");
    if (isConfirmed) {
      try {
        await axios.delete(`/api/cms/awards?id=${id}`);
        setAwards(awards.filter((award) => award.id !== id));
        alert("Award deleted successfully!");
      } catch (error) {
        console.error("Failed to delete award:", error);
        alert("Failed to delete award.");
      }
    }
  };

  const handleEditClick = (award) => {
    setEditingAwardId(award.id);
    setNewName(award.name);
    setNewYear(award.year);
  };

  const saveEdit = async (id) => {
    if (!newName || !newYear) {
      alert("Name and Year fields are required.");
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
        alert("Award updated successfully!");
      } else {
        alert("Failed to update award.");
      }
    } catch (error) {
      console.error("Error updating award:", error);
      alert("Failed to update award.");
    }

    setEditingAwardId(null);
  };

  const indexOfLastAward = currentPage * awardsPerPage;
  const indexOfFirstAward = indexOfLastAward - awardsPerPage;
  const currentAwards = awards.slice(indexOfFirstAward, indexOfLastAward);
  const totalPages = Math.ceil(awards.length / awardsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h5>List of Awards</h5>
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
                    <button onClick={() => saveEdit(award.id)}>Save</button>
                    <button onClick={() => setEditingAwardId(null)}>Cancel</button>
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
  );
}

export default TableAwards;
