import React from "react";
import { Button, Row, Col, Stack, Image, Card } from "react-bootstrap";
import mainImage from "../images/grey.png";
import "./Main.css";



//if load more products is clicked, load more products
function loadMore() {
  //load more products
  //todo add function for loading more products

 
}


const ShopPage = () => {
  return (
    <div id="len">
      <Row xs={1} md={3} className="g-4 mt-5">
        {Array.from({ length: 6 }).map((_, idx) => (
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
      <div className="text-center mt-5">
        <Button variant="outline-dark" size="lg" className="mt-5">
          Load More Products
        </Button>
      </div>
    </div>
  );
};



export default ShopPage;
