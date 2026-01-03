import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTeamsAsync = createAsyncThunk(
  "teams/fetchTeamsAsync",
  async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("https://workviyo.vercel.app/teams", {
      headers: { Authorization: token },
    });
    return response.data;
  }
);

export const addTeamsAsync = createAsyncThunk(
  "teams/addTeamsAsync",
  async ({ name, members }) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "https://workviyo.vercel.app/teams",
      { name, members },
      { headers: { Authorization: token } }
    );
    return response.data;
  }
);

export const updateTeamAsync = createAsyncThunk(
  "teams/updateTeamAsync",
  async ({ id, name, members }) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `https://workviyo.vercel.app/teams/${id}`,
      { name, members },
      { headers: { Authorization: token } }
    );
    return response.data;
  }
);

export const deleteTeamAsync = createAsyncThunk(
  "teams/deleteTeamAsync",
  async ({ id }) => {
    const token = localStorage.getItem("token");
    await axios.delete(`https://workviyo.vercel.app/teams/${id}`, {
      headers: { Authorization: token },
    });
    return id;
  }
);

export const teamSlice = createSlice({
  name: "teams",
  initialState: {
    teams: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // fetch
    builder.addCase(fetchTeamsAsync.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(fetchTeamsAsync.fulfilled, (state, action) => {
      state.status = "All teams";
      state.teams = Array.isArray(action.payload) ? action.payload : [];
    });
    builder.addCase(fetchTeamsAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    //add
    builder.addCase(addTeamsAsync.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(addTeamsAsync.fulfilled, (state, action) => {
      state.status = "Added team";
      state.teams.push(action.payload);
    });
    builder.addCase(addTeamsAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    //update
    builder.addCase(updateTeamAsync.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(updateTeamAsync.fulfilled, (state, action) => {
      state.status = "Updated team";
      state.teams = state.teams.map((team) =>
        team._id === action.payload._id ? action.payload : team
      );
    });
    builder.addCase(updateTeamAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    //delete
    builder.addCase(deleteTeamAsync.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(deleteTeamAsync.fulfilled, (state, action) => {
      state.status = "Team deleted";
      state.teams = state.teams.filter((team) => team._id !== action.payload);
    });
    builder.addCase(deleteTeamAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default teamSlice.reducer;
