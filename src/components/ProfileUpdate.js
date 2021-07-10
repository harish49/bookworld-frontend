import React from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Message from "./Message";
import DataLoader from "./DataLoader";
import { profile } from "../actions/userAction";
const ProfileUpdate = (props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const loginReducer = useSelector((state) => state.userLogin);

  let { loading, error, userInformation } = loginReducer;
  let formsubmitHandler = (e) => {
    e.preventDefault();
    let emptyFields =
      password === "" &&
      confirmPassword === "" &&
      mobileNumber === "" &&
      email === "" &&
      firstName === "" &&
      lastName === "";
    if (emptyFields === true) {
      setMessage("Please fill any field");
    } else if (password !== confirmPassword) {
      setMessage("Entered passwords do not match");
    } else {
      setMessage("");
      dispatch(
        profile(
          userInformation.userName,
          email,
          password,
          firstName,
          lastName,
          mobileNumber
        )
      );
    }
  };
  const profileUpdateReducer = useSelector((state) => state.updateProfile);
  const { profileUpdated } = profileUpdateReducer;
  useEffect(() => {
    if (!userInformation) {
      props.history.push("/login");
    }
  }, [props.history, userInformation, dispatch]);
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
                Update Profile
              </h5>
              {error ? (
                <Message variant="danger">{error}</Message>
              ) : message ? (
                <Message variant="danger">{message}</Message>
              ) : profileUpdated ? (
                <Message variant="success">
                  Profile Updated Successfully
                </Message>
              ) : (
                ""
              )}
              <Form onSubmit={formsubmitHandler}>
                <Row>
                  <Col>
                    <Form.Group controlId="firstName">
                      <Form.Control
                        type="text"
                        placeholder="first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  &nbsp; &nbsp; &nbsp;
                  <Col>
                    <Form.Group controlId="lastName">
                      <Form.Control
                        type="text"
                        placeholder="last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
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
                  update
                </Button>
                <br></br>
                <br></br>
                <br></br>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};
export default ProfileUpdate;
