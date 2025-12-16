import React from "react";
import { NavLink } from "react-router-dom";
import { Link} from "react-router-dom";
import { BiCustomize } from "react-icons/bi";
import { FaRegChartBar } from "react-icons/fa";

export default function SideNav() {
  return (
    <div
      className="p-3 vh-100 d-flex flex-column align-items-center"
      style={{ width: "230px", backgroundColor: "#e9f5faff" }}>
      <Link className="navbar-brand fs-1 fw-semibold" to="/dashboard"><h3>workviyo</h3>
      </Link>
      <ul className="nav flex-column py-3">
        <li className="nav-item">
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#464ff5ff" : "#a6a4a4",
            })}
            className="nav-link "
            to="/dashboard">
            <i className="bi bi-window-sidebar"></i> Dashboard
          </NavLink>
        </li>
        <li className="nav-item mt-2">
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#464ff5ff" : "#a6a4a4",
            })}
            className="nav-link "
            to="/projects">
            <BiCustomize /> Project
          </NavLink>
        </li>
        <li className="nav-item mt-2">
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#464ff5ff" : "#a6a4a4",
            })}
            className="nav-link "
            to="/teams">
            <i className="bi bi-people me-2"></i>Team
          </NavLink>
        </li>
        <li className="nav-item mt-2">
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#464ff5ff" : "#a6a4a4",
            })}
            className="nav-link "
            to="/reports">
            <FaRegChartBar /> Reports
          </NavLink>
        </li>
        <li className="nav-item mt-2">
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#464ff5ff" : "#a6a4a4",
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
