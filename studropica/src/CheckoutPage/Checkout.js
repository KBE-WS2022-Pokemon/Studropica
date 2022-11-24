import React, { useState } from "react";
import {
  Button,
  Row,
  Col,
  Stack,
  Image,
  Container,
  Form,
  ProgressBar,
} from "react-bootstrap";

import mainImage from "../images/grey.png";

// TODO: [K2P-24] get here like on cart site products from database and display calc steps based on that.

function Checkout() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");
  const [check, setChecked] = useState("no");

  const [count, setCount] = useState(3);

  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 5,
      }}
    />
  );

  function decreaseCount() {
    setCount(count - 1);
  }

  function validateForm() {
    if (
      firstName.firstName === undefined ||
      lastName.lastName === undefined ||
      address.address === undefined ||
      apartment.apartment === undefined ||
      city.city === undefined ||
      zipcode.zipcode === undefined ||
      country.country === undefined ||
      country.country === "Country" ||
      check === "no"
    ) {
      alert("Please fill out all fields");
      return false;
    } else {
      window.location.href = "/shipping";
      return true;
    }
  }
  return (
    <Container>
      <Row className="mt-5">
        <Col className="mt-5 ">
          <h1>Checkout</h1>
          <ProgressBar variant="black" now={33} label={`${33}%`} />
          <Row className="mb-3">
            <strong className="mt-5">Shipping Information</strong>
          </Row>
          <Stack gap={3}>
            <Row>
              <Col>
                <Form.Control
                  placeholder="First Name"
                  onChange={(e) => setFirstName({ firstName: e.target.value })}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Last Name"
                  onChange={(e) => setLastName({ lastName: e.target.value })}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control
                  placeholder="Address"
                  onChange={(e) => setAddress({ address: e.target.value })}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control
                  placeholder="Apartment, suite, etc (optional)"
                  onChange={(e) => setApartment({ apartment: e.target.value })}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setCountry({ country: e.target.value })}
                >
                  <option>Country </option>
                  <option value="1">Germany</option>
                  <option value="2">Austria</option>
                  <option value="3">Switzerland</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Control
                  placeholder="City"
                  onChange={(e) => setCity({ city: e.target.value })}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Zipcode"
                  onChange={(e) => setZipcode({ zipcode: e.target.value })}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Check
                  required
                  label="Save contact information"
                  feedback="You must agree before submitting."
                  feedbackType="invalid"
                  onChange={(e) => {
                    e.target.checked ? setChecked("yes") : setChecked("no");
                  }}
                />
              </Col>
            </Row>
            <Button variant="dark" size="lg" onClick={validateForm}>
              Continue to shipping
            </Button>
          </Stack>
        </Col>
        <Col className="mt-5">
          <Stack gap={4} className="mt-5">
            Your cart
            {Array.from({ length: count }).map((_, idx) => (
              <Row>
                <Col>
                  <Image src={mainImage} width={100} height={100} />
                </Col>
                <Col>
                  <strong>
                    <Row>Rhodiola rosea</Row>
                  </strong>
                  <Row>Size: 150mg</Row>
                  <Row>Quantity: 1</Row>
                  <strong>
                    <Row className="price">€99</Row>
                  </strong>
                </Col>
                <Col>
                  <Row>
                    <Button
                      id="removeButton"
                      onClick={decreaseCount}
                      variant="link"
                    >
                      Remove
                    </Button>
                  </Row>
                </Col>
              </Row>
            ))}
          </Stack>
          <Stack gap={4} className="mt-5 mb-5">
            <Form.Control type="email" placeholder="Enter coupon code here" />
            <Row>
              {/*TODO: [K2P-25] needs to be calculated later from items on left side (together with total)*/}
              <Col>Subtotal</Col>
              <Col>€100</Col>
            </Row>
            <Row>
              <Col>Shipping</Col>
              <Col>Calculated at the next step</Col>
            </Row>
            <ColoredLine color="black" />
            <Row>
              <Col>Total</Col>
              <Col>€100</Col>
            </Row>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;
