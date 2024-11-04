import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Countries.css";
import "../../styles/Awards.css";

function FormsUsers() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('2');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim()) {
      alert("Please enter a valid country name.");
      return;
    }

    try {
      const res = await fetch('/api/cms/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, roleId: role }),
      });

      if (res.ok) {
        const data = await res.json();
        alert('User successfully added');
        setUsername('');
        setEmail('');
        setRole('2');
      } else {
        const errorData = await res.json();
        setErrorMessage(errorData.error || 'Failed to add user');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user');
    }
  };

  return (
    <div className="add-country">
      <h5 >Add Users</h5>
    <div className="card">
      <div className="card-body">
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formGroupUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupRole">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="1">Admin</option>
                <option value="2">Writer</option>
              </Form.Select>
            </Form.Group>
            {errorMessage && (
              <div className="alert alert-danger mt-3" role="alert">
                {errorMessage}
              </div>
            )}
          <button type="submit" className="btn btn-primary">Submit</button>
        </Form>
      </div>
    </div>
    </div>
  );
}

export default FormsUsers;
