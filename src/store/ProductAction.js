import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../helper/axiosInstance";
import { userActions } from "./userstore/UserSlice";

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (data) => {
    const fetchData = () => {
      const response = axios.post("/admin/add", data, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      return response;
    };
    try {
      const data = await fetchData();
      if (data.status === 201) {
        toast.success(data.data.message);
      }
      return data;
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.message);
      } else if (error.response.status === 401) {
        toast.error(error.response.data.message);
      }
      return error.response;
    }
  }
);

export const getAllProduct = createAsyncThunk(
  "product/getAllProduct",
  async () => {
    const fetchData = () => {
      const response = axios.get("/products");
      return response;
    };
    try {
      const data = await fetchData();
      return data;
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.message);
      }
      return error.response;
    }
  }
);

export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id) => {
    const fetchData = () => {
      const response = axios.get(`/product/${id}`);
      return response;
    };
    try {
      const data = await fetchData();
      return data;
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.message);
      }
      return error.response;
    }
  }
);

export const addProductToCart = createAsyncThunk(
  "product/addProductToCart",
  async (data, thunkAPI) => {
    const fetchData = () => {
      const response = axios.patch("/product/cart", data, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      return response;
    };
    try {
      const data = await fetchData();
      thunkAPI.dispatch(userActions.updateLoggedInUserDetails(data.data.data));
      return data;
    } catch (error) {
      if (error.response.status === 400 || error.response.status === 404) {
        toast.error(error.response.data.message);
      } else if (error.response.status === 401) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again later");
      }
      return error.response;
    }
  }
);

export const getProductInCart = createAsyncThunk(
  "product/getProductInCart",
  async (userId) => {
    const fetchData = () => {
      const response = axios.get(`/product/cart/${userId}`, {
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
        error.response.status === 401 ||
        error.response.status === 404
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again later");
      }
      return error.response;
    }
  }
);

export const getProductsNameByQuery = createAsyncThunk(
  "product/getProductsNameByQuery",
  async (query) => {
    const fetchData = () => {
      const response = axios.get(`/product/search/${query}`);
      return response;
    };
    try {
      const data = await fetchData();
      return data;
    } catch (error) {
      if (
        error.response.status === 400 ||
        error.response.status === 401 ||
        error.response.status === 404
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again later");
      }
      return error.response;
    }
  }
);

export const getProductsBySearchStatus = createAsyncThunk(
  "product/getProductsBySearchStatus",
  async (data) => {
    const fetchData = () => {
      const response = axios.post(
        `/products/search?sort=${data.sort}&page=${data.page - 1}`,
        data
      );
      return response;
    };
    try {
      const data = await fetchData();
      return data;
    } catch (error) {
      if (
        error.response.status === 400 ||
        error.response.status === 401 ||
        error.response.status === 404
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again later");
      }
      return error.response;
    }
  }
);

export const removeProductFromCart = createAsyncThunk(
  "product/removeProductFromCart",
  async (productId, thunkAPI) => {
    const fetchData = () => {
      const response = axios.delete(`/product/remove/${productId}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      return response;
    };
    try {
      const data = await fetchData();
      thunkAPI.dispatch(userActions.updateLoggedInUserDetails(data.data.data));
      return data;
    } catch (error) {
      if (
        error.response.status === 400 ||
        error.response.status === 401 ||
        error.response.status === 404
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again later");
      }
      return error.response;
    }
  }
);
