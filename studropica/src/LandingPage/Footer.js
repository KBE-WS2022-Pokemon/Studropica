import React from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Stack,
  Figure,
  Image,
  InputGroup,
  Form,
} from "react-bootstrap";
import "./Footer.css";

const MainStartScreen = () => {
  return (
    <Row>
      <Col xs={6} className="ms-5 mt-5">
        <Stack gap={3}>
          <h2>Sign up for our newsletter</h2>
          <p>
            Be the first to know about our special offers, new product<br /> launches,
            and events.
          </p>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Email Address"
              aria-label="Email Address"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Text id="basic-addon2">Sign Up</InputGroup.Text>
          </InputGroup>
        </Stack>
      </Col>
      <Col className="mt-5">
        <Stack gap={3}>
          <h6>Help</h6>
          <p>Contact Us</p>{" "}
        </Stack>
      </Col>
      <Col className="mt-5">
        <Stack gap={3}>
          <h6>Help</h6>
          <p>Contact Us</p>{" "}
        </Stack>
      </Col>
    </Row>
  );
};

export default MainStartScreen;
