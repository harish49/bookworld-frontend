import React from "react";
import "react-rater/lib/react-rater.css";
import {
  Row,
  ListGroup,
  Card,
  Button,
  Col,
  Form,
  Container,
} from "react-bootstrap";
import DescriptionModal from "./DescriptionModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import DataLoader from "./DataLoader";
import Message from "./Message";
import bookDetailsAction from "../actions/bookDetailsAction";
import { bookReview } from "../actions/bookAction";
import { getAllReviews } from "../actions/bookAction";
const BookDetails = (props) => {
  const dispatch = useDispatch();
  const bookInfoReducer = useSelector((state) => state.bookDetails);
  const userLogin = useSelector((state) => state.userLogin);
  const createReviewReducer = useSelector((state) => state.writeReview);
  const allReviewsReducer = useSelector((state) => state.allReviews);
  const { createReview, createReviewError } = createReviewReducer;
  const { bookReviews, reviewsError } = allReviewsReducer;
  const [showInputBox, setShowInputBox] = useState(false);
  const { userInformation } = userLogin;
  const { loading, error, book } = bookInfoReducer;
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [ratings, setRatings] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  let [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    console.log("Dispatching... bookdetails");
    dispatch(bookDetailsAction(props.match.params.id));
    dispatch(getAllReviews(props.match.params.id));
  }, [dispatch, props.match.params.id, createReview]);

  const setShowInput = () => {
    setShowInputBox(true);
  };
  const updateShowAlert = () => {
    setShowAlert(false);
    setFormSubmitted(false);
    setComment("");
    setRatings("");
    console.log("Clicked");
  };
  console.log(props.match.params.id);
  let rating = 0;
  if (book) rating = book.rating / book.reviews;
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
  const formsubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      bookReview({
        username: userInformation.userName,
        bookId: props.match.params.id,
        rating: ratings,
        comment: comment,
      })
    );
    setShowAlert(true);
    setFormSubmitted(true);
  };
  const editAvailableCount = (bookId) => {
    props.history.push(`/editbook/${bookId}`);
  };
  return (
    <div className="container" style={{ paddingTop: 20 }}>
      {loading ? (
        <DataLoader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : book ? (
        <Container>
          <Row style={{ paddingTop: 10 }}>
            <Col md={4}>
              <Row>
                <Col style={{ paddingLeft: 45 }}>
                  <img
                    src={book.thumbnail}
                    alt={book.title}
                    className="shadow rounded"
                    style={{ textAlign: "center", height: 350, width: 280 }}
                  />
                </Col>
              </Row>

              <Row>
                <br></br>
                <br></br>
                <Button
                  variant="link"
                  disabled={!userInformation}
                  onClick={() => setShowInput()}
                >
                  Write a review
                </Button>
              </Row>
            </Col>
            <Col md={4}>
              <ListGroup style={{ textAlign: "center" }}>
                <ListGroup.Item>
                  <h4>{book.title}</h4>
                </ListGroup.Item>
                <ListGroup.Item>Author : {book.author}</ListGroup.Item>
                <ListGroup.Item>Category : {book.categories}</ListGroup.Item>
                <ListGroup.Item>PageCount : {book.pageCount}</ListGroup.Item>
                {userInformation && userInformation.userName === "admin" ? (
                  <ListGroup.Item>
                    In stock : {book.availableCount}{" "}
                    <Button
                      type="button"
                      variant="warning"
                      onClick={() =>
                        editAvailableCount(book.bookId, ratings, comment)
                      }
                      className="shadow rounded btn-sm"
                    >
                      <i className="fas fa-edit"></i>
                    </Button>
                  </ListGroup.Item>
                ) : (
                  ""
                )}

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
                              ...Array(
                                Math.min(15, book.availableCount)
                              ).keys(),
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
                      <i className="fas fa-shopping-cart"></i> &nbsp; &nbsp;Add
                      to Cart
                    </Button>{" "}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <br></br> <br></br>
          <br></br>
          <Row>
            <Col md={6}>
              {showInputBox && (
                <Form onSubmit={formsubmitHandler} style={{ paddingTop: 20 }}>
                  <Form.Group controlId="comment">
                    <Form.Control
                      as="textarea"
                      placeholder="Comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <br></br>
                  <Form.Group controlId="rating">
                    <Form.Control
                      as="select"
                      value={ratings}
                      onChange={(e) => setRatings(e.target.value)}
                    >
                      <option value="">Select Rating</option>
                      <option value="1">1-Boring</option>
                      <option value="2">2-Not worth the Money</option>
                      <option value="3">3-Good read</option>
                      <option value="4">4-Best buy</option>
                      <option value="5">5-Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <br></br>
                  <Button
                    type="submit"
                    variant="info"
                    className="shadow rounded"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    Leave your review
                    {/* <i className="fab fa-telegram-plane"></i> */}
                  </Button>
                </Form>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <br></br>
              <br></br>
              <h3>Reviews</h3>
              {(bookReviews && bookReviews.length === 0) || !bookReviews ? (
                <Message variant="info">No reviews</Message>
              ) : reviewsError ? (
                <Message variant="danger">{reviewsError}</Message>
              ) : (
                <ListGroup variant="flush">
                  {bookReviews.map((review) => (
                    <ListGroup.Item key={review.reviewid}>
                      {review.userName}
                      &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {review.createdTs.substr(0, 19)}
                      <br></br>
                      {review.rating}{" "}
                      <i
                        className="fa fa-star
       checked"
                        style={{ color: "#fc9403" }}
                      ></i>
                      <br></br>
                      {review.comment}
                      {"   "}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Col>
          </Row>
        </Container>
      ) : (
        ""
      )}
      {createReview && formSubmitted && showAlert && (
        <SweetAlert
          success
          title="Thanks for your review!"
          onConfirm={() => {
            updateShowAlert();
          }}
          btnSize="sm"
        ></SweetAlert>
      )}
    </div>
  );
};

export default BookDetails;
