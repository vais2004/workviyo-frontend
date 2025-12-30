import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProjectAsync,
  fetchProjectsAsync,
} from "../features/projectSlice";
import { deleteTeamAsync, fetchTeamsAsync } from "../features/teamSlice";
import { deleteTaskAsync, fetchTasksAsync } from "../features/taskSlice";
import { Link, useNavigate } from "react-router-dom";
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
  const { projects } = useSelector((state) => {
    return state.projects;
  });
  const { teams } = useSelector((state) => state.teams);
  const { tasks } = useSelector((state) => state.tasks);

  const projectStatus = "";

  useEffect(() => {
    dispatch(fetchProjectsAsync({ projectStatus }));
  }, [projectStatus]);

  useEffect(() => {
    dispatch(fetchTeamsAsync());
    dispatch(fetchTasksAsync());
  }, []);

  const handleDeleteProject = (id) => {
    dispatch(deleteProjectAsync({ id }));
    toast.success("Project Deleted Successfully!");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handleDeleteTeam = (id) => {
    dispatch(deleteTeamAsync({ id }));
    toast.success("Team Deleted Successfully!");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTaskAsync({ id }));
    toast.success("Task Deleted Successfully!");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem("Login token");
    navigate("/");
  };

  return (
    <div className="container-fluid">
      <ToastContainer />
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

            <div className="row">
              {projects?.length > 0 &&
                projects?.map((project) => (
                  <div className="col-md-4 " key={project._id}>
                    <div className="card p-2 my-2">
                      <div className="row ">
                        <div className="col-md-6">
                          <span> {project.name}</span>
                        </div>
                        <div className="col-md-6">
                          <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target={`#addNewProject-${project._id}`}
                            data-bs-whatever="@mdo">
                            {" "}
                            Edit
                          </button>{" "}
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDeleteProject(project._id)}>
                            delete
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id={`addNewProject-${project._id}`}
                      tabIndex="-1"
                      aria-labelledby="projectModelLabel"
                      aria-hidden="true">
                      <AddProject projectId={project._id} />
                    </div>
                  </div>
                ))}
            </div>
          </section>

          <section className="pb-4 px-2">
            <span className="fw-normal fs-3">Teams</span>
            <div className="row">
              {teams?.length > 0 &&
                teams?.map((team) => (
                  <div className="col-md-4" key={team._id}>
                    <div className="card p-2 my-2">
                      <div className="row">
                        <div className="col-md-6">
                          <span>{team.name}</span>
                        </div>
                        <div className="col-md-6">
                          <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target={`#addNewTeam-${team._id}`}
                            data-bs-whatever="@mdo">
                            {" "}
                            Edit
                          </button>{" "}
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDeleteTeam(team._id)}>
                            delete
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id={`addNewTeam-${team._id}`}
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1
                              className="modal-title fs-5"
                              id="exampleModalLabel">
                              Create New Team
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"></button>
                          </div>
                          <AddTeam teamId={team._id} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>

          <section className="pb-3 px-2">
            <span className="fw-normal fs-3">Tasks</span>

            <div className="row">
              {tasks?.length > 0 &&
                tasks?.map((task) => (
                  <div className="col-md-4 " key={task._id}>
                    <div className="card p-2 my-2">
                      <div className="row ">
                        <div className="col-md-6">
                          <span>{task.name}</span>
                        </div>
                        <div className="col-md-6">
                          <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target={`#addNewTask-${task._id}`}
                            data-bs-whatever="@mdo">
                            {" "}
                            Edit
                          </button>{" "}
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDeleteTask(task._id)}>
                            delete
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id={`addNewTask-${task._id}`}
                      tabIndex="-1"
                      aria-labelledby="taskModelLabel"
                      aria-hidden="true">
                      <AddTask taskId={task._id} />
                    </div>
                  </div>
                ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
