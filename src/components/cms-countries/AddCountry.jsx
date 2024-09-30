import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import 'bootstrap/dist/css/bootstrap.min.css';

import "../../styles/Countries.css";

const AddCountry = () => {
  // State untuk menyimpan nama negara yang diinput
  const [countryName, setCountryName] = useState('');

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman

    if (!countryName.trim()) {
      alert("Please enter a valid country name.");
      return;
    }

    // Regex untuk memeriksa apakah input valid (huruf, spasi, tanda hubung, apostrof)
    const validNameRegex = /^[A-Za-z\s'-]+$/;

    // Cek apakah input valid
    if (!validNameRegex.test(countryName)) {
      alert("Country name must only contain letters, spaces, hyphens, and apostrophes.");
      return;
    }

    try {
      const response = await fetch('/api/countries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: countryName }), // Kirim nama negara ke API
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      alert(`Country "${result.name}" added successfully!`);

      // Reset form
      setCountryName('');
    } catch (error) {
      console.error("Error adding country:", error);
      alert("Failed to add country. Please try again.");
    }
  };

  return (
    <div className="add-country">
      <h5 >Add Country</h5>
      <div className="card">
      <div className="card-body">
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row >
            <Col >
              <Form.Control
                type="text"
                placeholder="Enter Country Name"
                className=" mr-sm-2"
                value={countryName}
                onChange={(e) => setCountryName(e.target.value)} // Update state saat input berubah
                required
              />
            </Col>
            <Col >
              <Button type="submit">Add</Button>
            </Col>
          </Row>
        </Form>
      </Container>
      </div>
      </div>
    </div>
  );
};

export default AddCountry;
