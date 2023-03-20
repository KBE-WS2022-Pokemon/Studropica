import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from '../axiosInterceptor';
const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvc, setCvc] = useState('');

  const [count, setCount] = useState(0);
  const [allData, setAllData] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle payment submission
  };

  //use effect which is doing cart request and than calculate total price and sets it 
  useEffect(() => {
    axios
      .request({
        method: "get",
        url: "http://localhost:8090/api/cart",
      })
      .then((response) => {
        const data = response.data;
        Promise.all(
          data.map((item) =>
            axios
              .request({
                method: "get",
                url: "http://localhost:8090/api/product/" + item.uuid,
              })
              .then((response) => {
                item.imageUrl = response.data.imageUrl;
                return item;
              })
          )
        )
          .then((modifiedData) => {
            setAllData(modifiedData);
            setCount(modifiedData.length);
            const totalPrice = modifiedData.reduce((total, item) => {
              return total + item.price * item.amount;
            }, 0);
            setTotalPrice(totalPrice.toFixed(2));
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  

  //function which gets called if pay button is clicked
    //if all fields valid send data via post request to backend + empty cart + redirect to home page
  function handlePay() {
    if (cardNumber.length === 16 && expDate.length === 5 && cvc.length === 3) {
      axios
        .request({
          method: "post",
          url: "http://localhost:8090/api/order",
          data: {
            totalPrice: totalPrice,
            products: allData,
          },
        })
        .then((response) => {
          console.log(response);
          axios
            .request({
              method: "delete",
              url: "http://localhost:8090/api/cart",
            })
            .then((response) => {
              console.log(response);
              window.location.href = "/";
            });
        });
    } else {
      alert("Please fill in all fields correctly");
    }
  }

  return (
    <Container className='mt-5'>
      <Row>
        <Col sm={12} md={6} className="mt-5">
          <h3>Total Cost:</h3>
          <p>This is the left column content.</p>
        </Col>
        <Col sm={12} md={6} className="mt-5">
          <h3>Card Information</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCardNumber">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter card number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formExpDate">
              <Form.Label>Expiration Date</Form.Label>
              <Form.Control
                type="text"
                placeholder="MM/YY"
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCvc">
              <Form.Label>CVC</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter CVC"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit" size="md" className='mt-3'>
                Pay
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentForm;


/*
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
import { Navigate, Redirect, useNavigate } from "react-router-dom";
import axios, { all } from "axios";

function Checkout() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");
  const [allData, setAllData] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);

  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .request({
        method: "get",
        url: "http://localhost:8090/api/cart",
      })
      .then((response) => {
        const data = response.data;
        Promise.all(
          data.map((item) =>
            axios
              .request({
                method: "get",
                url: "http://localhost:8090/api/product/" + item.uuid,
              })
              .then((response) => {
                item.imageUrl = response.data.imageUrl;
                return item;
              })
          )
        )
          .then((modifiedData) => {
            setAllData(modifiedData);
            setCount(modifiedData.length);
            const totalPrice = modifiedData.reduce((total, item) => {
              return total + item.price * item.amount;
            }, 0);
            setTotalPrice(totalPrice.toFixed(2));
          })
          .catch((error) => {
            console.log(error);
          });
      });
  }, []);

  const removeItem = (index) => {
    axios
      .request({
        method: "delete",
        url: "http://localhost:8090/api/cart/" + allData[index].uuid,
      })
      .then((response) => {
        console.log(response);
      });
    const newData = [...allData];
    newData.splice(index, 1);
    setAllData(newData);
    setCount(newData.length);
    const totalPrice = newData.reduce((total, item) => {
      return total + item.price * item.amount;
    }, 0);
    setTotalPrice(totalPrice.toFixed(2));
    window.location.reload();
  };

  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 5,
      }}
    />
  );

  function validateForm() {
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
                  <Image src={allData[idx].imageUrl} width={100} height={100} />
                </Col>
                <Col>
                  <strong>
                    <Row>{allData[idx].name}</Row>
                  </strong>
                  <Row>Size: 100mg</Row>
                  <Row>Quantity: {allData[idx].amount}</Row>
                  <strong>
                    <Row className="price">
                      € {(allData[idx].price * allData[idx].amount).toFixed(2)}
                    </Row>
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
              <Col>Subtotal</Col>
              <Col>€ {totalPrice}</Col>
            </Row>
            <Row>
              <Col>Shipping</Col>
              <Col>Calculated at the next step</Col>
            </Row>
            <ColoredLine color="black" />
            <Row>
              <Col>Total</Col>
              <Col>€ {totalPrice}</Col>
            </Row>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;



*/
