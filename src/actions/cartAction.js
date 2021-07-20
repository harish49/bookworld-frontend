import {
  CART_ADD_ITEM,
  BASE_URL,
  CART_REMOVE_ITEM,
  SHIPPING_ADDRESS,
  PAYMENT_METHOD,
  REFRESH_CART,
  USER_LOGOUT,
} from "../Appconstants.js/bookconstants";

const axios = require("axios");

export const cartAddItem = (bookId, quantity) => async (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  };
  try {
    const { data } = await axios.get(
      `${BASE_URL}/books/getbook/${bookId}`,
      config
    );
    console.log("Quantity is" + quantity);
    const responseData = data.responseData;
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        bookId: responseData.bookId,
        bookTitle: responseData.title,
        bookImageLink: responseData.thumbnail,
        bookPrice: responseData.price,
        booksInStock: responseData.availableCount,
        quantity,
      },
    });
    console.log("Dispatching completed cartaction");
    localStorage.setItem(
      "booksInCart",
      JSON.stringify(getState().userCart.booksInCart)
    );
  } catch (error) {
    if (error.response && error.response.status === 403) {
      localStorage.clear();
      dispatch({
        type: USER_LOGOUT,
      });
    } else {
      console.log(`Error occurred while fetching book ${error}`);
    }
  }
};

export const cartRemoveItem = (bookId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: bookId,
    });
    localStorage.setItem(
      "booksInCart",
      JSON.stringify(getState().userCart.booksInCart)
    );
  } catch (error) {
    console.log(`Error occurred while fetching book ${error}`);
  }
};

export const refreshCart = () => async (dispatch) => {
  try {
    dispatch({
      type: REFRESH_CART,
    });
  } catch (error) {
    console.log(`Error occurred while fetching book ${error}`);
  }
};

export const ShippingAddress = (address) => async (dispatch) => {
  dispatch({
    type: SHIPPING_ADDRESS,
    payload: address,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(address));
};
export const PaymentMethod = (paymentMethod) => async (dispatch) => {
  dispatch({
    type: PAYMENT_METHOD,
    payload: paymentMethod,
  });
  localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
};
