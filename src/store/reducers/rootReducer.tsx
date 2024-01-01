import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import errReducer from "./errReducer";
import productReducer from "./product";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  user: userReducer,
  error: errReducer,
  product: productReducer,
  order: orderReducer,
});

export default rootReducer;
