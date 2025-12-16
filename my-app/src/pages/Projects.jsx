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
  const { tasks = [] } = useSelector((state) => state.tasks);

  const taskStatus = searchParams.get("taskStatus") || "";
  const prioritySort = searchParams.get("prioritySort") || "";
  const dateSort = searchParams.get("dateSort") || "";

  useEffect(() => {
    dispatch(fetchProjectsAsync());
  }, []);

  useEffect(() => {
    dispatch(fetchTasksAsync({ taskStatus, prioritySort, dateSort }));
  }, [taskStatus, prioritySort, dateSort]);

  const taskFilters = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
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

  const projectData = projects.find((project) => project._id === projectId);

  const tasksFromProject = projectData
    ? tasks.filter((task) => task.project?.name === projectData?.name)
    : Array.isArray(tasks)
    ? tasks
    : [];

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

            <p className="text-muted">
              {projectData?.description ||
                "Displaying: tasks, owners, priority, due dates,status"}
            </p>
            <hr/>
          </section>
          <section className="row pb-3 px-1">
            <span className="col-auto">
              <button
                className="btn border "
                onClick={() => taskFilters("prioritySort", "Low-High")}>
                Low-High Priority
              </button>
            </span>
            <span className="col-auto">
              <button
                className="btn border "
                onClick={() => taskFilters("prioritySort", "High-Low")}>
                High-Low Priority
              </button>
            </span>
            <span className="col-auto">
              <button
                className="btn border "
                onClick={() => taskFilters("dateSort", "Newest-Oldest")}>
                Newest First
              </button>
            </span>
            <span className="col-auto">
              <button
                className="btn border "
                onClick={() => taskFilters("dateSort", "Oldest-Newest")}>
                Oldest First
              </button>
            </span>
            <span className="col-auto  ">
              <select
                value={taskStatus}
                onChange={(e) => filterByStatus(e.target.value)}
                className="form-select mt-1 ">
                <option value="">Filter</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="To Do">To Do</option>
                <option value="Blocked">Blocked</option>
              </select>
            </span>
            <span className="col-auto  ">
              <button
                type="button"
                className="btn btn-primary mt-1"
                data-bs-toggle="modal"
                data-bs-target="#addNewTask"
                data-bs-whatever="@mdo">
                + New Task
              </button>
            </span>
          </section>

          <section className="pb-3 pe-2">
            <table className="table border rounded-2">
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
                    Due On
                  </th>
                  <th className="table-light" scope="col">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasksFromProject
                  ? Array.isArray(tasksFromProject) &&
                    tasksFromProject.map((task, index) => (
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
                        <td>{task?.createdAt.split("T").slice(0, 1)}</td>
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
                  : ""}
              </tbody>
            </table>
          </section>
          <div
            className="modal fade"
            id="addNewTask"
            tabIndex="-1"
            aria-labelledby="taskModelLabel"
            aria-hidden="true">
            <AddTask />
          </div>
        </div>
      </div>
    </div>
  );
}
