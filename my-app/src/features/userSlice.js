import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserAsync = createAsyncThunk(
  "users/fetchUserAsync",
  async () => {
    const response = await axios.get(`https://workviyo.vercel.app/users`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const data = response.data;
    return data;
  }
);

export const registerUserAsync = createAsyncThunk(
  "users/registerUserAsync",
  async (credentials) => {
    const response = await axios.post(
      `https://workviyo.vercel.app/users/register`,
      credentials
    );
    const data = response.data;
    console.log("signup response:", response.data);
    localStorage.setItem("token", response.data.token);
    console.log(data, "data submit");
    return data;
  }
);

export const userLoginAsync = createAsyncThunk(
  "users/userLoginAsync",
  async (credentials) => {
    try {
      const response = await axios.post(
        `https://workviyo.vercel.app/users/login`,
        credentials
      );
      console.log("Login response: ", response.data);
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      console.error("Login error: ", error.response?.data);
    }
  }
);
