import React, { useEffect } from "react";
import SideNav from "../components/SideNav";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksAsync } from "../features/taskSlice";
import { fetchProjectsAsync } from "../features/projectSlice";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();

  const { tasks, status: taskStatus } = useSelector((state) => state.tasks);
  const { projects } = useSelector((state) => state.projects);

  // fetch data
  useEffect(() => {
    dispatch(fetchTasksAsync());
    dispatch(fetchProjectsAsync({}));
  }, [dispatch]);

  // find project
  const project = projects.find((p) => String(p._id) === String(projectId));

  // filter tasks by project
  const projectTasks = tasks.filter(
    (task) => task.project && String(task.project._id) === String(projectId)
  );

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
          {project ? (
            <div className=" mb-4">
              <div>
                <h3>{project.name}</h3>
                <p className="text-muted">Description: {project.description}</p>

                <span
                  className="rounded-pill fw-normal px-4 py-1"
                  style={{
                    backgroundColor:
                      project.status === "Blocked"
                        ? "#f7cce1ff"
                        : project.status === "Completed"
                        ? "#c1f9b7ff"
                        : project.status === "To Do"
                        ? "#f5cdb9ff"
                        : "#aeedcfff",
                  }}>
                  {project.status}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-muted">Project not found</p>
          )}

          {/* TASKS */}
          <h3 className="mb-3">Tasks</h3>
          <hr />
          {taskStatus === "Loading" && (
            <p className="text-primary">Loading tasks...</p>
          )}

          {projectTasks.length === 0 ? (
            <p className="text-muted">No tasks for this project</p>
          ) : (
            <div className="row">
              {projectTasks.map((task) => (
                <div className="col-md-4 mb-3" key={task._id}>
                  <div className="card h-100 border-1">
                    <div className="card-body">
                      <h5 className="card-title mb-3">{task.name}</h5>
                      <div>
                        <hr />
                      </div>
                      <p className="mb-3">
                        <span
                          className={`rounded-pill fw-normal px-3 py-1  ${
                            task.status === "Blocked"
                              ? "text-bg-danger"
                              : task.status === "Completed"
                              ? "text-bg-primary"
                              : task.status === "To Do"
                              ? "text-bg-warning"
                              : "text-bg-info"
                          }`}>
                          <strong>Status:</strong> {task.status}
                        </span>
                      </p>

                      <p className="mb-3">
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
                          {" "}
                          <strong>Priority:</strong> {task.priority}
                        </span>
                      </p>

                      <p className="mb-0">
                        <span
                          style={{ backgroundColor: "#fec590ff" }}
                          className="rounded-pill fw-normal px-3 py-1 ">
                          {" "}
                          <strong>Time:</strong> {task.timeToComplete} days
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
