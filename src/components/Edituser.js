import React from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import Message from "./Message";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "../actions/orderAction";
import DataLoader from "./DataLoader";
import SweetAlert from "react-bootstrap-sweetalert";
const Edituser = (props) => {
  let userToBeEdited = props.match.params.id;
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [message, setMessage] = useState("");
  const orderUpdateReducer = useSelector((state) => state.updateOrder);
  let { loading, orderUpdateError, orderUpdated } = orderUpdateReducer;
  let [showAlert, setShowAlert] = useState(false);

  let dispatch = useDispatch();
  let formsubmitHandler = (e) => {
    e.preventDefault();
    if (orderId === "" || orderStatus === "") {
      setMessage("Please fill all the fields");
    } else {
      dispatch(updateOrder(userToBeEdited, orderId, orderStatus));
      setOrderStatus("");
      setOrderId("");
      setMessage("");
      setShowAlert(true);
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
                Update Order
              </h5>
              {orderUpdateError != null ? (
                <Message variant="danger">{orderUpdateError}</Message>
              ) : message ? (
                <Message variant="danger">{message}</Message>
              ) : (
                ""
              )}
              <Form onSubmit={formsubmitHandler}>
                <Form.Group controlId="orderId">
                  <Form.Control
                    type="text"
                    placeholder="Order Id"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <br></br>
                <Form.Group controlId="orderstatus">
                  <Form.Control
                    type="text"
                    placeholder="order status"
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value)}
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
                  Update Order
                </Button>
                <br></br>
                <br></br>
              </Form>
            </Col>
          </Row>
          {orderUpdated && showAlert && (
            <SweetAlert
              success
              title="Updated order status successfully"
              onConfirm={() => {
                updateShowAlert();
              }}
              btnSize="sm"
            >
              {orderUpdated}
            </SweetAlert>
          )}
          {orderUpdateError && showAlert && (
            <SweetAlert
              error
              title="Failed to update order!"
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

export default Edituser;
