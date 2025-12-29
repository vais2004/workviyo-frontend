import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTasksAsync } from "../features/taskSlice";
import SideNav from "../components/SideNav";

export default function TaskDetails() {
  const { taskId } = useParams();
  const dispatch = useDispatch();

  const { tasks, status } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (!tasks || tasks.length === 0) {
      dispatch(fetchTasksAsync({}));
    }
  }, []);

  const task = tasks?.find((t) => t._id === taskId);

  const dueDate = (createdAt, timeToComplete) => {
    const created = new Date(createdAt);
    const due = new Date(created);
    due.setDate(due.getDate() + Number(timeToComplete));
    return due.toLocaleDateString();
  };

  if (status === "Loading") {
    return <div className="alert alert-info text-center">Loading task...</div>;
  }

  if (!task) {
    return (
      <div className="alert alert-warning text-center">Task not found</div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="mobileSidebar"
          aria-labelledby="mobileSidebarLabel"
          style={{ width: "250px" }}>
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"></button>
          </div>
          <div className="offcanvas-body p-0">
            <SideNav />
          </div>
        </div>

        <div
          className="col-12 col-md-3 col-lg-2 d-none d-md-block p-0"
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflowY: "auto",
          }}>
          <SideNav />
        </div>
        <div className="col-12 col-md-9 col-lg-10 p-4">
          <button
            className="btn btn-outline-primary d-md-none mb-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileSidebar"
            aria-controls="mobileSidebar">
            <i className="bi bi-list"></i>
          </button>
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h3 className="mb-3">{task.name}</h3>

              <p>
                <strong>Project:</strong> {task.project?.name || "N/A"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`rounded-pill  fw-normal px-3 py-1  ${
                    task.status === "Completed"
                      ? "bg-primary-subtle text-success-emphasis rounded fw-normal "
                      : task.status === "Blocked"
                      ? "bg-danger-subtle text-danger-emphasis rounded fw-normal "
                      : task.status === "In Progress"
                      ? "bg-info-subtle text-info-emphasis fw-normal "
                      : "bg-warning-subtle text-warning-emphasis fw-normal "
                  }`}>
                  {task.status}
                </span>
              </p>

              <p>
                <strong>Priority:</strong>{" "}
                <span
                  style={{
                    backgroundColor:
                      task.priority === "High"
                        ? "#e6d1fcff"
                        : task.priority === "Medium"
                        ? "#d3ecfcff"
                        : "#dbdee2ff",
                  }}
                  className="rounded-pill fw-normal px-3 py-1 ">
                  {task.priority}
                </span>
              </p>

              <p>
                <strong>Time to Complete:</strong> {task.timeToComplete} days
              </p>

              <p>
                <strong>Created On:</strong>{" "}
                {new Date(task.createdAt).toLocaleDateString()}
              </p>

              <p>
                <strong>Due Date:</strong>{" "}
                {dueDate(task.createdAt, task.timeToComplete)}
              </p>

              <hr />

              <p className="mb-1">
                <strong>Owners:</strong>
              </p>
              {task.owners?.map((owner, index) => (
                <span
                  key={index}
                  className=" rounded-pill px-3 py-1 me-2"
                  style={{ backgroundColor: "antiquewhite", color: "brown" }}>
                  {owner.name}
                </span>
              ))}

              <hr />

              <p className="mb-1">
                <strong>Tags:</strong>
              </p>
              {task.tags?.length > 0 ? (
                task.tags.map((tag, index) => (
                  <span
                    style={{ backgroundColor: "#fcc7eeff" }}
                    key={index}
                    className="rounded-pill px-2 pb-1 me-2">
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-muted">No tags</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
