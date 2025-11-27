import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectsAsync } from "../features/projectSlice";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AddProject from "../Pages/AddProject";

export default function ProjectList({ search }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { projects, status } = useSelector((state) => state.projects);

  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded JWT:", decoded);
        setUserId(decoded._id || decoded.id);
      } catch (error) {
        console.error("Error decoding JWT token:", error);
        //toast.error("Invalid session. Please log in again.")
        navigate("/login");
      }
    }
  }, [navigate]);

  const projectStatus = searchParams.get("projectStatus") || "";

  useEffect(() => {
    dispatch(fetchProjectsAsync({ projectStatus }));
  }, [projectStatus]);

  const filterByStatus = (value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("projectStatus", value);
    } else {
      newParams.delete("projectStatus");
    }
    setSearchParams(newParams);
  };

  const findProjectByQuery =
    search === ""
      ? projects
      : projects?.filter((project) =>
          project?.name.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <div className="row py-3">
      <div className="col-md-1">
        <h3>Projects</h3>
      </div>
      <div className="col-md-8">
        <select
          style={{ width: "150ps" }}
          onChange={(e) => filterByStatus(e.target.value)}
          value={projectStatus}
          className="form-select mx-3">
          <option value="">Filter</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="To Do">To Do</option>
          <option value="Blocked">Blocked</option>
        </select>
      </div>

      <div className="col-md-3">
        <button
          type="button"
          className="btn btn-primary float-end ms-auto me-2"
          data-bs-toggle="modal"
          data-bs-target="#addNewProject"
          data-bs-whatever="@mdo">
          + New Project
        </button>
      </div>

      <div className="row">
        {status === "Loading" && (
          <p className="text-center p-3 mb-2 bg-primary-subtle text-info-emphasis fw-normal ">
            Loading...
          </p>
        )}

        {findProjectByQuery?.length > 0 &&
          findProjectByQuery?.map((project) => (
            <div className="col-md-4 py-3" key={project._id}>
              <Link
                style={{ textDecoration: "none" }}
                to={`/projects/${project._id}`}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
