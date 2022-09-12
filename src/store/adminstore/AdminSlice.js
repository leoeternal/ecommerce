import { createSlice } from "@reduxjs/toolkit";

import {
  registerAdmin,
  loginAdmin,
  loggedInAdminInfo,
  logoutAdmin,
} from "./AdminAction";

const initialState = {
  adminCreated: false,
  adminButtonLoader: false,
  adminLoggedStatus:
    localStorage.getItem("adminLoggedId") !== null ? true : false,
  loggedInAdminDetails: {},
  loggedInAdminDetailsStatus: false,
  adminSessionExpired: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    updateAdminButtonLoaderValue: (state, action) => {
      state.adminButtonLoader = true;
    },
    updateAdminCreatedValue: (state, action) => {
      state.adminCreated = false;
    },
    updateAdminSessionExpiredValue: (state, action) => {
      state.adminSessionExpired = false;
    },
  },
  extraReducers: {
    [registerAdmin.pending]: () => {
      console.log("pending");
    },
    [registerAdmin.fulfilled]: (state, action) => {
      if (action.payload.status === 201) {
        state.adminCreated = true;
      }
      state.adminButtonLoader = false;
    },
    [registerAdmin.rejected]: () => {
      console.log("rejected");
    },
    [loginAdmin.pending]: () => {
      console.log("pending");
    },
    [loginAdmin.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        localStorage.setItem("token", action.payload.data.token);
        localStorage.setItem("adminLoggedId", action.payload.data.data._id);
        state.adminLoggedStatus = true;
      }
      state.adminButtonLoader = false;
    },
    [loginAdmin.rejected]: () => {
      console.log("rejected");
    },
    [loggedInAdminInfo.pending]: () => {
      console.log("pending");
    },
    [loggedInAdminInfo.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.loggedInAdminDetails = action.payload.data.data;
        state.loggedInAdminDetailsStatus = true;
      }
    },
    [loggedInAdminInfo.rejected]: () => {
      console.log("rejected");
    },
    [logoutAdmin.pending]: () => {
      console.log("pending");
    },
    [logoutAdmin.fulfilled]: (state, action) => {
      localStorage.removeItem("token");
      localStorage.removeItem("adminLoggedId");
      state.adminLoggedStatus = false;
      state.loggedInAdminDetailsStatus = false;
      state.adminButtonLoader = false;
      if (action.payload.status === 401 || action.payload.status === 500) {
        state.adminSessionExpired = true;
      }
    },
    [logoutAdmin.rejected]: () => {
      console.log("rejected");
    },
  },
});

export const adminActions = adminSlice.actions;
export default adminSlice;
