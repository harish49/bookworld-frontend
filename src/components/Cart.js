import React, { useEffect } from "react";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { cartRemoveItem } from "../actions/cartAction";
import { cartAddItem } from "../actions/cartAction";
import { Row, ListGroup, Button, Col, Image } from "react-bootstrap";
const Cart = (props) => {
  let bookId = props.match.params.id;
  let quantity = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const dispatch = useDispatch();
  const cartReducer = useSelector((state) => state.userCart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInformation } = userLogin;
  const { booksInCart } = cartReducer;
  useEffect(() => {
    if (bookId && userInformation) {
      dispatch(cartAddItem(bookId, quantity));
    }
  }, [dispatch, bookId, quantity]);

  const removeFromCart = (bookId) => {
    dispatch(cartRemoveItem(bookId));
  };
  let totalCost = 0;

  const calculateCost = (price) => {
    totalCost = totalCost + price;
  };

  const checkOut = () => {
    if (userInformation) {
      props.history.push("/checkout");
    } else {
      props.history.push("/login");
    }
  };
  return (
    <div className="container" style={{ margin: "auto", display: "block" }}>
      <Row style={{ textAlign: "center" }}>
        <h4 style={{ textAlign: "center" }}>Your Cart 🛒</h4>
        <br></br>
        <Col md={8}>
          {booksInCart.length === 0 ? (
            <Message variant="info" style={{ justifyContent: "center" }}>
              Your cart is empty!
            </Message>
          ) : (
            <ListGroup>
              {booksInCart.map((book) => (
                <ListGroup.Item key={book.bookId}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={book.bookImageLink}
                        alt={book.bookTitle}
                        fluid
                        rounded
                      ></Image>
                    </Col>
                    <Col md={2}>
                      {" "}
                      <strong>{book.bookTitle}</strong>
                    </Col>
                    &nbsp; &nbsp;
                    <Col md={2}> x{book.quantity}</Col>
                    <Col md={2}> ₹{book.bookPrice * book.quantity}</Col>
                    <Col md={2}>
                      {" "}
                      <Button
                        type="button"
                        variant="danger"
                        onClick={() => removeFromCart(book.bookId)}
                        className="shadow rounded"
                      >
                        <i className="fas fa-trash "></i>
                      </Button>
                    </Col>
                  </Row>
                  {calculateCost(book.bookPrice * book.quantity)}
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                <Row>
                  <Col> Total Price : ₹{totalCost}</Col>
                  <Col>
                    {" "}
                    <Button
                      type="button"
                      variant="dark"
                      className="shadow rounded"
                      onClick={() => checkOut()}
                    >
                      Checkout
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
