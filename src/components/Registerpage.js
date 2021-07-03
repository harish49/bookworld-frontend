import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Message from "./Message";
import DataLoader from "./DataLoader";
import { register } from "../actions/userAction";
const Registerpage = (props) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  let redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  let formsubmitHandler = (e) => {
    e.preventDefault();
    // let fieldEmpty =
    //   username === "" || password === "" || confirmPassword === "";
    // if (fieldEmpty === true) {
    //   setMessage("Please fill all the fields");
    // } else if (password !== confirmPassword) {
    //   setMessage("Entered passwords do not match");
    // } else {
    dispatch(register(username, email, password, mobileNumber));
  };
  const dispatch = useDispatch();
  const userLoginReducer = useSelector((state) => state.userRegister);
  let { loading, error, userInformation } = userLoginReducer;
  useEffect(() => {
    if (userInformation) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInformation]);
  return (
    <>
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
                Sign Up
              </h5>
              {message && <Message variant="danger">{message}</Message>}
              {error && <Message variant="danger">{error}</Message>}
              <Form onSubmit={formsubmitHandler}>
                <Form.Group controlId="username">
                  <Form.Control
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <br></br>
                <Form.Group controlId="password">
                  <Form.Control
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <br></br>
                <Form.Group controlId="confirmPassword">
                  <Form.Control
                    type="password"
                    placeholder="confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <br></br>
                <Form.Group controlId="email">
                  <Form.Control
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <br></br>
                <Form.Group controlId="mobileNumber">
                  <Form.Control
                    type="text"
                    placeholder="mobile number(Optional)"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
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
                  Sign Up
                </Button>
              </Form>
              <Row className="py-3">
                <Col>
                  &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;Existing Customer?{" "}
                  <Link to={redirect ? `login?redirect=${redirect}` : `/login`}>
                    Sign in
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};
export default Registerpage;
