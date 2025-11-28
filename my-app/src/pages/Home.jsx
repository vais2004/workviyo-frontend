import React, { useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import ProjectsList from "../components/ProjectList";
import TasksList from "../components/TasksList";

export default function Home() {
  const [search, setSearch] = useState("");
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
              aria-label="Close">
              Close
            </button>
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
          <section className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              aria-describedby="inputGroup"
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="input-group-text" id="inputGroup">
              <i className="bi bi-search"></i>
            </span>
          </section>
          <section>
            <ProjectsList search={search} />
          </section>
          <section>
            <TasksList search={search} />
          </section>
        </div>
      </div>
    </div>
  );
}
