// TableComments.jsx - Component to display and manage reviews/comments (view and delete only)
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { TiTrash } from 'react-icons/ti';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from 'react-bootstrap/Pagination';
import StatusPopup from "../StatusPopup";

function TableComments() {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(10);

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

  const fetchReviews = async () => {
    try {
      const response = await axios.get('/api/cms/comments');
      setReviews(response.data);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const deleteReview = async (id) => {
    const onConfirm = async () => {
      try {
        await axios.delete(`/api/cms/comments?id=${id}`);
        setReviews(reviews.filter((review) => review.id !== id));
        showPopup("success", 'Review deleted successfully!');
      } catch (error) {
        console.error('Failed to delete review:', error);
        showPopup("error", 'Failed to delete review.');
      }
    };

    showPopup("warning", "Are you sure you want to delete this review?", onConfirm, true);
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <div className="table-countries">
      <h5 className="mb-4">List of Reviews</h5>

      {statusPopup.show && (
        <StatusPopup
          type={statusPopup.type}
          message={statusPopup.message}
          onClose={hidePopup}
          onConfirm={statusPopup.onConfirm}
          isConfirm={statusPopup.isConfirm}
        />
      )}
      
      <Table responsive striped bordered hover>
        <thead className="thead-dark">
          <tr>
            <th>User Name</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentReviews.map((review) => (
            <tr key={review.id}>
              <td>{review.userName}</td>
              <td>{review.rating}</td>
              <td>{review.comment}</td>
              <td>{review.drama.title}</td>
              <td>
                <button onClick={() => deleteReview(review.id)} className="btn btn-danger btn-sm">
                  <TiTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination className="justify-content-center mt-4">
        {[...Array(totalPages).keys()].map((number) => (
          <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
            {number + 1}
          </Pagination.Item>
        ))}
      </Pagination>
      </div>
    </div>
  );
}

export default TableComments;
