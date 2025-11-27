import React from "react";
import { NavLink } from "react-router-dom";

export default function SideNav() {
  return (
    <div
      className="p-3 vh-100 d-flex flex-column align-items-center"
      style={{ width: "230px", backgroundColor: "#f3f0ff" }}>
      <h4>workviyo</h4>
      <ul className="nav flex-column py-3">
        <li className="nav-item">
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#6818F1" : "#a6a4a4",
            })}
            className="nav-link "
            to="/dashboard">
            <i className="bi bi-window-sidebar"></i> Dashboard
          </NavLink>
        </li>
        <li className="nav-item mt-2">
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#6818F1" : "#a6a4a4",
            })}
            className="nav-link "
            to="/projects">
            <BiCustomize /> Project
          </NavLink>
        </li>
        <li className="nav-item mt-2">
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#6818F1" : "#a6a4a4",
            })}
            className="nav-link "
            to="/teams">
            <i className="bi bi-people me-2"></i>Team
          </NavLink>
        </li>
        <li className="nav-item mt-2">
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#6818F1" : "#a6a4a4",
            })}
            className="nav-link "
            to="/reports">
            <FaRegChartBar /> Reports
          </NavLink>
        </li>
        <li className="nav-item mt-2">
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#6818F1" : "#a6a4a4",
            })}
            className="nav-link "
            to="/settings">
            <i className="bi bi-gear me-2"></i>Setting
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
