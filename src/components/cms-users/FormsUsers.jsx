import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

import "../../styles/Countries.css";
import "../../styles/Awards.css";

function FormsUsers() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/cms-users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email }),
      });

      if (res.ok) {
        const data = await res.json();
        alert('User successfully added');
        setUsername('');
        setEmail('');
      } else {
        const errorData = await res.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user');
    }
  };

  return (
    <div className="add-country">
      <h5 >Add Users</h5>
    <div class="card">
      <div class="card-body">
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
          <button type="submit" class="btn btn-primary">Submit</button>
        </Form>
      </div>
    </div>
    </div>
  );
}

export default FormsUsers;
