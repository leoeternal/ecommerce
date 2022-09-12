import { createSlice } from "@reduxjs/toolkit";

import {
  createOrder,
  updateOrderAddress,
  updateOrderPayment,
  orderPlaced,
  getOrderById,
} from "./OrderAction";

const initialState = {
  onOrderScreen: false,
  orderPageLoader: true,
  orderDetails: {},
  orderCreated: false,
  orderUpdated: false,
  orderButtonLoader: false,
  orderPaymentUpdated: false,
  orderPlacedFinal: false,
  currentOrderData: {},
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateOnOrderScreenValueToTrue: (state, action) => {
      state.onOrderScreen = true;
    },
    updateOnOrderScreenValueToFalse: (state, action) => {
      state.onOrderScreen = false;
    },
    updateOrderPageLoaderValue: (state, action) => {
      state.orderPageLoader = true;
    },
    updateOrderCreatedValue: (state, action) => {
      state.orderCreated = false;
    },
    updateOrderUpdatedValue: (state, action) => {
      state.orderUpdated = false;
    },
    updateOrderButtonLoaderValue: (state, action) => {
      state.orderButtonLoader = true;
    },
    updateOrderPaymentUpdatedValue: (state, action) => {
      state.orderPaymentUpdated = false;
    },
    updateOrderPlacedFinalValue: (state, action) => {
      state.orderPlacedFinal = false;
    },
  },
  extraReducers: {
    [createOrder.pending]: () => {
      console.log("pending");
    },
    [createOrder.fulfilled]: (state, action) => {
      if (action.payload.status === 201 || action.payload.status === 200) {
        state.orderDetails = action.payload.data.data;
        state.orderPageLoader = false;
        state.orderCreated = true;
      }
    },
    [createOrder.rejected]: () => {
      console.log("rejected");
    },
    [updateOrderAddress.pending]: () => {
      console.log("pending");
    },
    [updateOrderAddress.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.orderDetails = action.payload.data.data;
        state.orderUpdated = true;
      }
      state.orderButtonLoader = false;
    },
    [updateOrderAddress.rejected]: () => {
      console.log("rejected");
    },
    [updateOrderPayment.pending]: () => {
      console.log("pending");
    },
    [updateOrderPayment.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.orderPaymentUpdated = true;
      }
      state.orderButtonLoader = false;
    },
    [updateOrderPayment.rejected]: () => {
      console.log("rejected");
    },
    [orderPlaced.pending]: () => {
      console.log("pending");
    },
    [orderPlaced.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.orderPlacedFinal = true;
        localStorage.removeItem("orderStep");
      }
      state.orderButtonLoader = false;
    },
    [orderPlaced.rejected]: () => {
      console.log("rejected");
    },
    [getOrderById.pending]: () => {
      console.log("pending");
    },
    [getOrderById.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.currentOrderData = action.payload.data.data;
      }
      state.orderPageLoader = false;
    },
    [getOrderById.rejected]: () => {
      console.log("rejected");
    },
  },
});

export const orderActions = orderSlice.actions;
export default orderSlice;
