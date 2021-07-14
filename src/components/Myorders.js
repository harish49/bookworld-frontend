import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import DataLoader from "./DataLoader";
import Message from "./Message";
import { userOrdersAction } from "../actions/orderAction";
import { Table } from "react-bootstrap";
const Myorders = (props) => {
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userLogin);
  const userOrderReducer = useSelector((state) => state.userordersList);
  const { userInformation } = userReducer;
  const { userOrders, loading, error } = userOrderReducer;
  useEffect(() => {
    console.log("Fetching userorders...");
    if (userInformation) dispatch(userOrdersAction(userInformation.userName));
    else {
      props.history.push("/login");
    }
  }, [dispatch, userInformation]);

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>My Orders</h3>
      {loading ? (
        <DataLoader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : userOrders.length === 0 ? (
        <Message variant="info">Your orders list is empty </Message>
      ) : (
        <Table striped bordered responsive hover className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAYMENT STATUS</th>
              <th>PAYMENT MODE</th>
              <th>DELIVERED</th>
            </tr>
          </thead>
          <tbody>
            {userOrders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.createdTs.substring(0, 19)}</td>
                <td>{order.payment.price}</td>
                <td>{order.payment.paymentStatus}</td>
                <td>{order.payment.paymentMode}</td>
                <td>
                  {order.status === "DELIVERED" ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i
                      className="fa fa-times"
                      aria-hidden="true"
                      style={{ color: "red" }}
                    ></i>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Myorders;
