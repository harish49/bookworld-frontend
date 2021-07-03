import {
  BOOKS_REQUEST,
  BOOKS_REQUEST_SUCCESS,
  BOOKS_REQUEST_FAILED,
  BOOKS_DETAILS_REQUEST,
  BOOKS_DETAILS_REQUEST_SUCCESS,
  BOOKS_DETAILS_REQUEST_FAILED,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  USER_LOGIN_REQUEST,
  USER_LOGIN_REQUEST_SUCCESS,
  USER_LOGIN_REQUEST_FAILED,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_REQUEST_SUCCESS,
  USER_REGISTER_REQUEST_FAILED,
} from "../Appconstants.js/bookconstants";

export const bookListReducer = (state = { books: [] }, action) => {
  switch (action.type) {
    case BOOKS_REQUEST:
      return { loading: true, books: [] };
    case BOOKS_REQUEST_SUCCESS:
      return { loading: false, books: action.payload };
    case BOOKS_REQUEST_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bookDetailsReducer = (
  state = { book: {}, loading: true },
  action
) => {
  switch (action.type) {
    case BOOKS_DETAILS_REQUEST:
      return { loading: true, ...state };
    case BOOKS_DETAILS_REQUEST_SUCCESS:
      return { loading: false, book: action.payload };
    case BOOKS_DETAILS_REQUEST_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const cartReducer = (state = { booksInCart: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      let currentItem = action.payload;
      console.log(state);
      console.log(state.booksInCart);
      let isAlreadyPresent = state.booksInCart.find(
        (item) => item.bookId === currentItem.bookId
      );
      for (let i = 0; i < state.booksInCart.length; i++) {
        if (state.booksInCart[i].bookId === currentItem.bookId) {
          state.booksInCart[i] = currentItem;
        }
      }
      if (isAlreadyPresent) {
        console.log("Already present");
        return {
          ...state,
          booksInCart: [...state.booksInCart],
        };
      } else {
        return {
          ...state,
          booksInCart: [...state.booksInCart, currentItem],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        booksInCart: state.booksInCart.filter(
          (book) => book.bookId !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_REQUEST_SUCCESS:
      return { loading: false, userInformation: action.payload };
    case USER_LOGIN_REQUEST_FAILED:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_REQUEST_SUCCESS:
      return { loading: false, userInformation: action.payload };
    case USER_REGISTER_REQUEST_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
