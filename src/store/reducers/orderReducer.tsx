import { createSlice } from "@reduxjs/toolkit";

interface OrderItemI {
  productId: string;
  qty: number;
}

export interface OrderI {
  _id: string;
  items: Array<OrderItemI>;
  orderAmount: number;
  userId: string;
  status: string;
  address: string;
}

interface InitialStateI {
  allOrders: Array<OrderI>;
}

const INITIAL_STATE: InitialStateI = {
  allOrders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState: INITIAL_STATE,
  reducers: {},
});

const orderReducer = orderSlice.reducer;

export default orderReducer;
