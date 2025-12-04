import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProjectAsync, updateProjectAsync } from "../features/projectSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddProject() {
  const { projectId } = useParams();
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("projectId from params:", projectId);

  const { projects } = useSelector((state) => state.projects);

  const projectExist =
    projectId && projects?.length > 0
      ? projects?.find((project) => project._id === projectId)
      : null;

  const existing = Boolean(projectExist);

  useEffect(() => {
    if (existing) {
      setProjectName(projectExist.name || "");
      setProjectDescription(projectExist.description || "");
      setStatus(projectExist.status || "");
    }
  }, [projectExist, existing]);

  const handleAddProject = (e) => {
    e.preventDefault();
    if (existing && projectId) {
      dispatch(
        updateProjectAsync({
          id: projectId,
          name: projectName,
          description: projectDescription,
          status: status,
        })
      );
      toast.success("Project Updated Successfullt!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } else {
      dispatch(
        addProjectAsync({
          name: projectName,
          description: projectDescription,
          status: status,
        })
      );
      toast.success("Project Created Successfullt!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="projectModelLabel">
            {existing ? "Edit Project" : "Create New Project"}
          </h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <ToastContainer />
          <form onSubmit={handleAddProject}>
            <div className="mb-3">
              <label htmlFor="name" className="col-form-label">
                Project Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Project Name"
                value={existing ? projectName : ""}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="description" className="col-form-label">
                Project Description
              </label>
              <textarea
                className="form-control"
                placeholder="Enter Project Description"
                onChange={(e) => setProjectDescription(e.target.value)}
                value={existing ? projectDescription : ""}></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="status" className="col-form-label">
                Status
              </label>
              <select
                className="form-select"
                value={existing ? status : ""}
                onChange={(e) => setStatus(e.target.value)}>
                <option value="">---select---</option>
                <option value="To Do">To Do</option>
                <option value="Completed">Completed</option>
                <option value="Blocked">Blocked</option>
                <option value="In Progress">In Progress</option>
              </select>
            </div>
            <div>
              <button
                className="btn btn-outline-primary mx-1 float end"
                type="submit">
                {existing ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
