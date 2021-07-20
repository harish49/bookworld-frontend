import {
  BASE_URL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_REQUEST_FAILED,
  USER_LOGIN_REQUEST_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_REQUEST_SUCCESS,
  USER_REGISTER_REQUEST_FAILED,
  USER_PROFILE_UPDATE_REQUEST_FAILED,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_REQUEST_SUCCESS,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_REQUEST_SUCCESS,
  GET_ALL_USERS_REQUEST_FAILED,
  REMOVE_USER_REQUEST,
  REMOVE_USER_REQUEST_SUCCESS,
  REMOVE_USER_REQUEST_FAILED,
} from "../Appconstants.js/bookconstants";

const axios = require("axios");

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const { data } = await axios.post(`${BASE_URL}/users/login`, {
      userName: username,
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
      localStorage.setItem("userInformation", JSON.stringify(responseData));
      axios
        .post(`${BASE_URL}/jwt/token`, {
          userName: username,
          password: password,
        })
        .then((response) => {
          localStorage.setItem("jwtToken", response.data.responseData.token);
        })
        .catch((error) => {
          console.log(error);
        });

      dispatch({
        type: USER_LOGIN_REQUEST_SUCCESS,
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
      type: USER_LOGIN_REQUEST_FAILED,
      payload: payloadToSend,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({
    type: USER_LOGOUT,
  });
};

export const register =
  (username, email, firstName, lastName, password, mobileNumber) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const registerUser = {
        userName: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNumber: mobileNumber,
      };
      const { data } = await axios.post(
        `${BASE_URL}/users/signup`,
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
        const { data } = await axios.post(`${BASE_URL}/jwt/token`, {
          userName: username,
          password: password,
        });
        localStorage.setItem("jwtToken", data.responseData.token);
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

export const profile =
  (username, email, password, firstname, lastname, mobilenumber) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_PROFILE_UPDATE_REQUEST,
      });

      const updateDetails = {
        userName: username,
        password: password,
        email: email,
        mobileNumber: mobilenumber,
        firstName: firstname,
        lastName: lastname,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/users/updateprofile`,
        updateDetails,
        config
      );
      const { error, statusCode, responseData } = data;
      console.log(error, statusCode, responseData);
      if (error) {
        dispatch({
          type: USER_PROFILE_UPDATE_REQUEST_FAILED,
          payload: error,
        });
      } else {
        dispatch({
          type: USER_PROFILE_UPDATE_REQUEST_SUCCESS,
          payload: responseData,
        });
        localStorage.setItem("userInformation", JSON.stringify(responseData));
        localStorage.setItem("profileUpdated", JSON.stringify(responseData));
      }
    } catch (error) {
      console.log(`Error occurred ${error}`);
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
          type: USER_PROFILE_UPDATE_REQUEST_FAILED,
          payload: payloadToSend,
        });
      }
    }
  };

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_USERS_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    };
    const { data } = await axios.get(`${BASE_URL}/users/all`, config);
    const { error, statusCode, responseData } = data;
    console.log(error, statusCode, responseData);
    if (error) {
      dispatch({
        type: GET_ALL_USERS_REQUEST_FAILED,
        payload: error,
      });
    } else {
      dispatch({
        type: GET_ALL_USERS_REQUEST_SUCCESS,
        payload: responseData,
      });
    }
  } catch (error) {
    console.log(`Error occurred ${error}`);
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
        type: GET_ALL_USERS_REQUEST_FAILED,
        payload: payloadToSend,
      });
    }
  }
};
export const removeUser = (username) => async (dispatch) => {
  try {
    dispatch({
      type: REMOVE_USER_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    };
    const { data } = await axios.delete(
      `${BASE_URL}/users/remove/${username}`,
      config
    );
    const { error, statusCode, responseData } = data;
    console.log(error, statusCode, responseData);

    if (error) {
      dispatch({
        type: REMOVE_USER_REQUEST_FAILED,
        payload: error,
      });
    } else {
      dispatch({
        type: REMOVE_USER_REQUEST_SUCCESS,
        payload: responseData,
      });
    }
  } catch (error) {
    console.log(`Error occurred ${error}`);
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
        type: REMOVE_USER_REQUEST_FAILED,
        payload: payloadToSend,
      });
    }
  }
};
