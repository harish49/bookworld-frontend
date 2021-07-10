import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  bookListReducer,
  bookDetailsReducer,
  cartReducer,
  userReducer,
  userRegisterReducer,
  updateProfileReducer,
  orderReducer,
} from "./reducers/bookReducer";
//Use telegram icon to post reviews
let localStorageCartItems = localStorage.getItem("booksInCart")
  ? JSON.parse(localStorage.getItem("booksInCart"))
  : [];
let localStorageUserInfo = localStorage.getItem("userInformation")
  ? JSON.parse(localStorage.getItem("userInformation"))
  : null;

let localStorageShippingAddress = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};
const reducer = combineReducers({
  bookList: bookListReducer,
  bookDetails: bookDetailsReducer,
  userCart: cartReducer,
  userLogin: userReducer,
  userRegister: userRegisterReducer,
  updateProfile: updateProfileReducer,
  createOrder: orderReducer,
});

const initialState = {
  userCart: {
    booksInCart: localStorageCartItems,
    shippingAddress: localStorageShippingAddress,
  },
  userLogin: { userInformation: localStorageUserInfo },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
