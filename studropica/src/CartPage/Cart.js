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
import { LinkContainer } from "react-router-bootstrap";

import mainImage from "../images/grey.png";
import "./Cart.css";

function CartPage() {
  // on click remove item gets removed (just change value for count )
  const [count, setCount] = useState(3);

  function decreaseCount() {
    setCount(count - 1);
  }
  const [total, setTotal] = useState(0);
  //create a function which gets executed when the page gets loaded
  function calcTotal() {
    //get teh content from the react bootstrap component "Row" with the classname "price"
    const price = document.getElementsByClassName("price");
    console.log(price);
    ///get childrens of price readct bootstrap component
  }

  window.onload = calcTotal();

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
            {/* TODO: [K2P-22] this values need to be from the database*/}
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
                  {/*TODO: [K2P-23] Substitute Lorem ipsum*/}
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
              {/*TODO: needs to be calculated later from items on left side (together with total)*/}
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
