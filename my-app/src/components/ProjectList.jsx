import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectsAsync } from "../features/projectSlice";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AddProject from "../pages/AddProject";

export default function ProjectList({ search }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const { projects, status } = useSelector((state) => state.projects);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded._id || decoded.id);
      } catch (error) {
        navigate("/login");
      }
    }
  }, [navigate, token]);

  useEffect(() => {
    dispatch(fetchProjectsAsync());
  }, [dispatch]);

  const projectStatus = searchParams.get("projectStatus") || "";

  const filterByStatus = (value) => {
    const newParams = new URLSearchParams(searchParams);
    value
      ? newParams.set("projectStatus", value)
      : newParams.delete("projectStatus");
    setSearchParams(newParams);
  };

  const filteredProjects = projects
    ?.filter((project) =>
      projectStatus ? project.status === projectStatus : true
    )
    ?.filter((project) =>
      search ? project.name.toLowerCase().includes(search.toLowerCase()) : true
    );

  return (
    <div className="row py-3">
      <div className="col-md-1">
        <h3>Projects</h3>
      </div>

      <div className="col-md-8 mb-2">
        <select
          style={{ width: "150ps" }}
          onChange={(e) => filterByStatus(e.target.value)}
          value={projectStatus}
          className="form-select mx-3">
          <option value="">---Filter Projects By Status---</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="To Do">To Do</option>
          <option value="Blocked">Blocked</option>
        </select>
      </div>

      <div className="col-md-3 mb-2">
        <button
          type="button"
          className="btn btn-outline-primary float-end ms-auto me-2"
          data-bs-toggle="modal"
          data-bs-target="#addNewProject">
          + New Project
        </button>
      </div>

      <div className="row">
        {status === "Loading" && (
          <p className="text-center p-3 mb-2 bg-primary-subtle text-info-emphasis">
            Loading...
          </p>
        )}

        {filteredProjects?.length > 0 &&
          filteredProjects.map((project) => (
            <div className="col-md-4 py-3" key={project._id}>
              <Link
                to={`/projectDetails/${project._id}`}
                style={{ textDecoration: "none", color: "inherit" }}>
                <div className="card pt-5 p-3 bg-light border-0 position-relative">
                  <span
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      backgroundColor:
                        project.status === "Blocked"
                          ? "#f7cce1ff"
                          : project.status === "Completed"
                          ? "#c1f9b7ff"
                          : project.status === "To Do"
                          ? "#f5cdb9ff"
                          : "#aeedcfff",
                      padding: "4px 10px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "500",
                    }}>
                    {project.status}
                  </span>

                  <h5>{project.name}</h5>
                  <p>Description: {project.description}</p>
                </div>
              </Link>
            </div>
          ))}

        <div
          className="modal fade"
          id="addNewProject"
          tabIndex="-1"
          aria-hidden="true">
          <AddProject />
        </div>
      </div>
    </div>
  );
}
