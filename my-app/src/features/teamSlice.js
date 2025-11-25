import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTeamsAsync = createAsyncThunk(
  "teams/fetchTeamsAsync",
  async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`https://workviyo.vercel.app/teams`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const data = response.data;
    return data;
  }
);

export const addTeamsAsync = createAsyncThunk(
  "teams/addTeamsAsync",
  async ({ name, members }) => {
    console.log({ name, members });
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `https://workviyo.vercel.app/teams`,
      { name, members },
      { headers: { Authorization: `${token}` } }
    );
    const data = response.data;
    console.log("added data", data);
    return data;
  }
);

export const updateTeamAsync = createAsyncThunk(
  "teams/updateTeamAsync",
  async ({ id, name, members }) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `https://workviyo.vercel.app/teams/${id}`,
      { name, members },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    const data = response.data;
    return data;
  }
);

export const deleteTeamAsync = createAsyncThunk(
  "teams/deleteTeamAsync",
  async ({ id }) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `https://workviyo.vercel.app/teams/${id}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    const data = response.data;
    console.log(data, "deleted teams data");
    return data;
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
      state.teams = action.payload;
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
      state.status = "Added teams";
      state.teams = action.payload;
      console.log(action.payload, "payload");
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
      state.status = "updated teams";
      state.teams = action.payload;
      console.log(action.payload, "payload");
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
      state.status = "deleted teams";
      state.teams = action.payload;
      console.log(action.payload, "payload");
    });
    builder.addCase(deleteTeamAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default teamSlice.reducer;
