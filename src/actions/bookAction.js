import {
  BOOKS_REQUEST,
  BOOKS_REQUEST_SUCCESS,
  BOOKS_REQUEST_FAILED,
  BASE_URL,
} from "../Appconstants.js/bookconstants";

const axios = require("axios");
const bookAction = () => async (dispatch) => {
  try {
    dispatch({ type: BOOKS_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/books/defaultbooks`);
    const responseData = data.responseData;
    dispatch({ type: BOOKS_REQUEST_SUCCESS, payload: responseData });
  } catch (error) {
    let payloadToSend =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BOOKS_REQUEST_FAILED,
      payload: payloadToSend,
    });
  }
};

export default bookAction;
