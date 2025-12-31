import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMembersAsync = createAsyncThunk(
  "members/fetchMembersAsync",
  async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `https://zygomorphic-zahara-neog-f3974a52.koyeb.app/members`,
      {
        headers: { Authorization: token },
      }
    );
    const data = response.data;
    return data;
  }
);

export const addMembersAsync = createAsyncThunk(
  "members/addMembersAsync",
  async ({ name }) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `https://zygomorphic-zahara-neog-f3974a52.koyeb.app/members`,
      { name },
      { headers: { Authorization: token } }
    );
    const data = response.data;
    //console.log(data, "data submited");
    return data;
  }
);

export const deleteMembersAsync = createAsyncThunk(
  "members/deleteMembersAsync",
  async ({ id }) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `https://zygomorphic-zahara-neog-f3974a52.koyeb.app/members/${id}`,
      {
        headers: { Authorization: token },
      }
    );
    const data = response.data;
    //console.log(data, "deleted");
    return data;
  }
);

export const memberSlice = createSlice({
  name: "members",
  initialState: {
    members: [],
    memberStatus: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //fetch
    builder.addCase(fetchMembersAsync.pending, (state) => {
      state.memberStatus = "Loading";
    });
    builder.addCase(fetchMembersAsync.fulfilled, (state, action) => {
      state.memberStatus = "All members";
      state.members = action.payload;
    });
    builder.addCase(fetchMembersAsync.rejected, (state, action) => {
      state.memberStatus = "error";
      state.error = action.error.message;
    });
    //add
    builder.addCase(addMembersAsync.pending, (state) => {
      state.memberStatus = "Loading";
    });
    builder.addCase(addMembersAsync.fulfilled, (state, action) => {
      state.memberStatus = "Added members";
      state.members.push(action.payload);
    });
    builder.addCase(addMembersAsync.rejected, (state, action) => {
      state.memberStatus = "error";
      state.error = action.error.message;
    });
    //delete
    builder.addCase(deleteMembersAsync.pending, (state) => {
      state.memberStatus = "Loading";
    });
    builder.addCase(deleteMembersAsync.fulfilled, (state, action) => {
      state.memberStatus = "Deleted member";
      state.members = state.members.filter((m) => m._id !== action.payload._id);
    });
    builder.addCase(deleteMembersAsync.rejected, (state, action) => {
      state.memberStatus = "error";
      state.error = action.error.message;
    });
  },
});

export default memberSlice.reducer;
