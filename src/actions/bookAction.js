import {
  BOOKS_REQUEST,
  BOOKS_REQUEST_SUCCESS,
  BOOKS_REQUEST_FAILED,
  BASE_URL,
  UPDATE_BOOK_COUNT_REQUEST,
  UPDATE_BOOK_COUNT_REQUEST_SUCCESS,
  UPDATE_BOOK_COUNT_REQUEST_FAILED,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_REQUEST_SUCCESS,
  CREATE_REVIEW_REQUEST_FAILED,
  GET_ALL_REVIEWS_REQUEST,
  GET_ALL_REVIEWS_REQUEST_FAILED,
  GET_ALL_REVIEWS_REQUEST_SUCCESS,
  GET_BOOKS_FROM_GOOGLE_REQUEST,
  GET_BOOKS_FROM_GOOGLE_REQUEST_FAILED,
  GET_BOOKS_FROM_GOOGLE_REQUEST_SUCCESS,
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

export const googleBookAction = (searchItem) => async (dispatch) => {
  try {
    dispatch({
      type: GET_BOOKS_FROM_GOOGLE_REQUEST,
    });
    const { data } = await axios.get(
      `${BASE_URL}/books/googlebooks/${searchItem}`
    );
    const { error, responseData, statusCode } = data;
    console.log(error, responseData, statusCode);
    if (error) {
      dispatch({
        type: GET_BOOKS_FROM_GOOGLE_REQUEST_FAILED,
        payload: error,
      });
    } else {
      dispatch({
        type: GET_BOOKS_FROM_GOOGLE_REQUEST_SUCCESS,
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
      type: GET_BOOKS_FROM_GOOGLE_REQUEST_FAILED,
      payload: payloadToSend,
    });
  }
};

export default bookAction;
export const updateBookAvailableCount = (bookId, count) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_BOOK_COUNT_REQUEST,
    });
    const requestBody = {
      bookId: bookId,
      count: count,
    };
    const { data } = await axios.put(
      `${BASE_URL}/books/updatebook`,
      requestBody
    );
    const { error, responseData, statusCode } = data;
    console.log(error, responseData, statusCode);
    if (error) {
      dispatch({
        type: UPDATE_BOOK_COUNT_REQUEST_FAILED,
        payload: error,
      });
    } else {
      dispatch({
        type: UPDATE_BOOK_COUNT_REQUEST_SUCCESS,
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
      type: UPDATE_BOOK_COUNT_REQUEST_FAILED,
      payload: payloadToSend,
    });
  }
};

export const bookReview = (review) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_REVIEW_REQUEST,
    });
    const { data } = await axios.post(`${BASE_URL}/books/review`, review);
    const { error, responseData, statusCode } = data;
    console.log(error, responseData, statusCode);
    if (error) {
      dispatch({
        type: CREATE_REVIEW_REQUEST_FAILED,
        payload: error,
      });
    } else {
      dispatch({
        type: CREATE_REVIEW_REQUEST_SUCCESS,
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
      type: CREATE_REVIEW_REQUEST_FAILED,
      payload: payloadToSend,
    });
  }
};

export const getAllReviews = (bookId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_REVIEWS_REQUEST,
    });
    const { data } = await axios.get(`${BASE_URL}/books/reviews/${bookId}`);
    const { error, responseData, statusCode } = data;
    console.log(error, responseData, statusCode);
    if (error) {
      dispatch({
        type: GET_ALL_REVIEWS_REQUEST_FAILED,
        payload: error,
      });
    } else {
      dispatch({
        type: GET_ALL_REVIEWS_REQUEST_SUCCESS,
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
      type: GET_ALL_REVIEWS_REQUEST_FAILED,
      payload: payloadToSend,
    });
  }
};
