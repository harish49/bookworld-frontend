import {
  BOOKS_DETAILS_REQUEST,
  BOOKS_DETAILS_REQUEST_SUCCESS,
  BOOKS_DETAILS_REQUEST_FAILED,
  BASE_URL,
  USER_LOGOUT,
} from "../Appconstants.js/bookconstants";

const axios = require("axios");
const bookDetailsAction = (bookid) => async (dispatch) => {
  try {
    dispatch({ type: BOOKS_DETAILS_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/books/getbook/${bookid}`);
    const { error, responseData, statusCode } = data;
    console.log(error, statusCode, responseData);
    if (error) {
      dispatch({
        type: BOOKS_DETAILS_REQUEST_FAILED,
        payload: error,
      });
    } else {
      dispatch({ type: BOOKS_DETAILS_REQUEST_SUCCESS, payload: responseData });
    }
  } catch (error) {
    if (error.response && error.response.status === 403) {
      localStorage.clear();
      dispatch({
        type: USER_LOGOUT,
      });
    } else {
      let payloadToSend =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: BOOKS_DETAILS_REQUEST_FAILED,
        payload: payloadToSend,
      });
    }
  }
};

export default bookDetailsAction;
