import React, { useState } from "react";
import { useContext, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Stack,
  Image,
  Container,
  InputGroup,
  Form,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import bottleImage from "../images/pills_box.png";
import mainImage from "../images/grey.png";

import axios, { all } from "axios";

import { ProductContext } from "../Context/ProductContext";

import Navigation from "../LandingPage/Navigation";

function ProductPage() {
  const [cartCount, setCartCount] = useState(0);
  //now i have the id and need to get based on the id the product

  /**
   * safe number of available items in var
   * on click of add cart check compare number from var and number in cart
   * if number in cart is less than var then add to cart else show alert
   *
   */
  const [allAmounts, setAllAmounts] = useState([]);
  const [allNames, setAllNames] = useState([]);
  const [allPrices, setAllPrices] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [allDescriptions, setAllDescriptions] = useState([]);
  const url = window.location.href;
  const urlArray = url.split("/");
  const urlLastElement = urlArray[urlArray.length - 1];

  useEffect(() => {
    axios
      .request({
        method: "get",
        url: "http://localhost:8090/api/product/" + urlLastElement,
      })
      .then((response) => {
        const amount = response.data.amount;
        const name = response.data.name;
        const price = response.data.price;
        const image = response.data.imageUrl;
        const description = response.data.description;
        setAllAmounts(amount);
        setAllNames(name);
        setAllPrices(price);
        setAllImages(image);
        setAllDescriptions(description);
        setPrice(price);
      });
  }, []);

  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(allPrices);

  function handleQuantity(e) {
    if (e.target.value === "+") {
      setCount(count + 1);
    } else if (e.target.value === "-" && count > 1) {
      setCount(count - 1);
    }
    handlePrice(e.target.value);
  }
 
  function handleAmount() {
    if (count <= allAmounts) {
      const url = `http://localhost:8090/api/product/cart/${urlLastElement}`;
      axios
      .request({
        method: "post",
        url: url,
        data: {
          amountBought: count
        }
      })
    } else {
      alert("Not enough items in stock");
    }
    setCount(1);
  }

  function handlePrice(e) {
    if (e === "+") {
      setPrice(((count + 1) * allPrices).toFixed(2));
    } else if (e === "-" && count > 1) {
      setPrice(((count - 1) * allPrices).toFixed(2));
    }
  }
  return (
    <Container className="mt-5">
      <Row className=" mt-5">
        <Col className="text-center mt-5">
          <Image src={allImages} width={500} height={600} />
        </Col>
        <Col>
          <Stack gap={4} className="text-left mt-5">
            <h2>
              {allNames}
              <br /> <h5>{allPrices}€</h5>
            </h2>
            <p>{allDescriptions}</p>
            <Row>
              <Col>
                <InputGroup>
                  <Button
                    variant="outline-secondary"
                    value="-"
                    onClick={handleQuantity}
                  >
                    -
                  </Button>
                  <InputGroup.Text>{count}</InputGroup.Text>
                  <Button
                    variant="outline-secondary"
                    value="+"
                    onClick={handleQuantity}
                  >
                    +
                  </Button>
                </InputGroup>
              </Col>
              <Col>
                <Form.Select aria-label="Default select example">
                  <option>100mg</option>
                </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  variant="dark"
                  className="w-100"
                  size="lg"
                  onClick={handleAmount}
                >
                  Add to Cart - {price}€
                </Button>
                <Navigation cartCount={cartCount} />
              </Col>
              <Col>
                <LinkContainer to="/cart">
                  <Button variant="primary" size="lg" className="w-100">
                    Buy now
                  </Button>
                </LinkContainer>
              </Col>
            </Row>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductPage;
