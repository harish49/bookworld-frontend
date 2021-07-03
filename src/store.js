import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  bookListReducer,
  bookDetailsReducer,
  cartReducer,
  userReducer,
  userRegisterReducer,
} from "./reducers/bookReducer";
//Use telegram icon to post reviews
let localStorageCartItems = localStorage.getItem("booksInCart")
  ? JSON.parse(localStorage.getItem("booksInCart"))
  : [];
let localStorageUserInfo = localStorage.getItem("userInformation")
  ? JSON.parse(localStorage.getItem("userInformation"))
  : null;
const reducer = combineReducers({
  bookList: bookListReducer,
  bookDetails: bookDetailsReducer,
  userCart: cartReducer,
  userLogin: userReducer,
  userRegister: userRegisterReducer,
});

const initialState = {
  userCart: { booksInCart: localStorageCartItems },
  userLogin: { userInformation: localStorageUserInfo },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
