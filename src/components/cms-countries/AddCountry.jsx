import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import 'bootstrap/dist/css/bootstrap.min.css';

import "../../styles/Countries.css";

const AddCountry = () => {
  return (
    <div className="add-country">
      <h4 >Add Country</h4>
      <div class="card">
      <div class="card-body">
      <Container fluid>
        <Form inline>
          <Row >
            <Col >
              <Form.Control
                type="text"
                placeholder="Enter Country Name"
                className=" mr-sm-2"
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
