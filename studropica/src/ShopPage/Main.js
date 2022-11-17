import React, { useState } from "react";
import { Button, Image, Card, Row, Col } from "react-bootstrap";
import mainImage from "../images/grey.png";
import "./Main.css";

const ShopPage = () => {
  const [showButton, setShowButton] = useState(true);
  const [count, setCount] = useState(6);

  const handleClick = () => {
    setShowButton(false);
    setCount(count + 3);
  };

  return (
    <div id="len">
      <Row xs={1} md={3} className="g-4 mt-5">
        {Array.from({ length: count }).map((_, idx) => (
          <Col className="mt-5">
            <Card>
              <Card.Img variant="top" src={mainImage} />
              <Card.Body>
                <Card.Title>Nootropic</Card.Title>
                <Card.Text>99€</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="text-center mt-5 mb-5">
        <Button
          variant="outline-dark"
          size="lg"
          className="mt-5"
          onClick={handleClick}
          hidden={!showButton}
        >
          Load More Products
        </Button>
      </div>
    </div>
  );
};

export default ShopPage;
