import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Button,
  Row,
  Col,
  Stack,
  Image,
  Container,
  Form,
  ProgressBar,
} from "react-bootstrap";
import axios, { all } from "axios";
let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51KG40qE7jIbDinv8gi3HDYthubVs4gc3dGbpBzoyQG47Cddes3hZvy0GokC5nmikjZSwODOLVfzLRg3OEAQG5qpM00f6MvchPX"
    );
  }
  return stripePromise;
};

function Shipping() {
  const [stripeError, setStripeError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const [count, setCount] = useState(0);
  const [allData, setAllData] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);

  useEffect(() => {
    axios
      .request({
        method: "get",
        url: "http://localhost:8090/api/cart",
      })
      .then((response) => {
        const data = response.data;
        Promise.all(
          data.map((item) =>
            axios
              .request({
                method: "get",
                url: "http://localhost:8090/api/product/" + item.uuid,
              })
              .then((response) => {
                item.imageUrl = response.data.imageUrl;
                return item;
              })
          )
        )
          .then((modifiedData) => {
            setAllData(modifiedData);
            setCount(modifiedData.length);
            const totalPrice = modifiedData.reduce((total, item) => {
              return total + item.price * item.amount;
            }, 0);
            setTotalPrice(totalPrice.toFixed(2));
          })
          .catch((error) => {
            console.log(error);
          });
      });
  }, []);

  const removeItem = (index) => {
    axios
      .request({
        method: "delete",
        url: "http://localhost:8090/api/cart/" + allData[index].uuid,
      })
      .then((response) => {
        console.log(response);
      });
    const newData = [...allData];
    newData.splice(index, 1);
    setAllData(newData);
    setCount(newData.length);
    const totalPrice = newData.reduce((total, item) => {
      return total + item.price * item.amount;
    }, 0);
    setTotalPrice(totalPrice.toFixed(2));
    window.location.reload();
  };

  const item = {
    price: "price_1M58zVE7jIbDinv8crv6PIeR",
    quantity: 1,
  };

  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`,
  };

  const redirectToCheckout = async () => {
    const selectedOptions = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    if (selectedOptions.length === 0) {
      alert("Please select one of the options");
      return;
    }
    const shippingOption = selectedOptions[0].value;
    const formData = {
      ...formData,
      shippingOption: shippingOption,
    };
    axios
      .request({
        method: "post",
        url: "http://localhost:8090/api/checkout/address",
        data: formData,
      })
      .catch((error) => {
        alert("Error sending form data. Please try again later.");
      });

    setLoading(true);
    console.log("redirectToCheckout");

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("Stripe checkout error", error);

    if (error) setStripeError(error.message);
    setLoading(false);
  };

  if (stripeError) alert(stripeError);

  return (
    <Container>
      <Row className="mt-5">
        <Col className="mt-5">
          <h1>Checkout</h1>
          <ProgressBar variant="black" now={66} label={`${66}%`} />
          <Row className="mb-3">
            <Form>
              <div
                key={"checkbox"}
                className="mb-3 mt-5 p-3 border border-dark"
              >
                <Form.Check type={"checkbox"}>
                  <Form.Check.Input type={"checkbox"} />
                  <Form.Check.Label>
                    {<strong>DHL Surepost</strong>}
                  </Form.Check.Label>
                  <br />
                  4-7 Business Days
                </Form.Check>
              </div>
            </Form>
            <Form>
              <div
                key={"checkbox"}
                className="mb-3 mt-3 p-3 border border-dark"
              >
                <Form.Check type={"checkbox"}>
                  <Form.Check.Input type={"checkbox"} />
                  <Form.Check.Label>
                    {<strong>DHL Ground Shipping</strong>}
                  </Form.Check.Label>
                  <br />
                  3-5 Business Days
                </Form.Check>
              </div>
            </Form>
          </Row>
          <Row className="mt-5">
            <Col className="mt-5">
              <Stack>
                <Button
                  variant="dark"
                  size="lg"
                  onClick={redirectToCheckout}
                  disabled={isLoading}
                >
                  Continue to payment
                </Button>
              </Stack>
            </Col>
          </Row>
        </Col>
        <Col className="mt-5">
          <Stack gap={4} className="mt-5">
            Your cart
            {Array.from({ length: count }).map((_, idx) => (
              <Row>
                <Col>
                  <Image src={allData[idx].imageUrl} width={100} height={100} />
                </Col>
                <Col>
                  <strong>
                    <Row>{allData[idx].name}</Row>
                  </strong>
                  <Row>Size: 100mg</Row>
                  <Row>Quantity: {allData[idx].amount}</Row>
                  <strong>
                    <Row className="price">
                      € {(allData[idx].price * allData[idx].amount).toFixed(2)}
                    </Row>
                  </strong>
                </Col>
                <Col>
                  <Row>
                    <Button
                      id="removeButton"
                      onClick={() => removeItem(idx)}
                      variant="link"
                    >
                      Remove
                    </Button>
                  </Row>
                </Col>
              </Row>
            ))}
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default Shipping;
