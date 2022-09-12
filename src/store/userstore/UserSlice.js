import { createSlice } from "@reduxjs/toolkit";

import {
  registerUser,
  loginUser,
  viewOrders,
  loggedInUserInfo,
  logoutUser,
} from "./UserAction";

const initialState = {
  userCreated: false,
  userButtonLoader: false,
  loggedStatus: localStorage.getItem("loggedId") !== null ? true : false,
  loggedInUserDetails: {},
  loggedInUserInfoStatus: false,
  sessionExpired: false,
  userLoggedOut: false,
  userInfoPageLoader: true,
  orders: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserButtonLoaderValue: (state, action) => {
      state.userButtonLoader = true;
    },
    updateUserCreatedValue: (state, action) => {
      state.userCreated = false;
    },
    updateSessionExpiredValue: (state, action) => {
      state.sessionExpired = false;
    },
    updateLoggedInUserDetails: (state, action) => {
      state.loggedInUserDetails = action.payload;
    },
    updateUserLoggedOutValue: (state, action) => {
      state.userLoggedOut = false;
    },
    updateUserInfoPageLoaderValue: (state, action) => {
      state.userInfoPageLoader = true;
    },
  },
  extraReducers: {
    [registerUser.pending]: () => {
      console.log("pending");
    },
    [registerUser.fulfilled]: (state, action) => {
      if (action.payload.status === 201) {
        state.userCreated = true;
      }
      state.userButtonLoader = false;
    },
    [registerUser.rejected]: () => {
      console.log("rejected");
    },
    [loginUser.pending]: () => {
      console.log("pending");
    },
    [loginUser.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        localStorage.setItem("token", action.payload.data.token);
        localStorage.setItem("loggedId", action.payload.data.data._id);
        state.loggedStatus = true;
      }

      state.userButtonLoader = false;
    },
    [loginUser.rejected]: () => {
      console.log("rejected");
    },
    [loggedInUserInfo.pending]: () => {
      console.log("pending");
    },
    [loggedInUserInfo.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.loggedInUserDetails = action.payload.data.data;
        state.loggedInUserInfoStatus = true;
      }
    },
    [loggedInUserInfo.rejected]: () => {
      console.log("rejected");
    },
    [logoutUser.pending]: () => {
      console.log("pending");
    },
    [logoutUser.fulfilled]: (state, action) => {
      state.userLoggedOut = true;
      localStorage.removeItem("token");
      localStorage.removeItem("loggedId");
      localStorage.removeItem("orderStep");
      state.loggedStatus = false;
      state.loggedInUserInfoStatus = false;
      state.userButtonLoader = false;
      if (action.payload.status === 401 || action.payload.status === 500) {
        state.sessionExpired = true;
      }
    },
    [logoutUser.rejected]: () => {
      console.log("rejected");
    },
    [viewOrders.pending]: () => {
      console.log("pending");
    },
    [viewOrders.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.orders = action.payload.data.data;
      }
      state.userInfoPageLoader = false;
    },
    [viewOrders.rejected]: () => {
      console.log("rejected");
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
