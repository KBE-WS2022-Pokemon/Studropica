import React, { useState, useEffect } from "react";
import { Button, Image, Card, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import mainImage from "../images/grey.png";
import bottleImage from "../images/pills_box.png";
import "./Main.css";
import { useContext } from "react";
import { ProductContext } from "../Context/ProductContext";

import axios, { all } from "axios";

const ShopPage = () => {

  const [allNames, setAllNames] = useState([]);
  const [allPrices, setAllPrices] = useState([]);
  const [allImages, setAllImages] = useState([]);
  useEffect(() => {
    axios
      .request({
        method: "get",
        url: "http://localhost:8090/api/product",
      })
      .then((response) => {
        console.log(response.data);

        const names = response.data.map((product) => product.name);
        const prices = response.data.map((product) => product.price);
        const images = response.data.map((product) => product.image);

        setAllNames(names);
        setAllPrices(prices);
        setAllImages(images);
      });
  }, []);

  const [showButton, setShowButton] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [displayCount, setDisplayCount] = useState(6);

  const handleClick = () => {
    if (displayCount >= allNames.length) {
      setShowButton(false);
    } else {
      setDisplayCount(displayCount + 3);
    }
  };

  return (
    <div id="len">
      <Row xs={1} md={3} className="g-4 mt-5">
        {Array.from({ length: displayCount }).map((_, idx) => (
          <Col className="mt-5">
            <LinkContainer to={`/product/${idx + 1}`}>
              <Card>
                <Card.Img variant="top" src={allImages[startIndex + idx]} />
                <Card.Body>
                  <Card.Title>{allNames[startIndex + idx]}</Card.Title>
                  <Card.Text>{allPrices[startIndex + idx]} €</Card.Text>
                </Card.Body>
              </Card>
            </LinkContainer>
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
