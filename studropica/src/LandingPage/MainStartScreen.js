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

const MainStartScreen = () => {
  return (
    <Stack gap={5}>
      <div className="text-center mt-4">
        <h1>Mind Enhancement For Better Studies</h1>
      </div>
      <div className="text-center">
        With thoroughly operated research we can present your our selection of
        most promising nootropics. Its time for performance!
      </div>
      <div className="text-center">
        <Button variant="outline-dark" size="lg">
          Shop All
        </Button>
      </div>
      {/*adding image from same folder*/}
      <div className="text-center">
        <Image src={mainImage} height={400} width={1000} />
      </div>
      <div className="text-center">
        <Row className="justify-content-center">
          <Col>
            <Image src={htwImage} width={100} />
          </Col>
          <Col>
            <Image src={chariteImage} width={100} />
          </Col>
          <Col>
            <Image src={tuImage} width={100} />
          </Col>
          <Col>
            <Image src={codeImage} width={100} />
          </Col>
        </Row>
      </div>
    </Stack>
  );
};

export default MainStartScreen;
