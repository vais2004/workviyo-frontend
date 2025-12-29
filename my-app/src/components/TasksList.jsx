import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksAsync } from "../features/taskSlice";
import { Link, useSearchParams } from "react-router-dom";
import AddTask from "../pages/AddTask";

export default function TasksList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.tasks);
  const [search, setSearch] = useState("");

  const taskStatus = searchParams.get("taskStatus") || "";

  useEffect(() => {
    dispatch(fetchTasksAsync({ taskStatus }));
  }, [taskStatus]);

  const handleFilterByStatus = (value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("taskStatus", value);
    } else {
      newParams.delete("taskStatus");
    }
    setSearchParams(newParams);
  };

  const findTaskByQuery =
    search === ""
      ? tasks
      : tasks?.filter((task) =>
          task?.name.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <div className="row">
      <div className="col-md-1">
        <h3>Tasks</h3>
      </div>
      <div className="col-md-5">
        <select
          className="form-select mb-3"
          onChange={(e) => handleFilterByStatus(e.target.value)}>
          <option value="">---Filter Tasks By Status---</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="To Do">To Do</option>
          <option value="Blocked">Blocked</option>
        </select>
      </div>
      <div className="col-md-3">
        <button
          type="button"
          className="btn btn-outline-primary float-end ms-auto me-2"
          data-bs-toggle="modal"
          data-bs-target="#addNewTask"
          data-bs-whatever="@mdo">
          + New Task
        </button>
      </div>

      <div className="row">
        {error && (
          <p className="text-center p-3 mb-2 bg-warning-subtle text-info-emphasis fw-normal">
            {error}
          </p>
        )}
        {status === "Loading" && (
          <p className="text-center p-3 mb-2 bg-primary-subtle text-info-emphasis fw-normal">
            Loading...
          </p>
        )}

        {findTaskByQuery?.length > 0 &&
          findTaskByQuery.map((task, index) => (
            <div className="col-md-4 py-2" key={index}>
              <Link to={`/tasks/${task._id}`} className="text-decoration-none">
                <div
                  className="card pt-5 p-3 bg-light border-0"
                  style={{ width: "330px", height: "200px" }}>
                  <h5 className="mb-3">{task.name}</h5>
                  <p>Time to Complete: {task.timeToComplete}</p>
                  <p>
                    Owners:
                    {task.owners.map((owner, idx) => (
                      <span className="col-md-4" key={idx}>
                        <span
                          className="d-inline-flex align-items-center justify-content-center border rounded-pill px-3 me-n2"
                          style={{
                            backgroundColor: "antiquewhite",
                            minWidth: "80px",
                            height: "30px",
                          }}>
                          {owner.name} {/* <- owner name */}
                        </span>
                      </span>
                    ))}
                  </p>
                  <p>Team: {task.team?.name}</p>
                  <div className="card-img-overlay p-1">
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
