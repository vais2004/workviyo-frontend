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
      `https://zygomorphic-zahara-neog-f3974a52.koyeb.app/tasks?${queryParams.toString()}`,
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
      `https://zygomorphic-zahara-neog-f3974a52.koyeb.app/tasks`,
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
      `https://zygomorphic-zahara-neog-f3974a52.koyeb.app/tasks/${id}`,
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
      `https://zygomorphic-zahara-neog-f3974a52.koyeb.app/tasks/${id}`,
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
    //add
    builder.addCase(addTaskAsync.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(addTaskAsync.fulfilled, (state, action) => {
      state.status = "Added tasks";
      state.tasks.push(action.payload);
    });
    builder.addCase(addTaskAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    //update
    builder.addCase(updateTaskAsync.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(updateTaskAsync.fulfilled, (state, action) => {
      state.status = "Updated tasks";
      state.tasks = state.tasks.map((task) =>
        task._id === action.payload._id ? action.payload : task
      );
    });
    builder.addCase(updateTaskAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    //delete

    builder.addCase(deleteTaskAsync.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(deleteTaskAsync.fulfilled, (state, action) => {
      state.status = "deleted tasks";
      state.tasks = action.payload;
    });
    builder.addCase(deleteTaskAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default taskSlice.reducer;
