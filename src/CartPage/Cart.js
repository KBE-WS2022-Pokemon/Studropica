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
} from "react-bootstrap";
import { useContext, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";

import "./Cart.css";
import axios, { all } from "axios";

function CartPage() {
  const [count, setCount] = useState(0);
  const [allData, setAllData] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);

  useEffect(() => {
    axios
      .request({
        method: "get",
        url: "http://localhost:8090/api/cart",
      })
      .then((response) => {
        let data = response.data;
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

  return (
    <Container>
      <Row>
        <Col className="mt-5">
          <Stack gap={4} className="mt-5">
            <Row>
              <h1>
                Your cart <br />
                <h5>Not ready to checkout? Continue Shopping</h5>
              </h1>
            </Row>
            {Array.from({ length: count }).map((_, idx) => (
              <Row key={idx}>
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
            <Row>
              <h3>Order Information</h3>
              <ColoredLine color="black" />
            </Row>
            <Row>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Return Policy</Accordion.Header>
                  <Accordion.Body>
                    This is our example return policy which is everything you
                    need to know about our returns.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Shipping Options</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Row>
          </Stack>
        </Col>
        <Col>
          <Stack gap={4} className="mt-5">
            <Row className="mt-5">
              <h3 className="mt-5">Order Summary</h3>
            </Row>
            <Row>
              <Form.Control type="email" placeholder="Enter coupon code here" />
            </Row>
            <Row>
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
            <LinkContainer to="/checkout">
              <Button variant="dark">Continue to checkout</Button>
            </LinkContainer>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default CartPage;
