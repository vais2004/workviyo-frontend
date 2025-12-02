import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeamsAsync } from "../features/teamSlice";
import SideNav from "../components/SideNav";
import AddTeam from "./AddTeam";

export default function Teams() {
  const dispatch = useDispatch();
  const { teams, status, error } = useSelector((state) => state.teams);

  useEffect(() => {
    dispatch(fetchTeamsAsync());
  }, []);
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
      </div>
    </div>
  );
}
