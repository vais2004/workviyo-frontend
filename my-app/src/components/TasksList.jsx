import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksAsync } from "../features/taskSlice";
import toast, { Toaster } from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";
import AddTask from "../pages/AddTask";

export default function TasksList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.tasks);

  const taskStatus = searchParams.get("taskStatus") || "";
  return (
    <div className="row">
      <div className="col-md-1">
        <h3>Tasks</h3>
      </div>
      <div className="col-md-5">
        <select className="form-select mb-3" >
          <option value=""></option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="To Do">To Do</option>
          <option value="Blocked">Blocked</option>
        </select>
      </div>
    </div>
  );
}
