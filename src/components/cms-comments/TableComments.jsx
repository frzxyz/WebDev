// TableComments.jsx - Component to display and manage reviews/comments (view and delete only)
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { TiTrash } from 'react-icons/ti';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from 'react-bootstrap/Pagination';

function TableComments() {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(10);

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
    const isConfirmed = window.confirm('Are you sure you want to delete this review?');
    if (isConfirmed) {
      try {
        await axios.delete(`/api/cms/comments?id=${id}`);
        setReviews(reviews.filter((review) => review.id !== id));
        alert('Review deleted successfully!');
      } catch (error) {
        console.error('Failed to delete review:', error);
        alert('Failed to delete review.');
      }
    }
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <h5 className="mb-4">List of Reviews</h5>
      <Table responsive striped bordered hover>
        <thead className="thead-dark">
          <tr>
            <th>User Name</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>title</th>
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
  );
}

export default TableComments;
