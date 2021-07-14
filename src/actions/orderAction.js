import {
  ORDER_CREATE_FAILED,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  BASE_URL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_REQUEST_SUCCESS,
  ORDER_DETAILS_REQUEST_FAILED,
  USER_ORDERS_REQUEST,
  USER_ORDERS_REQUEST_FAILED,
  USER_ORDERS_REQUEST_SUCCESS,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_REQUEST_FAILED,
  UPDATE_ORDER_REQUEST_SUCCESS,
} from "../Appconstants.js/bookconstants";

const axios = require("axios");
export const orderAction = (order) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const { data } = await axios.post(`${BASE_URL}/users/placeorder`, order);
    const { error, statusCode, responseData } = data;
    console.log(error, statusCode, responseData);
    if (error) {
      dispatch({
        type: ORDER_CREATE_FAILED,
        payload: error,
      });
    } else {
      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: responseData,
      });
      localStorage.removeItem("booksInCart");
      localStorage.removeItem("paymentMethod");
      localStorage.removeItem("shippingAddress");
    }
  } catch (error) {
    console.log(`Error occurred ${error}`);
    let payloadToSend =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_CREATE_FAILED,
      payload: payloadToSend,
    });
  }
};

export const orderDetails = (orderId) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`${BASE_URL}/users/order/${orderId}`);
    const { error, statusCode, responseData } = data;
    console.log(error, statusCode, responseData);
    if (error) {
      dispatch({
        type: ORDER_DETAILS_REQUEST_FAILED,
        payload: error,
      });
    } else {
      dispatch({
        type: ORDER_DETAILS_REQUEST_SUCCESS,
        payload: responseData,
      });
    }
  } catch (error) {
    console.log(`Error occurred ${error}`);
    let payloadToSend =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_DETAILS_REQUEST_FAILED,
      payload: payloadToSend,
    });
  }
};

export const userOrdersAction = (username) => async (dispatch) => {
  try {
    dispatch({
      type: USER_ORDERS_REQUEST,
    });

    const { data } = await axios.get(`${BASE_URL}/users/orders/${username}`);
    const { error, statusCode, responseData } = data;
    console.log(error, statusCode, responseData);
    if (error) {
      dispatch({
        type: USER_ORDERS_REQUEST_FAILED,
        payload: error,
      });
    } else {
      dispatch({
        type: USER_ORDERS_REQUEST_SUCCESS,
        payload: responseData,
      });
    }
  } catch (error) {
    console.log(`Error occurred ${error}`);
    let payloadToSend =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_DETAILS_REQUEST_FAILED,
      payload: payloadToSend,
    });
  }
};

export const updateOrder = (userName, orderId, status) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_ORDER_REQUEST,
    });
    const requestBody = {
      username: userName,
      id: orderId,
      orderstatus: status,
    };
    const { data } = await axios.put(`${BASE_URL}/users/orders`, requestBody);

    const { error, statusCode, responseData } = data;
    console.log(error, statusCode, responseData);
    if (error) {
      dispatch({
        type: UPDATE_ORDER_REQUEST_FAILED,
        payload: error,
      });
    } else {
      dispatch({
        type: UPDATE_ORDER_REQUEST_SUCCESS,
        payload: responseData,
      });
    }
  } catch (error) {
    console.log(`Error occurred ${error}`);
    let payloadToSend =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: UPDATE_ORDER_REQUEST_FAILED,
      payload: payloadToSend,
    });
  }
};
