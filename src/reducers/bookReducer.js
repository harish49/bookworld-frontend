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
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_REQUEST_SUCCESS,
  USER_PROFILE_UPDATE_REQUEST_FAILED,
  SHIPPING_ADDRESS,
  PAYMENT_METHOD,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_FAILED,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_REQUEST_SUCCESS,
  ORDER_DETAILS_REQUEST_FAILED,
  USER_ORDERS_REQUEST,
  USER_ORDERS_REQUEST_SUCCESS,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_REQUEST_SUCCESS,
  GET_ALL_USERS_REQUEST_FAILED,
  REMOVE_USER_REQUEST,
  REMOVE_USER_REQUEST_SUCCESS,
  REMOVE_USER_REQUEST_FAILED,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_REQUEST_SUCCESS,
  UPDATE_ORDER_REQUEST_FAILED,
  UPDATE_BOOK_COUNT_REQUEST,
  UPDATE_BOOK_COUNT_REQUEST_SUCCESS,
  UPDATE_BOOK_COUNT_REQUEST_FAILED,
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

export const cartReducer = (
  state = { booksInCart: [], shippingAddress: {} },
  action
) => {
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
    case SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
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

export const updateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_UPDATE_REQUEST:
      return { loading: true };
    case USER_PROFILE_UPDATE_REQUEST_SUCCESS:
      return { loading: false, profileUpdated: action.payload };
    case USER_PROFILE_UPDATE_REQUEST_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_REQUEST_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_REQUEST_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userOrderReducer = (state = { userOrders: [] }, action) => {
  switch (action.type) {
    case USER_ORDERS_REQUEST:
      return { loading: true };
    case USER_ORDERS_REQUEST_SUCCESS:
      return { loading: false, userOrders: action.payload };
    case ORDER_DETAILS_REQUEST_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllUsersReducer = (state = { listofUsers: [] }, action) => {
  switch (action.type) {
    case GET_ALL_USERS_REQUEST:
      return { loading: true };
    case GET_ALL_USERS_REQUEST_SUCCESS:
      return { loading: false, listofUsers: action.payload };
    case GET_ALL_USERS_REQUEST_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const removeUserReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_USER_REQUEST:
      return { loading: true };
    case REMOVE_USER_REQUEST_SUCCESS:
      return {
        loading: false,
        userDeleted: action.payload,
        removeUserError: null,
      };
    case REMOVE_USER_REQUEST_FAILED:
      return {
        loading: false,
        removeUserError: action.payload,
        userDeleted: null,
      };
    default:
      return state;
  }
};

export const updateOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
      return { loading: true };
    case UPDATE_ORDER_REQUEST_SUCCESS:
      return {
        loading: false,
        orderUpdated: action.payload,
        orderUpdateError: null,
      };
    case UPDATE_ORDER_REQUEST_FAILED:
      return {
        loading: false,
        orderUpdateError: action.payload,
        orderUpdated: null,
      };
    default:
      return state;
  }
};

export const updateBookCount = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_BOOK_COUNT_REQUEST:
      return { loading: true };
    case UPDATE_BOOK_COUNT_REQUEST_SUCCESS:
      return {
        loading: false,
        updateBook: action.payload,
        updateBookError: null,
      };
    case UPDATE_BOOK_COUNT_REQUEST_FAILED:
      return {
        loading: false,
        updateBookError: action.payload,
        updateBook: null,
      };
    default:
      return state;
  }
};
