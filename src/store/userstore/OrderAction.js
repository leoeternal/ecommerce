import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../helper/axiosInstance";
import { productActions } from "../ProductSlice";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (data) => {
    const fetchData = () => {
      const response = axios.post("/order", data, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      return response;
    };
    try {
      const data = await fetchData();
      return data;
    } catch (error) {
      if (
        error.response.status === 400 ||
        error.response.status === 404 ||
        error.response.status === 401
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again later");
      }
      return error.response;
    }
  }
);

export const updateOrderAddress = createAsyncThunk(
  "order/updateOrderAddress",
  async (data) => {
    const fetchData = () => {
      const response = axios.post("/order/address", data, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      return response;
    };
    try {
      const data = await fetchData();
      return data;
    } catch (error) {
      if (
        error.response.status === 400 ||
        error.response.status === 404 ||
        error.response.status === 401
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again later");
      }
      return error.response;
    }
  }
);

export const updateOrderPayment = createAsyncThunk(
  "order/updateOrderPayment",
  async (data) => {
    const fetchData = () => {
      const response = axios.patch("/order/payment/update", data, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      return response;
    };
    try {
      const data = await fetchData();
      return data;
    } catch (error) {
      if (
        error.response.status === 400 ||
        error.response.status === 404 ||
        error.response.status === 401
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again later");
      }
      return error.response;
    }
  }
);

export const orderPlaced = createAsyncThunk(
  "order/orderPlaced",
  async (data, thunkAPI) => {
    const fetchData = () => {
      const response = axios.patch("/order/placed", data, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      return response;
    };
    try {
      const data = await fetchData();
      thunkAPI.dispatch(productActions.updateProductsInCartValue());
      return data;
    } catch (error) {
      if (
        error.response.status === 400 ||
        error.response.status === 404 ||
        error.response.status === 401
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again later");
      }
      return error.response;
    }
  }
);

export const getOrderById = createAsyncThunk(
  "order/getOrderById",
  async (id) => {
    const fetchData = () => {
      const response = axios.get(`/order/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      return response;
    };
    try {
      const data = await fetchData();
      return data;
    } catch (error) {
      if (
        error.response.status === 400 ||
        error.response.status === 404 ||
        error.response.status === 401
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again later");
      }
      return error.response;
    }
  }
);
