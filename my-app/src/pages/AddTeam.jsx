import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTeamsAsync,
  fetchTeamsAsync,
  updateTeamAsync,
} from "../features/teamSlice";
import { fetchMembersAsync } from "../features/memberSlice";

export default function AddTeam({ teamId }) {
  const [teamName, setTeamName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const dispatch = useDispatch();
  const { teams = [] } = useSelector((state) => state.teams);
  const { members = [] } = useSelector((state) => state.members);

  useEffect(() => {
    dispatch(fetchTeamsAsync());
    dispatch(fetchMembersAsync());
  }, [dispatch]);

  useEffect(() => {
    if (teamId) {
      const team = teams.find((t) => t._id === teamId);
      if (team) {
        setTeamName(team.name || "");
        setSelectedMembers(
          Array.isArray(team.members) ? team.members.map((m) => m._id) : []
        );
      }
    }
  }, [teamId, teams]);

  const selectMemberHandler = (event) => {
    const { checked, value } = event.target;
    if (checked) {
      setSelectedMembers((prev) => [...prev, value]);
    } else {
      setSelectedMembers((prev) => prev.filter((id) => id !== value));
    }
  };

  const handleAddTeam = (e) => {
    e.preventDefault();

    if (!teamName.trim()) {
      alert("Please enter team name");
      return;
    }

    const payload = {
      name: teamName.trim(),
      members: selectedMembers,
    };

    if (teamId) {
      dispatch(updateTeamAsync({ id: teamId, ...payload }));
    } else {
      dispatch(addTeamsAsync(payload));
    }

    setTeamName("");
    setSelectedMembers([]);
    document.querySelector(".btn-close")?.click();
  };

  return (
    <div className="modal-body">
      <form onSubmit={handleAddTeam}>
        <div className="mb-3">
          <label className="col-form-label">Team Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="col-form-label">Add Members:</label>
          {Array.isArray(members) &&
            members.map((member) => (
              <label key={member._id} className="d-block">
                <input
                  type="checkbox"
                  className="me-2"
                  value={member._id}
                  checked={selectedMembers.includes(member._id)}
                  onChange={selectMemberHandler}
                />
                {member.name}
              </label>
            ))}
        </div>
        <div className="modal-footer">
          <button type="submit" className="btn btn-primary">
            Save Team
          </button>
        </div>
      </form>
    </div>
  );
}
