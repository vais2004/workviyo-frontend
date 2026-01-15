import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksAsync } from "../features/taskSlice";
import { Link } from "react-router-dom";
import AddTask from "../pages/AddTask";

export default function TasksList() {
  const dispatch = useDispatch();
  const { tasks = [], status: taskStatus } = useSelector(
    (state) => state.tasks
  );
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    dispatch(fetchTasksAsync());
  }, [dispatch]);

  const filteredTasks = tasks?.filter((task) => {
    const matchesStatus = statusFilter ? task.status === statusFilter : true;
    const matchesSearch = task.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="container-fluid">
      <div className="row mb-3 align-items-center">
        <div className="col-md-3">
          <h3>Tasks</h3>
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">---Filter Tasks By Status---</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="To Do">To Do</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>
        <div className="col-md-3 ms-auto pt-5">
          <button
            type="button"
            className="btn btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#addNewTask">
            + New Task
          </button>

          <div
            className="modal fade"
            id="addNewTask"
            tabIndex="-1"
            aria-hidden="true">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <AddTask />{" "}
              </div>
            </div>
          </div>
        </div>
      </div>

      {(taskStatus === "idle" || taskStatus === "loading") && (
        <div className="alert alert-info text-center">Loading tasks...</div>
      )}

      {taskStatus !== "loading" && filteredTasks?.length === 0 && (
        <p className="text-center text-muted mt-3">No tasks found</p>
      )}

      <div className="row">
        {filteredTasks?.map((task, index) => (
          <div
            key={index}
            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 d-flex align-items-stretch">
            <Link
              to={`/tasks/${task._id}`}
              className="text-decoration-none w-100">
              <div
                className="card pt-5 p-3 bg-light border-0 position-relative h-100"
                style={{ minHeight: "200px" }}>
                <h5 className="mb-3">{task.name}</h5>
                <p>Time to Complete: {task.timeToComplete}</p>
                <p>
                  Owners:{" "}
                  {task.owners.map((owner, idx) => (
                    <span className="col-md-4" key={idx}>
                      <span
                        className="d-inline-flex align-items-center justify-content-center border rounded-pill px-3 me-n2"
                        style={{
                          backgroundColor: "antiquewhite",
                          minWidth: "80px",
                          height: "30px",
                        }}>
                        {owner.name}
                      </span>
                    </span>
                  ))}
                </p>
                <p>Team: {task.team?.name || "-"}</p>

                <div className="card-img-overlay p-1 position-absolute top-0 end-0">
                  <span
                    className={`d-inline-block px-3 rounded ${
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
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
