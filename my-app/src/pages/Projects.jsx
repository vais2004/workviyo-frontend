import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchProjectsAsync } from "../features/projectSlice";
import { fetchTasksAsync } from "../features/taskSlice";
import SideNav from "../components/SideNav";
import AddTask from "../pages/AddTask";

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const projectId = useParams();
  const dispatch = useDispatch();

  const { projects } = useSelector((state) => state.projects);
  const { tasks } = useSelector((state) => state.tasks);

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

  const projectData = projects?.find(
    (project) => project._id === projectId.projectId
  );

  const tasksFromProject = projectData
    ? tasks.filter((task) => task.project.name === projectData?.name)
    : tasks;

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
              {projectData?.description ||
                "Displaying: tasks, owners, priority, due dates,status"}
            </p>
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
          </section>
        </div>
      </div>
    </div>
  );
}
