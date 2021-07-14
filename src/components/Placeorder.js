import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { CART, PROCESSING } from "../Appconstants.js/bookconstants";
import { Button, Row, Col, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { orderAction } from "../actions/orderAction";
import Message from "./Message";
const Placeorder = (props) => {
  const usercart = useSelector((state) => state.userCart);
  const userLogin = useSelector((state) => state.userLogin);
  const createOrder = useSelector((state) => state.createOrder);
  const { booksInCart } = usercart;
  const { shippingAddress } = usercart;
  const { userInformation } = userLogin;
  const { order, success, error } = createOrder;

  let [CVV, setCVV] = useState("");
  let [cardNumber, setCardNumber] = useState("");
  let [expirationMonth, setExpirationMonth] = useState("");
  let [expirationYear, setExpirationYear] = useState("");
  let [showAlert, setShowAlert] = useState(true);
  let [formSubmitted, setFormSubmitted] = useState(false);
  let totalPrice = 0;

  booksInCart.forEach((book) => {
    totalPrice += book.quantity * book.bookPrice;
  });
  const getOrderItems = () => {
    let items = [];
    booksInCart.forEach((book) => {
      items.push({
        bookId: book.bookId,
        quantity: book.quantity,
      });
    });
    return items;
  };
  const clearFields = () => {
    setCVV("");
    setCardNumber("");
    setExpirationMonth("");
    setExpirationYear("");
  };
  const dispatch = useDispatch();
  const formsubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      orderAction({
        username: userInformation.userName,
        address: shippingAddress,
        orderstatus: CART,
        payment: {
          price: totalPrice,
          deliveryCharges: 100,
          paymentStatus: PROCESSING,
          paymentMode: usercart.paymentMethod,
        },
        orderItems: getOrderItems(),
      })
    );
    setFormSubmitted(true);
  };
  let updateShowAlert = () => {
    console.log("Hello updateShowAlert");
    setShowAlert(false);
  };
  let redirectToCart = () => {
    props.history.push("/cart");
  };
  console.log(showAlert);
  return (
    <div>
      <Row className="justify-content-md-center" style={{ paddingTop: 20 }}>
        <Col md={6}>
          <h5
            style={{
              textAlign: "center",
              paddingTop: 40,
              paddingBottom: 30,
            }}
          >
            Order Summary <i className="fa fa-list-alt" aria-hidden="true"></i>
          </h5>
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col>
                  Shipping Address{" "}
                  <i
                    className="fa fa-map-marker"
                    style={{ color: "Tomato" }}
                  ></i>
                </Col>
                <Col>
                  {usercart.shippingAddress.houseNumber},
                  {usercart.shippingAddress.locality},
                  {usercart.shippingAddress.pincode},
                  {usercart.shippingAddress.country}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Books Price</Col>
                <Col>₹{totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Delivery charges</Col>
                <Col>₹100</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>₹{totalPrice + 100}</Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col xs={12} md={6} lg={4} className="shadow rounded">
          <h5
            style={{
              textAlign: "center",
              paddingTop: 40,
              paddingBottom: 30,
            }}
          >
            Payment
          </h5>
          <Form onSubmit={formsubmitHandler}>
            <Form.Group controlId="CardNumber">
              <Form.Control
                type="text"
                placeholder="card number"
                value={cardNumber}
                required
                onChange={(e) => setCardNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br></br>
            <Form.Group controlId="CVV">
              <Form.Control
                type="password"
                placeholder="CVV"
                value={CVV}
                required
                onChange={(e) => setCVV(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br></br>
            <Row>
              <Col>
                <Form.Group controlId="expirationMonth">
                  <Form.Control
                    type="number"
                    placeholder="MM"
                    value={expirationMonth}
                    required
                    onChange={(e) => setExpirationMonth(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="expirationYear">
                  <Form.Control
                    type="number"
                    placeholder="YY"
                    value={expirationYear}
                    required
                    onChange={(e) => setExpirationYear(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <br></br>
            <br></br>
            <br></br>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {success && (
              <Message variant="success">
                Order placed Successfully at {order.createdTs}
              </Message>
            )}
            {success && showAlert && formSubmitted && (
              <SweetAlert
                success
                title="Thanks for shopping...Order Placed Successfully!"
                onConfirm={() => {
                  updateShowAlert();
                  clearFields();
                  redirectToCart();
                }}
                btnSize="sm"
              >
                Your order id {order.id}
              </SweetAlert>
            )}
            {error && showAlert && formSubmitted && (
              <SweetAlert
                error
                title="Failed to place order!"
                onConfirm={() => {
                  updateShowAlert();
                  clearFields();
                  redirectToCart();
                }}
                btnSize="sm"
              >
                Please try again
              </SweetAlert>
            )}
            <Button
              type="submit"
              variant="dark"
              className="shadow rounded w-50"
            >
              Place Order
            </Button>
            <br></br>
            <br></br>
            <br></br>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Placeorder;
