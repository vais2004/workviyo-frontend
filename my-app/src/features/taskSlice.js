import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTasksAsync = createAsyncThunk(
  "tasks/fetchTasksAsync",
  async ({ taskStatus, prioritySort, dateSort } = {}) => {
    const queryParams = new URLSearchParams();

    if (taskStatus) queryParams.append("status", taskStatus);
    if (prioritySort) queryParams.append("prioritySort", prioritySort);
    if (dateSort) queryParams.append("dateSort", dateSort);

    const token = localStorage.getItem("token");
    const response = await axios.get(
      `https://workviyo.vercel.app/tasks?${queryParams.toString()}`,
      { headers: { Authorization: `${token}` } }
    );
    const data = response.data;
    return data;
  }
);

export const addTaskAsync = createAsyncThunk(
  "tasks/addTaskAsync",
  async ({
    name,
    project,
    team,
    timeToComplete,
    tags,
    owners,
    priority,
    status,
  }) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `https://workviyo.vercel.app/tasks`,
      { name, project, team, timeToComplete, tags, owners, priority, status },
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

export const updateTaskAsync = createAsyncThunk(
  "tasks/updateTaskAsync",
  async ({
    id,
    name,
    project,
    team,
    timeToComplete,
    tags,
    owners,
    priority,
    status,
  }) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `https://workviyo.vercel.app/tasks/${id}`,
      { name, project, team, timeToComplete, tags, owners, priority, status },
      { headers: { Authorization: `${token}` } }
    );
    const data = response.data;
    return data;
  }
);

export const deleteTaskAsync = createAsyncThunk(
  "tasks/deleteTaskAsync",
  async ({ id }) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `https://workviyo.vercel.app/tasks/${id}`,
      {
        headers: { Authorization: `${token}` },
      }
    );
    const data = response.data;
    return data;
  }
);

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //fetch
    builder.addCase(fetchTasksAsync.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(fetchTasksAsync.fulfilled, (state, action) => {
      state.status = "All Tasks";
      state.tasks = action.payload;
      console.log(action.payload, "payload");
    });
    builder.addCase(fetchTasksAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});
