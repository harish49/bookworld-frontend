import React from "react";
import { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ShippingAddress } from "../actions/cartAction";
const Checkout = (props) => {
  let userCart = useSelector((state) => state.userCart);
  const { shippingAddress } = userCart;
  const [houseNumber, setHouseNumber] = useState(shippingAddress.houseNumber);
  const [locality, setLocality] = useState(shippingAddress.locality);
  const [city, setCity] = useState(shippingAddress.city);
  const [pincode, setPinCode] = useState(shippingAddress.pincode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();
  const formsubmitHandler = (e) => {
    e.preventDefault();
    console.log("submit");
    dispatch(
      ShippingAddress({ houseNumber, locality, city, pincode, country })
    );
    props.history.push("/payment");
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
              Shipping Address
            </h5>
            <Form onSubmit={formsubmitHandler}>
              <Row>
                <Col>
                  <Form.Group controlId="houseNumber">
                    <Form.Control
                      type="text"
                      placeholder="House number"
                      value={houseNumber}
                      required
                      onChange={(e) => setHouseNumber(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                &nbsp; &nbsp; &nbsp;
                <Col>
                  <Form.Group controlId="locality">
                    <Form.Control
                      type="text"
                      placeholder="locality"
                      value={locality}
                      required
                      onChange={(e) => setLocality(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <br></br>
              <Form.Group controlId="city">
                <Form.Control
                  type="text"
                  placeholder="city"
                  value={city}
                  required
                  onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <br></br>
              <Form.Group controlId="pincode">
                <Form.Control
                  type="number"
                  placeholder="pincode"
                  value={pincode}
                  required
                  onChange={(e) => setPinCode(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <br></br>
              <Form.Group controlId="country">
                <Form.Control
                  type="text"
                  placeholder="country"
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <br></br>
              <br></br>
              <br></br>
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

export default Checkout;
