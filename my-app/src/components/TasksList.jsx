import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksAsync } from "../features/taskSlice";
//import toast, { Toaster } from "react-hot-toast";
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
        <select className="form-select mb-3">
          <option value=""></option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="To Do">To Do</option>
          <option value="Blocked">Blocked</option>
        </select>
      </div>
      <div className="col-md-3">
        <button
          type="button"
          className="btn btn-primary float-end ms-auto me-2"
          data-bs-toggle="modal"
          data-bs-target="#addNewTask"
          data-bs-whatever="@mdo">
          + New Task
        </button>
      </div>

      <div className="row">
        {error !== null && (
          <p className="text-center p-3 mb-2 bg-warning-subtle text-info-emphasis fw-normal">
            {error}
          </p>
        )}
        {status === "Loading" && (
          <p className="text-center p-3 mb-2 bg-primary-subtle text-info-emphasis fw-normal ">
            Loading...
          </p>
        )}

        {findTaskByQuery?.length > 0 &&
          findTaskByQuery?.map((task, index) => (
            <div className="col-md-4 py-2" key={index}>
              <div
                className="card pt-5 p-3 bg-light border-0"
                style={{ width: "330px", height: "200px" }}>
                <h5 className="mb-3">{task.name}</h5>
                <p>Due Date:{task.timeToComplete}</p>
                <p>
                  Owners:
                  {task.owners.map((owner, index) => (
                    <span className="col-md-1 " key={index}>
                      <span
                        style={{
                          display: "inline-block",
                          width: "30px",
                          height: "30px",
                          border: "1px solid white",
                          borderRadius: "50%",
                          textAlign: "center",
                          lineHeight: "30px",
                          backgroundColor: "antiquewhite",
                          color: "brown",
                          zIndex: 1,
                          paddingBottom: "8px",
                          marginRight: "-10px",
                        }}>
                        {owner.name.charAt(0)}
                      </span>{" "}
                    </span>
                  ))}
                </p>
                <p>Team:{task.team?.name}</p>
                <div className="card-img-overlay p-1">
                  <span
                    className={`d-inline-block px-2 rounded ${
                      task.status === "Blocked"
                        ? "text-bg-danger"
                        : task.status === "Completed"
                        ? "text-bg-primary"
                        : task.status === "To Do"
                        ? "text-bg-warning"
                        : "text-bg-info"
                    }`}
                    style={{ width: "fit-content", minWidth: "auto" }}>
                    {task.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        <div
          className="modal fade"
          id="addNewTask"
          tabIndex="-1"
          aria-labelledby="taskModelLabel">
          <AddTask />
        </div>
      </div>
    </div>
  );
}
