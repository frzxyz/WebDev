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
  const [errorMessage, setErrorMessage] = useState('');

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    setErrorMessage('');

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
      const response = await fetch('/api/cms/countries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: countryName }), // Kirim nama negara ke API
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Failed to add country");
        return;
      }

      const result = await response.json();
      alert(`Country "${result.name}" added successfully!`);

      // Reset form
      setCountryName('');
    } catch (error) {
      console.error("Failed to add country", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
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
            {errorMessage && (
              <div className="alert alert-danger mt-3" role="alert">
                {errorMessage}
              </div>
            )}
          </Row>
        </Form>
      </Container>
      </div>
      </div>
    </div>
  );
};

export default AddCountry;
