// projectSlice.js (corrected)
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProjectsAsync = createAsyncThunk(
  "projects/fetchProjectsAsync",
  async ({ projectStatus } = {}) => {
    const queryParams = new URLSearchParams();
    const token = localStorage.getItem("token");

    if (projectStatus) queryParams.append("status", projectStatus);
    const response = await axios.get(
      `https://workviyo.vercel.app/projects?${queryParams.toString()}`,
      {
        headers: { Authorization: token },
      }
    );
    const data = response.data;
    return data;
  }
);

export const addProjectAsync = createAsyncThunk(
  "projects/addProjectAsync",
  async ({ name, description, status }) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `https://workviyo.vercel.app/projects`,
      { name, description, status },
      {
        headers: { Authorization: token },
      }
    );
    const data = response.data.projects;
    return data;
  }
);

export const updateProjectAsync = createAsyncThunk(
  "project/updateProjectAsync",
  async ({ id, name, description, status }) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `https://workviyo.vercel.app/projects/${id}`,
      { name, description, status },
      { headers: { Authorization: token } }
    );

    const data = response.data.projects;
    return data;
  }
);

export const deleteProjectAsync = createAsyncThunk(
  "project/deleteProjectAsync",
  async ({ id }) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `https://workviyo.vercel.app/projects/${id}`,
      {
        headers: { Authorization: token },
      }
    );
    const data = response.data.projects;
    return data;
  }
);

export const projectSlice = createSlice({
  name: "Projects",
  initialState: {
    projects: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //fetch
    builder.addCase(fetchProjectsAsync.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(fetchProjectsAsync.fulfilled, (state, action) => {
      state.status = "All Projects";
      state.projects = action.payload;
    });
    builder.addCase(fetchProjectsAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    //add
    builder.addCase(addProjectAsync.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(addProjectAsync.fulfilled, (state, action) => {
      state.status = "Project Added";
      state.projects = action.payload;
    });
    builder.addCase(addProjectAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    //update
    builder.addCase(updateProjectAsync.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(updateProjectAsync.fulfilled, (state, action) => {
      state.status = "Project updated";
      state.projects = action.payload;
    });
    builder.addCase(updateProjectAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    //delete
    builder.addCase(deleteProjectAsync.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(deleteProjectAsync.fulfilled, (state, action) => {
      state.status = "Project deleted";
      state.projects = action.payload;
    });
    builder.addCase(deleteProjectAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default projectSlice.reducer;
