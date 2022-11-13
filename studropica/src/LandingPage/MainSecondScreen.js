// create a headline subheadline and button and center everything with bootstrap

import React from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Stack,
  Figure,
  Image,
} from "react-bootstrap";
//import "./MainStartScreen.css";
//import downloas.png from "./download.png";
//need to add horizontal line in vertical stack

import mainImage from "../images/grey.png";
import htwImage from "../images/htw_berlin.png";
import chariteImage from "../images/charite.png";
import tuImage from "../images/tu_berlin.png";
import codeImage from "../images/code.png";

const MainSecondScreen = () => {
  return (
    <Stack gap={4} className="mt-5">
      <div className="text-center mt-5">
        <h1>Our Latest Arrivals</h1>
      </div>
      <div className="text-center">
        Convince yourself and finally achieve the breakthrough!
      </div>
      <div className="text-center">
        <Button variant="outline-dark" size="lg">
          Shop All
        </Button>
      </div>
      <div className="text-center">
        <Row className="justify-content-center">
          <Col className="mt-5">
            <Image src={mainImage} height={400} width={350} />
          </Col>
          <Col>
            <Image src={mainImage} height={400} width={350} />
          </Col>
          <Col className="mt-5">
            <Image src={mainImage} height={400} width={350} />
          </Col>
        </Row>
      </div>
    </Stack>
  );
};

export default MainSecondScreen;
