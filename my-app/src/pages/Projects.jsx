import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchProjectsAsync } from "../features/projectSlice";
import { fetchTasksAsync } from "../features/taskSlice";
import SideNav from "../components/SideNav";
import AddTask from "../pages/AddTask";

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { projectId } = useParams();
  const dispatch = useDispatch();

  const { projects = [] } = useSelector((state) => state.projects);
  const { tasks = [], status } = useSelector((state) => state.tasks);

  const taskStatus = searchParams.get("taskStatus") || "";
  const prioritySort = searchParams.get("prioritySort") || "";
  const dateSort = searchParams.get("dateSort") || "";
  const [selectedProject, setSelectedProject] = useState("");

  useEffect(() => {
    dispatch(fetchProjectsAsync());
  }, []);

  useEffect(() => {
    dispatch(fetchTasksAsync());
  }, []);

  useEffect(() => {
    if (projectId) {
      setSelectedProject(projectId);
    }
  }, [projectId]);

  const taskFilters = (key, value) => {
    const newParams = new URLSearchParams(searchParams);

    if (key === "prioritySort") {
      newParams.delete("dateSort");
    }

    if (key === "dateSort") {
      newParams.delete("prioritySort");
    }

    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    setSearchParams(newParams);
  };

  const filterByStatus = (value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("taskStatus", value);
    } else {
      newParams.delete("taskStatus");
    }
    setSearchParams(newParams);
  };

  const projectData = projectId
    ? projects.find((project) => project._id === projectId)
    : null;

  const tasksFromProject = selectedProject
    ? tasks.filter(
        (task) => task.project && task.project._id === selectedProject
      )
    : tasks;

  console.log("Project ID:", projectId);
  console.log("Task project:", tasks[0]?.project);
  console.log("URL Project ID:", projectId);

  const priorityOrder = {
    Low: 1,
    Medium: 2,
    High: 3,
  };

  let filteredTasks = [...tasksFromProject];

  // status filter
  if (taskStatus) {
    filteredTasks = filteredTasks.filter((task) => task.status === taskStatus);
  }

  // priority sort
  if (prioritySort === "Low-High") {
    filteredTasks.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  }

  if (prioritySort === "High-Low") {
    filteredTasks.sort(
      (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
    );
  }

  // date sort
  if (dateSort === "Newest-Oldest") {
    filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  if (dateSort === "Oldest-Newest") {
    filteredTasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }

  const isAnyFilterApplied =
    taskStatus || prioritySort || dateSort || selectedProject;

  const dueDate = (createdAt, timeToComplete) => {
    const created = new Date(createdAt);
    const due = new Date(created);
    due.setDate(due.getDate() + Number(timeToComplete));
    return due;
  };

  const isOverdue = (task) => {
    return new Date() > dueDate(task.createdAt, task.timeToComplete);
  };

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

          <section className="pb-2 px-2">
            <span className="fw-bold fs-2 heading-color">
              {projectData?.name || "Projects view"}
            </span>

            <p>
              <small style={{ color: "#999898ff" }}>
                {projectData?.description ||
                  "Displaying: tasks, owners, priority, due dates,status"}
              </small>
            </p>
            <hr />
          </section>

          <section className="row pb-3 px-1">
            <span className="col-auto mb-1">
              <button
                className="btn border "
                onClick={() => taskFilters("prioritySort", "Low-High")}>
                Low-High Priority
              </button>
            </span>
            <span className="col-auto mb-1">
              <button
                className="btn border "
                onClick={() => taskFilters("prioritySort", "High-Low")}>
                High-Low Priority
              </button>
            </span>
            <span className="col-auto mb-1">
              <button
                className="btn border "
                onClick={() => taskFilters("dateSort", "Newest-Oldest")}>
                Newest First
              </button>
            </span>
            <span className="col-auto mb-1">
              <button
                className="btn border "
                onClick={() => taskFilters("dateSort", "Oldest-Newest")}>
                Oldest First
              </button>
            </span>
            <span className="col-auto mb-1">
              <select
                value={taskStatus}
                onChange={(e) => filterByStatus(e.target.value)}
                className="form-select">
                <option value="">---Filter by Status---</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="To Do">To Do</option>
                <option value="Blocked">Blocked</option>
              </select>
            </span>
            <span className="col-auto mb-1">
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="form-select">
                <option value="">All Projects</option>
                {projects.map((p) => (
                  <option value={p._id} key={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </span>
            <span className="col-auto mb-1">
              <button
                type="button"
                className="btn btn-outline-primary mt-1"
                data-bs-toggle="modal"
                data-bs-target="#addNewTask"
                data-bs-whatever="@mdo">
                + New Task
              </button>
            </span>
          </section>

          <section className="pb-3 pe-2">
            <table className="table">
              <thead>
                <tr>
                  <th className="table-light" scope="col">
                    Tasks
                  </th>
                  <th className="table-light" scope="col">
                    Owners
                  </th>
                  <th className="table-light" scope="col">
                    Priority
                  </th>
                  <th className="table-light" scope="col">
                    Created On
                  </th>
                  <th className="table-light" scope="col">
                    Due On
                  </th>
                  <th className="table-light" scope="col">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* {filteredTasks
                  ? Array.isArray(filteredTasks) &&
                    filteredTasks.map((task, index) => (*/}
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task, index) => (
                    <tr key={index}>
                      <th scope="row container">{task.name}</th>

                      <td>
                        {task.owners.map((owner, index) => (
                          <span
                            key={index}
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
                            }}>
                            {owner.name.charAt(0)}
                          </span>
                        ))}
                      </td>

                      <td>
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
                      </td>

                      <td>{new Date(task.createdAt).toLocaleDateString()}</td>

                      <td>
                        <span
                          className={
                            isOverdue(task) ? "text-danger fw-bold" : ""
                          }>
                          {dueDate(
                            task.createdAt,
                            task.timeToComplete
                          ).toLocaleDateString()}
                        </span>
                      </td>

                      <td>
                        <p className="d-grid gap-2 col-6 mx-auto text-center">
                          <span
                            className={
                              task.status === "Completed"
                                ? "bg-primary-subtle text-success-emphasis rounded fw-normal "
                                : task.status === "Blocked"
                                ? "bg-danger-subtle text-danger-emphasis rounded fw-normal "
                                : task.status === "In Progress"
                                ? "bg-info-subtle text-info-emphasis fw-normal "
                                : "bg-warning-subtle text-warning-emphasis fw-normal "
                            }>
                            {task.status}
                          </span>
                        </p>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      {isAnyFilterApplied
                        ? "No tasks found for the selected filters."
                        : "No tasks available."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div>
              {(status === "idle" || status === "loading") && (
                <div className="alert alert-info text-center mt-3">
                  Loading tasks...
                </div>
              )}

              {status !== "loading" && tasks?.length === 0 && (
                <p className="text-muted mt-2">
                  Currently, there are no tasks assigned.
                </p>
              )}
            </div>
          </section>

          <div
            className="modal fade"
            id="addNewTask"
            tabIndex="-1"
            aria-labelledby="taskModelLabel"
            aria-hidden="true">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <AddTask />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
