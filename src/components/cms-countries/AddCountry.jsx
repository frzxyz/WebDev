import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import "../../styles/Countries.css";

const AddCountry = () => {
  return (
    <div className="add-country">
      <h4 style={{ marginLeft: "10px" }}>Add Country</h4>
      <Container fluid>
        <Form inline>
          <Row style={{ marginTop: "20px" }}>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Input Country Name"
                className=" mr-sm-2"
              />
            </Col>
            <Col xs="auto">
              <Button type="submit">Add</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default AddCountry;
