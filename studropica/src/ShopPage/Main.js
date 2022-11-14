import React from "react";
import { Button, Row, Col, Stack, Image, Card } from "react-bootstrap";
import mainImage from "../images/grey.png";
import "./Main.css";

const Main = (props) => {
  const cars = props.cars;
  return (
    <>
      <h1>Garage</h1>
      {cars.length > 0 && <h2>You have {cars.length} cars in your garage.</h2>}
    </>
  );
};

const cars = ["Ford", "BMW", "Audi"];
export default Main;

/*
const Main = (props) => {

  const cars = props.cars;
  return (
    <>
      <h1>Garage</h1>
      {cars.length > 0 &&
        <h2>
          You have {cars.length} cars in your garage.
        </h2>
      }
    </>
  );
}
const cars = ['Ford', 'BMW', 'Audi'];

export default Main;
/*


// create a component which displays a card and if a button gets pressed more products are displayed
/*export default function Main() {
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
        <Button
          variant="outline-dark"
          size="lg"
          className="mt-5"
        >
          Load More Products
        </Button>
      </div>
    </div>
  );
}*/

/*function loadCardGroupWithoutButton() {
  //return either that what is already in shopPage or the new cardgroup
  return (
    <div>
      <Row xs={1} md={3} className="g-4 mt-5">
        {Array.from({ length: 9 }).map((_, idx) => (
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
    </div>
  );
}

const ShopPage = () => {
  //if button is clicked, load more products
  //i dont need a state for that actually because we only have 9 products. if the site refreshes the load more button gets displayed
  //this does mean the functionality works like that: if the button gets clicked the i render the code from the different method

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
        <Button
          variant="outline-dark"
          size="lg"
          className="mt-5"
          
          onClick={loadCardGroupWithoutButton}
        >
          Load More Products
        </Button>
      </div>
    </div>
  );
};

export default ShopPage;*/
