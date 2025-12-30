import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://zygomorphic-zahara-neog-f3974a52.koyeb.app/tasks";

// FETCH TASKS
export const fetchTasksAsync = createAsyncThunk("tasks/fetch", async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
});

// ADD TASK
export const addTaskAsync = createAsyncThunk("tasks/add", async (task) => {
  const token = localStorage.getItem("token");

  const payload = {
    name: task.name,
    project: task.project,
    team: task.team,
    owners: task.owners,
    timeToComplete: task.timeToComplete,
    priority: task.priority || "Medium",
    status: task.status || "To Do",
    // FIX: Ensure tags is a proper array
    tags: Array.isArray(task.tags)
      ? task.tags.map((t) => t.toString().trim())
      : [],
  };

  const res = await axios.post(API_URL, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
});

// UPDATE TASK
export const updateTaskAsync = createAsyncThunk(
  "tasks/update",
  async ({ id, ...task }) => {
    const token = localStorage.getItem("token");

    const res = await axios.put(`${API_URL}/${id}`, task, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  }
);

// DELETE TASK
export const deleteTaskAsync = createAsyncThunk("tasks/delete", async (id) => {
  const token = localStorage.getItem("token");
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return id;
});

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasksAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.tasks = action.payload;
      })
      .addCase(fetchTasksAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(addTaskAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.tasks.push(action.payload);
      })
      .addCase(addTaskAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(updateTaskAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((t) =>
          t._id === action.payload._id ? action.payload : t
        );
      })
      .addCase(updateTaskAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(deleteTaskAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t._id !== action.payload);
      })
      .addCase(deleteTaskAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export default taskSlice.reducer;
