import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { bookListReducer, bookDetailsReducer } from "./reducers/bookReducer";
import { cartReducer } from "./reducers/bookReducer";

let localStorageCartItems = localStorage.getItem("booksInCart")
  ? JSON.parse(localStorage.getItem("booksInCart"))
  : [];
const reducer = combineReducers({
  bookList: bookListReducer,
  bookDetails: bookDetailsReducer,
  userCart: cartReducer,
});

const initialState = {
  userCart: { booksInCart: localStorageCartItems },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
