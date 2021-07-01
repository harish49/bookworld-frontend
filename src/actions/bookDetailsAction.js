import {
  BOOKS_DETAILS_REQUEST,
  BOOKS_DETAILS_REQUEST_SUCCESS,
  BOOKS_DETAILS_REQUEST_FAILED,
  BASE_URL,
} from "../Appconstants.js/bookconstants";

const axios = require("axios");
const bookDetailsAction = (bookid) => async (dispatch) => {
  try {
    console.log(`${BASE_URL}/books/defaultbooks/${bookid}`);

    dispatch({ type: BOOKS_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${BASE_URL}/books/defaultbooks/${bookid}`
    );
    const responseData = data.responseData;

    dispatch({ type: BOOKS_DETAILS_REQUEST_SUCCESS, payload: responseData });
    console.log(data);
  } catch (error) {
    let payloadToSend =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BOOKS_DETAILS_REQUEST_FAILED,
      payload: payloadToSend,
    });
  }
};

export default bookDetailsAction;
