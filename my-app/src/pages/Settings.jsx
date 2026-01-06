import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProjectAsync,
  fetchProjectsAsync,
} from "../features/projectSlice";
import { deleteTeamAsync, fetchTeamsAsync } from "../features/teamSlice";
import { deleteTaskAsync, fetchTasksAsync } from "../features/taskSlice";
import { useNavigate } from "react-router-dom";
import SideNav from "../components/SideNav";
import AddProject from "../pages/AddProject";
import AddTask from "../pages/AddTask";
import AddTeam from "../pages/AddTeam";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
<ToastContainer />;

export default function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects, status } = useSelector((state) => state.projects);
  const { teams, status: teamStatus } = useSelector((state) => state.teams);
  const { tasks, status: taskStatus } = useSelector((state) => state.tasks);

  const projectStatus = "";

  useEffect(() => {
    dispatch(fetchProjectsAsync({ projectStatus }));
  }, [projectStatus]);

  useEffect(() => {
    dispatch(fetchTeamsAsync());
    dispatch(fetchTasksAsync());
  }, []);

  const handleDeleteProject = (id) => {
    dispatch(deleteProjectAsync({ id }))
      .unwrap()
      .then(() => {
        toast.success("Project Deleted Successfully!");
      })
      .catch(() => {
        toast.error("Failed to delete project!");
      });
  };

  const handleDeleteTeam = (id) => {
    dispatch(deleteTeamAsync({ id }))
      .unwrap()
      .then(() => {
        toast.success("Team Deleted Successfully!");
      })
      .catch(() => {
        toast.error("Failed to delete team!");
      });
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTaskAsync(id))
      .unwrap()
      .then(() => {
        toast.success("Task Deleted Successfully!");
      })
      .catch(() => {
        toast.error("Failed to delete task!");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("Login token");
    navigate("/");
  };

  return (
    <div className="container-fluid">
      <ToastContainer position="top-right" className="mt-5" autoClose={3000} />
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
          <section className="pb-3 px-2">
            <div className="py-1">
              <span className="fs-1 heading-color">Settings</span>

              <button
                className="btn btn-danger float-end mt-2 me-2"
                onClick={handleLogout}>
                Signout
              </button>
            </div>
          </section>

          <section className="pb-3 px-2">
            <span className="fw-normal fs-3">Projects</span>
            {(status === "idle" || status === "loading") && (
              <div className="alert alert-info text-center mt-3">
                Loading projects...
              </div>
            )}

            <ul className="list-group mt-3">
              {status !== "loading" && projects?.length === 0 && (
                <p className="text-muted mt-2">
                  There are no projects at this time.
                </p>
              )}

              {projects?.length > 0 &&
                projects.map((project) => (
                  <li
                    key={project._id}
                    className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{project.name}</span>

                    <div>
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm me-2"
                        data-bs-toggle="modal"
                        data-bs-target={`#addNewProject-${project._id}`}>
                        Edit
                      </button>

                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDeleteProject(project._id)}>
                        Delete
                      </button>
                    </div>

                    <div
                      className="modal fade"
                      id={`addNewProject-${project._id}`}
                      tabIndex="-1"
                      aria-hidden="true">
                      <AddProject projectId={project._id} />
                    </div>
                  </li>
                ))}
            </ul>
          </section>

          <section className="pb-4 px-2">
            <span className="fw-normal fs-3">Teams</span>
            {(teamStatus === "idle" || teamStatus === "loading") && (
              <div className="alert alert-info text-center mt-3">
                Loading teams...
              </div>
            )}

            <ul className="list-group mt-3">
              {teamStatus !== "loading" && teams?.length === 0 && (
                <p className="text-muted mt-2">
                  No teams have been created yet.
                </p>
              )}

              {teams?.length > 0 &&
                teams.map((team) => (
                  <li
                    key={team._id}
                    className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{team.name}</span>

                    <div>
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm me-2"
                        data-bs-toggle="modal"
                        data-bs-target={`#addNewTeam-${team._id}`}>
                        Edit
                      </button>

                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDeleteTeam(team._id)}>
                        Delete
                      </button>
                    </div>

                    <div
                      className="modal fade"
                      id={`addNewTeam-${team._id}`}
                      tabIndex="-1"
                      aria-hidden="true">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1 className="modal-title fs-5">Edit Team</h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"></button>
                          </div>
                          <AddTeam teamId={team._id} />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </section>

          <section className="pb-3 px-2">
            <span className="fw-normal fs-3">Tasks</span>
            {(taskStatus === "idle" || taskStatus === "loading") && (
              <div className="alert alert-info text-center mt-3">
                Loading tasks...
              </div>
            )}

            <ul className="list-group mt-3">
              {taskStatus !== "loading" && tasks?.length === 0 && (
                <p className="text-muted mt-2">
                  Currently, there are no tasks assigned.
                </p>
              )}

              {tasks?.length > 0 &&
                tasks.map((task) => (
                  <li
                    key={task._id}
                    className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{task.name}</span>

                    <div>
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm me-2"
                        data-bs-toggle="modal"
                        data-bs-target={`#addNewTask-${task._id}`}>
                        Edit
                      </button>

                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDeleteTask(task._id)}>
                        Delete
                      </button>
                    </div>

                    <div
                      className="modal fade"
                      id={`addNewTask-${task._id}`}
                      tabIndex="-1"
                      aria-hidden="true">
                      <AddTask taskId={task._id} />
                    </div>
                  </li>
                ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
