import React from "react";
import { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { PaymentMethod } from "../actions/cartAction";
import { CREDITCARD, RAZORPAY } from "../Appconstants.js/bookconstants";
const Payment = (props) => {
  let userCart = useSelector((state) => state.userCart);
  const { shippingAddress } = userCart;
  if (!shippingAddress) {
    props.history.push("/checkout");
  }
  const [paymentMethod, setPaymentMethod] = useState("creditcard");
  const dispatch = useDispatch();
  const formsubmitHandler = (e) => {
    e.preventDefault();
    console.log(paymentMethod);
    dispatch(PaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };
  return (
    <div>
      <Container style={{ paddingTop: 25 }}>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6} lg={4} className="shadow rounded">
            <h5
              style={{
                textAlign: "center",
                paddingTop: 40,
                paddingBottom: 30,
              }}
            >
              Select Payment
            </h5>
            <Form onSubmit={formsubmitHandler}>
              <Row>
                <Col>
                  <Form.Check
                    type="radio"
                    label={CREDITCARD}
                    id={CREDITCARD}
                    value={CREDITCARD}
                    name="paymentMethod"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>
                  <Form.Check
                    type="radio"
                    label={RAZORPAY}
                    id={RAZORPAY}
                    value={RAZORPAY}
                    name="paymentMethod"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>
                </Col>
              </Row>
              &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                type="submit"
                variant="dark"
                className="shadow rounded w-50"
              >
                Continue
              </Button>
              <br></br>
              <br></br>
              <br></br>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Payment;
