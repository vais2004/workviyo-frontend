import {
  buildCreateSlice,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserAsync = createAsyncThunk(
  "users/fetchUserAsync",
  async () => {
    const token = localStorage.getItem("token");

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
      `https://workviyo.vercel.app/auth/signup`,
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
        `https://workviyo.vercel.app/auth/login`,
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

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    statusUser: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //fetch
    builder.addCase(fetchUserAsync.pending, (state) => {
      state.statusUser = "Loading";
    });
    builder.addCase(fetchUserAsync.fulfilled, (state, action) => {
      state.statusUser = "All User";
      state.users = action.payload;
    });
    builder.addCase(fetchUserAsync.rejected, (state, action) => {
      state.statusUser = "error";
      state.error = action.error.message;
    });

    //register
    builder.addCase(registerUserAsync.pending, (state) => {
      state.statusUser = "Loading";
    });
    builder.addCase(registerUserAsync.fulfilled, (state, action) => {
      state.statusUser = "User registered";
      state.users = action.payload;
    });
    builder.addCase(registerUserAsync.rejected, (state, action) => {
      state.statusUser = "error";
      state.error = action.error.message;
    });
    //login
    builder.addCase(userLoginAsync.pending, (state) => {
      state.statusUser = "Loading";
    });
    builder.addCase(userLoginAsync.fulfilled, (state, action) => {
      state.statusUser = "User Login token";
      state.users = action.payload;
    });
    builder.addCase(userLoginAsync.rejected, (state, action) => {
      state.statusUser = "error";
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
