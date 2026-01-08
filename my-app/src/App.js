import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import Teams from "./pages/Teams.jsx";
import TeamDetail from "./pages/TeamDetail.jsx";
import Reports from "./pages/Reports.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Settings from "./pages/Settings.jsx";
import AddTask from "./pages/AddTask.jsx";
import AddProject from "./pages/AddProject.jsx";
import AddTeam from "./pages/AddTeam.jsx";
import ProjectDetails from "./pages/ProjectDetails.jsx";
import TaskDetails from "./pages/TaskDetails.jsx";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        newestOnTop
        style={{ zIndex: 9999 }}
      />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<AddProject />} />
        <Route path="/addProject" element={<AddProject />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teamDetail/:teamId" element={<TeamDetail />} />
        <Route path="/addTask" element={<AddTask />} />
        <Route path="/addTask/:taskId" element={<AddTask />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/addTeam" element={<AddTeam />} />
        <Route path="/addTeam/:teamId" element={<AddTeam />} />
        <Route path="/projectDetails/:projectId" element={<ProjectDetails />} />
        <Route path="/tasks/:taskId" element={<TaskDetails />} />
      </Routes>
    </>
  );
}

export default App;
