import React from "react";
import "react-rater/lib/react-rater.css";
import { Row, ListGroup, Card, Button, Col, Form } from "react-bootstrap";
import DescriptionModal from "./DescriptionModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataLoader from "./DataLoader";
import Message from "./Message";
import bookDetailsAction from "../actions/bookDetailsAction";
const BookDetails = (props) => {
  const dispatch = useDispatch();
  const bookInfoReducer = useSelector((state) => state.bookDetails);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInformation } = userLogin;
  const { loading, error, book } = bookInfoReducer;
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    console.log("Dispatching... bookdetails");
    dispatch(bookDetailsAction(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  console.log(props.match.params.id);
  let rating = book.rating;
  const addToCart = () => {
    if (!userInformation) {
      props.history.push("/login");
    } else {
      if (quantity > 0)
        props.history.push(
          `/cart/${props.match.params.id}?quantity=${quantity}`
        );
    }
  };
  return (
    <div className="container" style={{ paddingTop: 20 }}>
      {loading ? (
        <DataLoader />
      ) : error ? (
        <Message variant="danger">${error}</Message>
      ) : (
        <Row style={{ paddingTop: 10 }}>
          <Col md={4}>
            <img
              src={book.thumbnail}
              alt={book.title}
              className="shadow rounded"
              style={{ textAlign: "center", height: 350, width: 280 }}
            />
          </Col>
          <Col md={4}>
            <ListGroup style={{ textAlign: "center" }}>
              <ListGroup.Item>
                <h4>{book.title}</h4>
              </ListGroup.Item>
              <ListGroup.Item>Author : {book.author}</ListGroup.Item>
              <ListGroup.Item>Category : {book.categories}</ListGroup.Item>
              <ListGroup.Item>PageCount : {book.pageCount}</ListGroup.Item>
              <ListGroup.Item style={{ textAlign: "center" }}>
                <DescriptionModal matter={book.description} />
              </ListGroup.Item>
              <ListGroup.Item>
                {rating >= 1 ? (
                  <i
                    className="fa fa-star checked"
                    style={{ color: "#fc9403" }}
                  ></i>
                ) : (
                  <i className="fa fa-star"></i>
                )}
                {rating >= 2 ? (
                  <i
                    className="fa fa-star
       checked"
                    style={{ color: "#fc9403" }}
                  ></i>
                ) : (
                  <i
                    className="fa fa-star
      "
                  ></i>
                )}
                {rating >= 3 ? (
                  <i
                    className="fa fa-star
       checked"
                    style={{ color: "#fc9403" }}
                  ></i>
                ) : (
                  <i
                    className="fa fa-star
      "
                  ></i>
                )}
                {rating >= 4 ? (
                  <i
                    className="fa fa-star
       checked"
                    style={{ color: "#fc9403" }}
                  ></i>
                ) : (
                  <i
                    className="fa fa-star
      "
                  ></i>
                )}
                {rating >= 5 ? (
                  <i
                    className="fa fa-star
       checked"
                    style={{ color: "#fc9403" }}
                  ></i>
                ) : (
                  <i
                    className="fa fa-star
      "
                  ></i>
                )}
                {book.reviews} reviews
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price</Col>{" "}
                    <Col>
                      <b>₹{book.price}</b>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status</Col>{" "}
                    <Col>
                      <b>
                        {book.availableCount > 0 ? "In Stock" : "Unavailable"}
                      </b>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {book.availableCount > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        >
                          {[
                            ...Array(Math.min(15, book.availableCount)).keys(),
                          ].map((cnt) => (
                            <option key={cnt + 1} value={cnt + 1}>
                              {cnt + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item style={{ textAlign: "center" }}>
                  <Button
                    variant="primary"
                    type="button"
                    disabled={book.count === 0}
                    className="shadow rounded"
                    onClick={addToCart}
                  >
                    <i className="fas fa-shopping-cart"></i> &nbsp; &nbsp;Add to
                    Cart
                  </Button>{" "}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default BookDetails;
