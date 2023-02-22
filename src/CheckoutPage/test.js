

import React, { useState, useEffect } from "react";
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
import { LinkContainer } from "react-router-bootstrap";
import { Navigate, Redirect, useNavigate} from "react-router-dom";

import axios, { all } from "axios";
import mainImage from "../images/grey.png";

import Shipping from "./Shipping";
// TODO: [K2P-24] get here like on cart site products from database and display calc steps based on that.

function Checkout() {
  console.log("hallo-1");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");
  const [check, setChecked] = useState("no");

  const navigate = useNavigate();
  console.log("hallo-2");
  const [count, setCount] = useState(3);
  console.log("hallo-3");

  const [allData, setAllData] = useState([]);

  const [totalPrice, setTotalPrice] = useState([]);


  //TODO instead of making request to product service i need to make request to checkout service
  useEffect(() => {
    axios
      .request({
        method: "get",
        url: "http://localhost:8090/api/product",
      })
      .then((response) => {
        console.log("hallo0");
        const data = response.data;
        console.log("hallo1");
        setAllData(data);
        console.log("hallo2");
        setCount(data.length);
        console.log("hallo3");

        const totalPrice = data.reduce((total, item) => {
          return total + item.price * item.amount;
        }, 0);
        setTotalPrice(totalPrice.toFixed(2));


        //setAllData(data);
      });
  }, []);

  const removeItem = (index) => {
    //TODO send post request to checkout service to remove item from cart
    const newData = [...allData];
    newData.splice(index, 1);
    setAllData(newData);

    setCount(newData.length);
    const totalPrice = newData.reduce((total, item) => {
      return total + item.price * item.amount;
    }, 0);
    setTotalPrice(totalPrice.toFixed(2));
  }

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
      return navigate("/shipping");
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
                  <Image src={allData[idx].image} width={100} height={100} />
                </Col>
                <Col>
                  <strong>
                    <Row>{allData[idx].name}</Row>
                  </strong>
                  <Row>Size: 150mg</Row>
                  <Row>Quantity: {allData[idx].amount}</Row>
                  <strong>
                    <Row className="price">€ {(allData[idx].price * allData[idx].amount).toFixed(2)}</Row>
                  </strong>
                </Col>
                <Col>
                  <Row>
                    <Button
                      id="removeButton"
                      onClick={() => removeItem(idx)}
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
              <Col>€{totalPrice}</Col>
            </Row>
            <Row>
              <Col>Shipping</Col>
              <Col>Calculated at the next step</Col>
            </Row>
            <ColoredLine color="black" />
            <Row>
              <Col>Total</Col>
              <Col>€{totalPrice}</Col>
            </Row>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;
