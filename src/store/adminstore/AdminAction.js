import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../helper/axiosInstance";

export const registerAdmin = createAsyncThunk(
  "admin/registerAdmin",
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

export const loginAdmin = createAsyncThunk("admin/loginAdmin", async (data) => {
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

export const loggedInAdminInfo = createAsyncThunk(
  "admin/loggedInAdminInfo",
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

export const logoutAdmin = createAsyncThunk("admin/logoutAdmin", async (id) => {
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
