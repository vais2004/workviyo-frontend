import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProjectsAsync = createAsyncThunk(
  "projects/fetchProjectsAsync",
  async ({ projectStatus }) => {
    const queryParams = new URLSearchParams();
    const token = localStorage.getItem("token");

    if (projectStatus) queryParams.append("status", projectStatus || "");
    const response = await axios.get(
      `https://workviyo.vercel.app/projects?${queryParams.toString()}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    const data = response.data.project;
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
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    const data = response.data;
    console.log(response);
    return data;
  }
);

export const updateProjectAsync = createAsyncThunk(
  "project/updateProjectAsync",
  async ({ id, name, description, status }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://workviyo.vercel.app/projects/${id}`,
        { name, description, status },
        { headers: { Authorization: `${token}` } }
      );

      const data = response.data;
      console.log(data, "updated project data");
      return data;
    } catch (error) {
      console.log("Error: ", error);
    }
  }
);

export const deleteProjectAsync = createAsyncThunk(
  "project/deleteProjectAsync",
  async ({ id }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `https://workviyo.vercel.app/projects/${id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const data = response.data;
      console.log(data, "deleted Project data");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
