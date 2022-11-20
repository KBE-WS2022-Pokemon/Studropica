import React, { useState } from "react";
import {
  Button,
  Row,
  Col,
  Stack,
  Image,
  Container,
  InputGroup,
  Dropdown,
  Form,
  Card,
  Accordion,
  ProgressBar,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import mainImage from "../images/grey.png";

function Checkout() {
    //states for the form
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [apartment, setApartment] = useState("");
    const [city, setCity] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [country, setCountry] = useState("");
    //todo contact info
    
    // TODO: DKKD


    
    //function if on button click any field is empty or not selectzed alert in red font
    function validateForm() {
        //check if there is in <Form.Control placeholder="First Name" /> any text
        console.log(firstName);



        
    }
  return (
    <Container>
      <Row className="mt-5">
        <Col className="mt-5">
          <h1>Checkout</h1>
          <ProgressBar variant="black" now={33} label={`${33}%`} />
          <Row className="mb-3">
            <strong className="mt-5">Shipping Information</strong>
          </Row>
          <Stack gap={3}>
            <Row>
              <Col>
                <Form.Control placeholder="First Name" onChange={e => setFirstName({ firstName: e.target.value })} />
              </Col>
              <Col>
                <Form.Control placeholder="Last Name" onChange={e => setLastName({ lastName: e.target.value })}/>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control placeholder="Address" onChange={e => setAddress({ address: e.target.value })}/>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control placeholder="Apartment, suite, etc (optional)" onChange={e => setApartment({ apartment: e.target.value })}/>
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <Form.Select aria-label="Default select example" >
                  <option>Country </option>
                  <option value="1">Germany</option>
                  <option value="2">Austria</option>
                  <option value="3">Switzerland</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Control placeholder="City" />
              </Col>
              <Col>
                <Form.Control placeholder="Zipcode" />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Check
                  required
                  label="Save contact information"
                  feedback="You must agree before submitting."
                  feedbackType="invalid"
                />
              </Col>
            </Row>
            <Button variant="dark" size="lg" onClick={validateForm}>
              Continue to shipping
            </Button>
          </Stack>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default Checkout;
