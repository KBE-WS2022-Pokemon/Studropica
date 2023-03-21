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
      //"pk_test_51MdC6xHYvapymDO9uPTwAf3jp3vyrYLCsVAfszQwdF7SaK6d7mCp4owvWHbjQmCmLEIio5Pn7XSTr8v9xTBO39pU000frhtkqo"
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
  const [formData, setFormData] = useState({});

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
      //return total + item.price * item.amount;

    }, 0);
    setTotalPrice(totalPrice.toFixed(2));
    window.location.reload();
  };

  /*const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/`,
    cancelUrl: `${window.location.origin}/cancel`,
  };*/
  //add all items
  const myDict = {
    "Pramiracetam": "price_1MnscpE7jIbDinv8wMAck6ke",
    "Phenylpiracetam": "price_1MnrsnE7jIbDinv8YWZgcJXU",
    "Aniracetam": "price_1MntBpE7jIbDinv851B2oWvT",
    "Oxiracetam": "price_1MntCCE7jIbDinv8kgdF2hNO",
    "Piracetam": "price_1MntCWE7jIbDinv8QZ5Z2Z7r",
    "Noopept": "price_1MntDyE7jIbDinv8DQ1W8IWB",
    "Adrafinil": "price_1MntEDE7jIbDinv87FHGeCuV",
    "Modafinil": "price_1MntETE7jIbDinv8onCTTm8J",
    "Phenibut": "price_1MntEhE7jIbDinv81jk6wS0e",
    "Sulbutiamine": "price_1MntEuE7jIbDinv8sSG80Y3m",
    "Alpha-GPC": "price_1MntFCE7jIbDinv8hMOH2kOB",
    "Sunifiram": "price_1MntDjE7jIbDinv8XQzLOkQg",
  };

  //create items based on items in card. match name from card items with myDict and than create items with respective ids and add amount form cart
  //request cart
  const newItems = [];
  const items = () => {
    console.log(allData);
    for (let i = 0; i < allData.length; i++) {
      console.log(allData[i].itemName)
      const item = {
        price: myDict[allData[i].itemName],
        quantity: allData[i].amount,
      };
      newItems.push(item);
      console.log(item);
    }
  }
  //need a list with all names and respective product ids. how can i do this? can do a list here where i store them al
  const checkoutOptions = {
    lineItems: newItems,
    mode: "payment",
    successUrl: `${window.location.origin}/`,
    cancelUrl: `${window.location.origin}/`,
  };
  const emptyCart = () => {
    for (let i = 0; i < allData.length; i++) {
      axios
        .request({
          method: "delete",
          url: "http://localhost:8090/api/cart/" + allData[i].uuid,
        })
        .then((response) => {
          console.log(response);
        });
    }
  };

  const redirectToCheckout = async () => {
    //how can i call this request now after i had success with my checkout
    const selectedOptions = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    if (selectedOptions.length === 0) {
      alert("Please select one of the options");
      return;
    }
    const shippingOption = selectedOptions[0].value;
    setFormData({
      ...formData,
      shippingOption: shippingOption,
    });

    try {
      await axios.request({
        method: "post",
        url: "http://localhost:8090/api/checkout/address",
        data: formData,
      });
    } catch (error) {
      alert("Error sending form data. Please try again later.");
      return;
    }
    setLoading(true);
    items();
    console.log("redirectToCheckout");
    //call checkoutoptions 
    const options = checkoutOptions
    console.log("before");
    console.log(options);
    emptyCart();
    console.log("after");
    console.log(options);
    const stripe = await getStripe();
    const { error, result } = await stripe.redirectToCheckout(options);
    console.log("das ist eion rte!");
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
                    <Row>{allData[idx].itemName}</Row>
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
