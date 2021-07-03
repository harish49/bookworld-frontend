import {
  BASE_URL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_REQUEST_FAILED,
  USER_LOGIN_REQUEST_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_REQUEST_SUCCESS,
  USER_REGISTER_REQUEST_FAILED,
} from "../Appconstants.js/bookconstants";

const axios = require("axios");

export const login = (login, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const { data } = await axios.post(`${BASE_URL}/users/login`, {
      username: login,
      password: password,
    });
    const { error, statusCode, responseData } = data;
    console.log(error, statusCode, responseData);
    if (error) {
      dispatch({
        type: USER_LOGIN_REQUEST_FAILED,
        payload: error,
      });
    } else {
      dispatch({
        type: USER_LOGIN_REQUEST_SUCCESS,
        payload: responseData,
      });
      localStorage.setItem("userInformation", JSON.stringify(responseData));
    }
  } catch (error) {
    console.log(`Error occurred ${error}`);
    let payloadToSend =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USER_LOGIN_REQUEST_FAILED,
      payload: payloadToSend,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInformation");
  dispatch({
    type: USER_LOGOUT,
  });
};

export const register =
  (username, email, password, mobilenumber) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const registerUser = {
        userName: username,
        password: password,
        email: email,
        mobileNumber: mobilenumber,
      };
      const { data } = await axios.post(
        `${BASE_URL}/users/register`,
        registerUser
      );
      const { error, statusCode, responseData } = data;
      console.log(error, statusCode, responseData);
      if (error) {
        dispatch({
          type: USER_REGISTER_REQUEST_FAILED,
          payload: error,
        });
      } else {
        dispatch({
          type: USER_REGISTER_REQUEST_SUCCESS,
          payload: responseData,
        });
        dispatch({
          type: USER_LOGIN_REQUEST_SUCCESS,
          payload: responseData,
        });
        localStorage.setItem("userInformation", JSON.stringify(responseData));
      }
    } catch (error) {
      console.log(`Error occurred ${error}`);
      let payloadToSend =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: USER_REGISTER_REQUEST_FAILED,
        payload: payloadToSend,
      });
    }
  };
