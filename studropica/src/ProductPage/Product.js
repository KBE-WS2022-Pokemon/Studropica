// need to create a page which is first splitted in two sections
import React, { useState } from "react";
import {
  Button,
  Row,
  Col,
  Stack,
  Image,
  Container,
  InputGroup,
  Dropdown,
  Form,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import mainImage from "../images/grey.png";

function ProductPage() {
  const [count, setCount] = useState(1);
  //todo set price to appropriate product price from datbase
  const [price, setPrice] = useState(100);

  function handleQuantity(e) {
    if (e.target.value === "+") {
      setCount(count + 1);
    } else if (e.target.value === "-" && count > 1) {
      setCount(count - 1);
    }
    handlePrice(e.target.value);
  }

  function handlePrice(e) {
    console.log(e);
    //TODO 100 should be the value from the price of the choosen product from the database
    if (e === "+") {
      setPrice((count + 1) * 100);
    } else if (e === "-" && count > 1) {
      setPrice((count - 1) * 100);
    }
  }

  return (
    <Container className="mt-5">
      <Row className=" mt-5">
        <Col className="text-center mt-5">
          <Image src={mainImage} width={500} height={600} />
        </Col>
        <Col>
          <Stack gap={4} className="text-left mt-5">
            <h2>
              Rhodiola rosea <br /> <h5>99€</h5>
            </h2>
            <p>
              Although Rhodiola rosea has been used in traditional medicine,
              there is no high-quality clinical evidence of its effectiveness to
              treat any disease.
            </p>
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
                  <option value="1">200 mg</option>
                  <option value="2">300 mg</option>
                </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col>
                <LinkContainer to="/cart">
                  <Button variant="dark" className="w-100" size="lg">
                    Add to Cart - {price}€
                  </Button>
                </LinkContainer>
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
