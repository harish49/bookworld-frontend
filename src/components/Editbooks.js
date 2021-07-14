import React from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import Message from "./Message";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataLoader from "./DataLoader";
import SweetAlert from "react-bootstrap-sweetalert";
import { updateBookAvailableCount } from "../actions/bookAction";
const Editbooks = (props) => {
  let bookToBeEdited = props.match.params.id;
  const [count, setCount] = useState(null);
  const [message, setMessage] = useState("");
  const updateBookReducer = useSelector((state) => state.updateBook);
  let { loading, updateBookError, updateBook } = updateBookReducer;
  let [showAlert, setShowAlert] = useState(false);

  let dispatch = useDispatch();
  let formsubmitHandler = (e) => {
    e.preventDefault();
    if (count === "" || count == null) {
      setMessage("Please fill all the fields");
    } else {
      dispatch(updateBookAvailableCount(bookToBeEdited, count));
      setCount(null);
      setShowAlert(true);
      setMessage("");
    }
  };
  const updateShowAlert = () => {
    setShowAlert(false);
  };
  return (
    <div>
      {loading ? (
        <DataLoader />
      ) : (
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
                Update Book
              </h5>
              {updateBookError != null ? (
                <Message variant="danger">{updateBookError}</Message>
              ) : message ? (
                <Message variant="danger">{message}</Message>
              ) : (
                ""
              )}
              <Form onSubmit={formsubmitHandler}>
                <Form.Group controlId="count">
                  <Form.Control
                    type="number"
                    placeholder="count"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <br></br>
                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                  type="submit"
                  variant="dark"
                  className="shadow rounded w-50"
                >
                  Update Book
                </Button>
                <br></br>
                <br></br>
              </Form>
            </Col>
          </Row>
          {updateBook && showAlert && (
            <SweetAlert
              success
              title="Updated book available count successfully"
              onConfirm={() => {
                updateShowAlert();
              }}
              btnSize="sm"
            >
              Book id {bookToBeEdited}
            </SweetAlert>
          )}
          {updateBookError && showAlert && (
            <SweetAlert
              error
              title="Failed to update book!"
              onConfirm={() => {
                updateShowAlert();
              }}
              btnSize="sm"
            >
              Please try again
            </SweetAlert>
          )}
        </Container>
      )}
    </div>
  );
};

export default Editbooks;
