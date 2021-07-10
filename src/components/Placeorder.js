import React from "react";
import { useEffect } from "react";
import { CART, PROCESSING } from "../Appconstants.js/bookconstants";
import { Button, Row, Col, ListGroup, Card } from "react-bootstrap";
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

  let totalPrice = 0;

  booksInCart.forEach((book) => {
    totalPrice += book.quantity * book.bookPrice;
  });
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order.id}`);
    }
    // eslint-disable-next-line
  }, [props.history, success]);
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
  const dispatch = useDispatch();
  const dispatchOrderAction = () => {
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
  };
  return (
    <div>
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item>
              <h4>Shipping Address</h4>
              {
                <p>
                  {usercart.shippingAddress.houseNumber},
                  {usercart.shippingAddress.locality},
                  {usercart.shippingAddress.pincode},
                  {usercart.shippingAddress.country}
                </p>
              }
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Payment Method</h4>
              <h3>{usercart.paymentMethod}</h3>
            </ListGroup.Item>
          </ListGroup>

          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h2>Order Summary</h2>
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
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price</Col>
                  <Col>₹{totalPrice + 100}</Col>
                </Row>
                <Button
                  type="button"
                  variant="dark"
                  className="shadow rounded"
                  disabled={usercart.length === 0}
                  onClick={() => dispatchOrderAction()}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Placeorder;
