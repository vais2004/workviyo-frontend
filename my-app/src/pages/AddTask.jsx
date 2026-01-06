import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectsAsync } from "../features/projectSlice";
import { fetchTeamsAsync } from "../features/teamSlice";
import {
  fetchTasksAsync,
  addTaskAsync,
  updateTaskAsync,
} from "../features/taskSlice";
import { fetchMembersAsync } from "../features/memberSlice";
import { fetchUserAsync } from "../features/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddTask({ taskId }) {
  const dispatch = useDispatch();

  const [projectId, setProjectId] = useState("");
  const [taskName, setTaskName] = useState("");
  const [teamId, setTeamId] = useState("");
  const [timeToComplete, setTimeToComplete] = useState("");
  const [owners, setOwners] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");

  const { projects } = useSelector((state) => state.projects);
  const { teams } = useSelector((state) => state.teams);
  const { members } = useSelector((state) => state.members);
  const { tasks } = useSelector((state) => state.tasks);

  const existingTask = taskId && tasks.find((task) => task._id === taskId);
  const isEdit = Boolean(existingTask);

  useEffect(() => {
    dispatch(fetchProjectsAsync());
    dispatch(fetchTeamsAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchMembersAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUserAsync());
  }, [dispatch]);

  useEffect(() => {
    if (isEdit) {
      setProjectId(existingTask.project?._id || "");
      setTaskName(existingTask.name || "");
      setTeamId(existingTask.team?._id || "");
      setTimeToComplete(existingTask.timeToComplete || "");
      setOwners(existingTask.owners?.map((o) => o._id) || []);
      setTags(existingTask.tags || []);
      setPriority(existingTask.priority || "");
      setStatus(existingTask.status || "");
    }
  }, [isEdit, existingTask]);

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !taskName.trim() ||
      !projectId ||
      !teamId ||
      owners.length === 0 ||
      !timeToComplete
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    const payload = {
      name: taskName.trim(),
      project: projectId,
      team: teamId,
      owners,
      timeToComplete: Number(timeToComplete),
      priority: priority || "Medium",
      status: status || "To Do",
      tags: tags || [],
    };

    //console.log("TASK PAYLOAD BEFORE SENDING:", payload);

    if (isEdit) {
      dispatch(updateTaskAsync({ id: taskId, ...payload }))
        .unwrap()
        .then(() => {
          toast.success("Task updated successfully");
          dispatch(fetchTasksAsync());
        })
        .catch(() => toast.error("Failed to update task"));
    } else {
      dispatch(addTaskAsync(payload))
        .unwrap()
        .then(() => {
          toast.success("Task created successfully");
          dispatch(fetchTasksAsync());
        })
        .catch(() => toast.error("Failed to create task"));
    }

    document.querySelector(".btn-close")?.click();
  };

  const RequiredLabel = ({ text }) => (
    <label className="form-label">
      {text} <span className="text-danger">*</span>
    </label>
  );

  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title">
          {isEdit ? "Update Task" : "Create Task"}
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"></button>
      </div>

      <div className="modal-body">
        <ToastContainer
          position="top-right"
          className="mt-5"
          autoClose={3000}
        />
        <div>
          <div>
            <form onSubmit={handleSubmit}>
              <RequiredLabel text="Select Project:" />
              <select
                className="form-select mb-3"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}>
                <option value="">---Select---</option>
                {projects.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>

              <RequiredLabel text="Task Name:" />
              <input
                className="form-control mb-3"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />

              <RequiredLabel text="Select Team:" />
              <select
                className="form-select mb-3"
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}>
                <option value="">---Select---</option>
                {teams.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.name}
                  </option>
                ))}
              </select>

              <RequiredLabel text="Select Status:" />
              <select
                className="form-select mb-3"
                value={status}
                onChange={(e) => setStatus(e.target.value)}>
                <option value="">---Select---</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Blocked">Blocked</option>
              </select>

              <RequiredLabel text="Select Owner:" />
              <select
                className="form-select mb-3"
                value={owners[0] || ""}
                onChange={(e) =>
                  setOwners(e.target.value ? [e.target.value] : [])
                }>
                <option value="">---Select---</option>
                {members.map((m) => (
                  <option key={m._id} value={m._id}>
                    {m.name}
                  </option>
                ))}
              </select>

              <RequiredLabel text="Add Tag:" />
              <div className="d-flex mb-2">
                <input
                  className="form-control me-2"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={handleAddTag}>
                  Add
                </button>
              </div>

              {tags.map((tag, i) => (
                <span key={i} className="badge bg-secondary me-2 mb-3">
                  {tag}
                </span>
              ))}
              <br />
              <RequiredLabel text="Time to complete:" />
              <input
                type="number"
                className="form-control my-3"
                value={timeToComplete}
                onChange={(e) => setTimeToComplete(e.target.value)}
              />

              <RequiredLabel text="Select Priority:" />
              <select
                className="form-select mb-3"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}>
                <option value="">---Select---</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              <button className="btn btn-outline-primary float-end">
                {isEdit ? "Update" : "Create"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
