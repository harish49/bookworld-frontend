import {
  CART_ADD_ITEM,
  BASE_URL,
  CART_REMOVE_ITEM,
} from "../Appconstants.js/bookconstants";

const axios = require("axios");

export const cartAddItem = (bookId, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/books/defaultbooks/${bookId}`
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
    console.log(`Error occurred while fetching book ${error}`);
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
