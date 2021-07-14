import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import DataLoader from "./DataLoader";
import Message from "./Message";
import { getAllUsers } from "../actions/userAction";
import { removeUser } from "../actions/userAction";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
const Userslist = (props) => {
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userLogin);
  const usersList = useSelector((state) => state.getAllUsers);
  const removeUserfromDB = useSelector((state) => state.removeUser);
  const { userInformation } = userReducer;
  const { listofUsers, loading, error } = usersList;
  const { userDeleted, removeUserError } = removeUserfromDB;
  let [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    console.log("Fetching userslist...");
    if (userInformation) dispatch(getAllUsers());
    else {
      props.history.push("/login");
    }
  }, [dispatch, removeUserfromDB]);

  const deleteUser = (username) => {
    console.log("Deleting user " + username);
    dispatch(removeUser(username));
    setShowAlert(true);
  };
  const updateShowAlert = () => {
    setShowAlert(false);
  };
  const editUser = (username) => {
    props.history.push(`/edituser/${username}`);
    console.log(username);
  };
  const pushtoLogin = () => {
    props.history.push("/login");
  };
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Users</h3>
      {loading ? (
        <DataLoader />
      ) : !userInformation ? (
        pushtoLogin()
      ) : userInformation.userName !== "admin" ? (
        <Message variant="danger">
          You are not authorized to view this page!!
        </Message>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered responsive hover className="table-sm">
          <thead>
            <tr>
              <th>USERNAME</th>
              <th>EMAIL</th>
              <th>CONTACT</th>
              <th>NAME</th>
              <th>Remove/Edit</th>
            </tr>
          </thead>
          <tbody>
            {listofUsers.map((user) => (
              <tr key={user.userName}>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.mobileNumber}</td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => deleteUser(user.userName)}
                    className="shadow rounded"
                  >
                    <i className="fas fa-trash "></i>
                  </Button>{" "}
                  &nbsp; &nbsp;
                  <Button
                    type="button"
                    variant="warning"
                    onClick={() => editUser(user.userName)}
                    className="shadow rounded"
                  >
                    <i className="fas fa-edit"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {showAlert && userDeleted && (
        <SweetAlert
          success
          title="User successfully deleted!"
          onConfirm={() => {
            updateShowAlert();
          }}
          btnSize="sm"
        ></SweetAlert>
      )}
      {showAlert && removeUserError && (
        <SweetAlert
          danger
          title="Failed to delete user!!"
          onConfirm={() => {
            updateShowAlert();
          }}
          btnSize="sm"
        ></SweetAlert>
      )}
    </div>
  );
};

export default Userslist;
