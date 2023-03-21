import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from '../axiosInterceptor';
const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvc, setCvc] = useState('');

  const [count, setCount] = useState(0);
  const [allData, setAllData] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  

  //function which gets called if pay button is clicked
    //if all fields valid send data via post request to backend + empty cart + redirect to home page
  function handlePay() {
    if (cardNumber.length === 16 && expDate.length === 5 && cvc.length === 3) {
      axios
        .request({
          method: "post",
          url: "http://localhost:8090/api/order",
          data: {
            totalPrice: totalPrice,
            products: allData,
          },
        })
        .then((response) => {
          console.log(response);
          axios
            .request({
              method: "delete",
              url: "http://localhost:8090/api/cart",
            })
            .then((response) => {
              console.log(response);
              window.location.href = "/";
            });
        });
    } else {
      alert("Please fill in all fields correctly");
    }
  }

  return (
    <Container className='mt-5'>
      <Row>
        <Col sm={12} md={6} className="mt-5">
          <h3>Total Cost:</h3>
          <p>This is the left column content.</p>
        </Col>
        <Col sm={12} md={6} className="mt-5">
          <h3>Card Information</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCardNumber">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter card number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formExpDate">
              <Form.Label>Expiration Date</Form.Label>
              <Form.Control
                type="text"
                placeholder="MM/YY"
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCvc">
              <Form.Label>CVC</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter CVC"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit" size="md" className='mt-3'>
                Pay
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentForm;

