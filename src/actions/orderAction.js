import {
  ORDER_CREATE_FAILED,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  BASE_URL,
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
