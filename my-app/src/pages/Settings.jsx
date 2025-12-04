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
              <span className="fw-bold fs-2 heading-color">Settings</span>
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
                            data-bs-target="#addNewProject"
                            data-bs-whatever="@mdo">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-pencil"
                              viewBox="0 0 16 16">
                              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                            </svg>{" "}
                            Edit
                          </button>

                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDeleteProject(project._id)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-trash"
                              viewBox="0 0 16 16">
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                            </svg>
                            delete
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="addNewProject"
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
                            data-bs-target="#exampleModal"
                            data-bs-whatever="@mdo">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-pencil"
                              viewBox="0 0 16 16">
                              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                            </svg>{" "}
                            Edit
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDeleteTeam(team._id)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-trash"
                              viewBox="0 0 16 16">
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                            </svg>
                            delete
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="exampleModal"
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
                              data-bs-dismiss="modal"
                              aria-label="Close"></button>
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
                            data-bs-target="#addNewTask"
                            data-bs-whatever="@mdo">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-pencil"
                              viewBox="0 0 16 16">
                              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                            </svg>{" "}
                            Edit
                          </button>

                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDeleteTask(task._id)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-trash"
                              viewBox="0 0 16 16">
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                            </svg>
                            delete
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="addNewTask"
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
