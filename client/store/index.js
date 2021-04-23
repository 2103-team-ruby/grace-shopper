import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import allProductsReducer from "./allProducts";
import singleProductReducer from "./singleProduct";
import cartReducer from "./cart";
import guestCartReducer from "./guestCart"

const reducer = combineReducers({
  auth,
  singleProduct: singleProductReducer,
  allProducts: allProductsReducer,
  cartProducts: cartReducer,
  guestCart: guestCartReducer
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
