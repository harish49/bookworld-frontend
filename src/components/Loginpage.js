import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Message from "./Message";
import DataLoader from "./DataLoader";
import { login } from "../actions/userAction";
const Loginpage = (props) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  let redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  let formsubmitHandler = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setMessage("Please fill all the fields");
    } else {
      dispatch(login(username, password));
      setUserName("");
      setPassword("");
      setMessage("");
    }
  };
  const dispatch = useDispatch();
  const userLoginReducer = useSelector((state) => state.userLogin);
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
                Sign In
              </h5>
              {error != null ? (
                <Message variant="danger">{error}</Message>
              ) : message ? (
                <Message variant="danger">{message}</Message>
              ) : (
                ""
              )}
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
                <br></br>
                <br></br>
                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                  type="submit"
                  variant="dark"
                  className="shadow rounded w-50"
                >
                  Sign in
                </Button>
              </Form>
              <Row className="py-3">
                <Col>
                  &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;New Customer?{" "}
                  <Link
                    to={
                      redirect ? `register?redirect=${redirect}` : `/register`
                    }
                  >
                    Sign Up
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
export default Loginpage;
