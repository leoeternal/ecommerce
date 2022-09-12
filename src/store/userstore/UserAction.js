import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../helper/axiosInstance";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data) => {
    const fetchData = () => {
      const response = axios.post("/register", data);
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
      }
      return error.response;
    }
  }
);

export const loginUser = createAsyncThunk("user/loginUser", async (data) => {
  const fetchData = () => {
    const response = axios.post("/login", data);
    return response;
  };
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      toast.error(error.response.data.message);
    }
    return error.response;
  }
});

export const loggedInUserInfo = createAsyncThunk(
  "user/loggedInUserInfo",
  async (id) => {
    const fetchData = () => {
      const response = axios.post("/user/info", id);
      return response;
    };
    try {
      const data = await fetchData();
      return data;
    } catch (error) {
      if (error.response.status === 404) {
        toast.error(error.response.data.message);
      }
      return error.response;
    }
  }
);

export const logoutUser = createAsyncThunk("user/logoutUser", async (id) => {
  const fetchData = () => {
    const response = axios.get(`/logout/${id}`, {
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
    if (error.response.status === 401) {
      toast.error(error.response.data.message);
    } else if (error.response.status === 500) {
      toast.error(error.response.data.message);
    }
    return error.response;
  }
});

export const viewOrders = createAsyncThunk("user/viewOrders", async (data) => {
  const fetchData = () => {
    const response = axios.get(
      `/view/orders/${data.userId}?orderStatus=${data.orderStatus}`,
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );
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
    }
    return error.response;
  }
});
