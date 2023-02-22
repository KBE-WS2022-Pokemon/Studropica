import React from "react";
import { Button, Row, Col, Stack, Image } from "react-bootstrap";
import mainImage from "../images/grey.png";
import { LinkContainer } from "react-router-bootstrap";

import sampleImageOne from "../images/Product_images/Alpha-GPC.png";
import sampleImageTwo from "../images/Product_images/Aniracetam.png";
import sampleImageThree from "../images/Product_images/Modafinil.png";

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
        <LinkContainer to="/shop">
          <Button variant="outline-dark" size="lg">
            Shop All
          </Button>
        </LinkContainer>
      </div>
      <div className="text-center">
        <Row className="justify-content-center">
          <Col className="mt-5">
            <Image src={sampleImageOne} height={400} width={350} />
          </Col>
          <Col>
            <Image src={sampleImageTwo} height={400} width={350} />
          </Col>
          <Col className="mt-5">
            <Image src={sampleImageThree} height={400} width={350} />
          </Col>
        </Row>
      </div>
    </Stack>
  );
};



export default MainSecondScreen;
