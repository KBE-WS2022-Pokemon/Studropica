import React from "react";
import { Button, Row, Col, Stack, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

//import mainImage from "../images/grey.png";
import htwImage from "../images/htw_berlin.png";
import chariteImage from "../images/charite.png";
import tuImage from "../images/tu_berlin.png";
import codeImage from "../images/code.png";
import mainImage from "../images/main.webp";
import axios from 'axios';

const MainStartScreen = () => {
  axios.request({
    method: 'get',
    url: 'http://localhost:8080/product/1',
  }).then(response => {
    console.log(response.data);
  });
  
  return (
    <Stack gap={5} className="mt-5">
      <div id="top" className="text-center mt-5">
        <h1>Mind Enhancement For Better Studies</h1>
      </div>
      <div className="text-center">
        With thoroughly operated research we can present your our selection of
        most promising nootropics. Its time for performance!
      </div>
      <div className="text-center">
        <LinkContainer to="/shop">
          <Button variant="outline-dark" size="lg">
            Shop All
          </Button>
        </LinkContainer>
      </div>
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
