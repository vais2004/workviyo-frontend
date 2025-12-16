import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<Projects />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/teamDetail/:teamId" element={<TeamDetail />} />
        <Route path="/addTask" element={<AddTask />} />
        <Route path="/addTask/:taskId" element={<AddTask />} />
        <Route path="/addProject" element={<AddProject />} />
        <Route path="/addProject/:projectId" element={<AddProject />} />
        <Route path="/addTeam" element={<AddTeam />} />
        <Route path="/addTeam/:teamId" element={<AddTeam />} />
      */}
        <Route path="/" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/dashboard" element={<Home />} />
  <Route path="/projects" element={<Projects />} />               {/* List all projects */}
  <Route path="/projects/view/:projectId" element={<AddProject />} /> {/* View/Edit project */}
  <Route path="/addProject" element={<AddProject />} />          {/* Create new project */}
  <Route path="/teams" element={<Teams />} />
  <Route path="/teamDetail/:teamId" element={<TeamDetail />} />
  <Route path="/addTask" element={<AddTask />} />                {/* Create new task */}
  <Route path="/addTask/:taskId" element={<AddTask />} />       {/* Edit existing task */}
  <Route path="/reports" element={<Reports />} />
  <Route path="/settings" element={<Settings />} />
  <Route path="/addTeam" element={<AddTeam />} />
  <Route path="/addTeam/:teamId" element={<AddTeam />} />
      </Routes> 
    </>
  );
}

export default App;
