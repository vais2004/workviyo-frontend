import React, { useEffect, useMemo } from "react";
import SideNav from "../components/SideNav";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksAsync } from "../features/taskSlice";
import moment from "moment";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PIE_COLORS = [
  "#e76f51",
  "#f1c27d",
  "#cdb4db",
  "#7ab05aff",
  "#84a59d",
  "#ffcdb2",
  "#757539ff",
  "#a6a67fff",
  "#e5989b",
  "#ffd166",
  "#90dbf4",
  "#a9def9",
  "#b5838d",
  "#dda15e",
  "#588157",
];
const BAR_COLOR_1 = "#cdb4db";
const BAR_COLOR_2 = "#ffb703";

export default function Reports() {
  const dispatch = useDispatch();
  const { tasks, status } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasksAsync());
  }, [dispatch]);

  //PIE chart for tasks closed by team
  const closedTasksByTeam = useMemo(() => {
    const completed = tasks?.filter((t) => t.status === "Completed") || [];
    const grouped = completed.reduce((acc, curr) => {
      const teamName = curr.team?.name || "Unknown";
      acc[teamName] = (acc[teamName] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(grouped).map(([name, value]) => ({
      name,
      value,
    }));
  }, [tasks]);

  // BAR chart for work done last week
  const workDoneLastWeek = useMemo(() => {
    const filtered =
      tasks?.filter(
        (task) =>
          task.status === "Completed" &&
          moment(task.updatedAt).isAfter(moment().subtract(7, "days"))
      ) || [];

    const grouped = filtered.reduce((acc, curr) => {
      const project = curr.project?.name || "Unknown";
      acc[project] = (acc[project] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(grouped).map(([project, tasks]) => ({
      project,
      tasks,
    }));
  }, [tasks]);

  //BAR chart for pending work
  const pendingWork = useMemo(() => {
    const pending =
      tasks?.filter(
        (task) => task.status === "To Do" || task.status === "Blocked"
      ) || [];

    const grouped = pending.reduce((acc, curr) => {
      const project = curr.project?.name || "Unknown";
      acc[project] = (acc[project] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(grouped).map(([project, tasks]) => ({
      project,
      tasks,
    }));
  }, [tasks]);

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

        <div className="col-12 col-md-9 col-lg-10 p-4">
          <button
            className="btn btn-outline-primary d-md-none mb-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileSidebar"
            aria-controls="mobileSidebar">
            <i className="bi bi-list"></i>
          </button>
          <h2 className="fw-bold mb-4">Reports</h2>

          {/* PIE chart */}
          <section className="shadow p-3 mb-4 bg-white rounded">
            <h5 className="text-center mb-3">Tasks Closed by Team</h5>

            {status === "Loading" ? (
              <p className="text-center">Loading...</p>
            ) : (
              <div style={{ width: "100%", height: 350 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Tooltip />
                    <Legend />
                    <Pie
                      data={closedTasksByTeam}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      label>
                      {closedTasksByTeam.map((_, index) => (
                        <Cell
                          key={index}
                          fill={PIE_COLORS[index % PIE_COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </section>

          {/*BAR chart LAST WEEK*/}
          <section className="shadow p-3 mb-4 bg-white rounded">
            <h5 className="text-center mb-3">Total Work Done Last Week</h5>

            <div style={{ width: "100%", height: 350 }}>
              <ResponsiveContainer>
                <BarChart data={workDoneLastWeek}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="project" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="tasks" fill={BAR_COLOR_1} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/*BAR chart: PENDING*/}
          <section className="shadow p-3 mb-4 bg-white rounded">
            <h5 className="text-center mb-3">Total Days of Work Pending</h5>

            <div style={{ width: "100%", height: 350 }}>
              <ResponsiveContainer>
                <BarChart data={pendingWork}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="project" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="tasks" fill={BAR_COLOR_2} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
