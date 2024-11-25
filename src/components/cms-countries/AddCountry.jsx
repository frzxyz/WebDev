import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/Countries.css";
import StatusPopup from "../StatusPopup";

const AddCountry = () => {
  // State untuk menyimpan nama negara yang diinput
  const [countryName, setCountryName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    setErrorMessage('');

    if (!countryName.trim()) {
      showPopup("error", "Please enter a valid country name.");
      return;
    }

    // Regex untuk memeriksa apakah input valid (huruf, spasi, tanda hubung, apostrof)
    const validNameRegex = /^[A-Za-z\s'-]+$/;

    // Cek apakah input valid
    if (!validNameRegex.test(countryName)) {
      showPopup("error", "Country name must only contain letters, spaces, hyphens, and apostrophes.");
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
      showPopup("success", `Country "${result.name}" added successfully!`);

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

      {statusPopup.show && (
        <StatusPopup
          type={statusPopup.type}
          message={statusPopup.message}
          onClose={hidePopup}
          onConfirm={statusPopup.onConfirm}
          isConfirm={statusPopup.isConfirm}
        />
      )}

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
