import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTeamsAsync,
  fetchTeamsAsync,
  updateTeamAsync,
} from "../features/teamSlice";
import { addMembersAsync, fetchMembersAsync } from "../features/memberSlice";

export default function AddMember() {
  const [teamName, setTeamName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const dispatch = useDispatch();
  const { teams } = useSelector((state) => state.teams);
  const { members } = useSelector((state) => state.members);
  const getTeam =
    teams && teams?.length > 0 && teams?.find((team) => team._id == teamId);

  const selectMemberHandler = (event) => {
    const { checked, value } = event.target;
    if (checked) {
      setSelectedMembers((prevVal) => [...prevVal, value]);
    } else {
      setSelectedMembers((prevVal) => prevVal.filter((prev) => prev !== value));
    }
  };

  useEffect(() => {
    dispatch(fetchMembersAsync());
  }, [dispatch]);

  const handleAddMember = async (e) => {
    e.preventDefault();
    console.log(teamId, teamName, selectedMembers);

    try {
      await dispatch(
        updateTeamAsync({
          id: teamId,
          name: teamName,
          members: selectedMembers,
        })
      ).unwrap();
      setSelectedMembers([]);
      setTeamName("");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Failed to update team:", error);
    }
  };

  return (
    <div className="modal-body">
      <form onSubmit={handleAddMember}>
        <div className="mb-3">
          {members &&
            members?.length > 0 &&
            members?.map((member) => (
              <label key={member._id}>
                <input
                  type="checkbox"
                  className="input-check my-3 ms-3"
                  placeholder={`Member `}
                  onChange={selectMemberHandler}
                  value={member._id}
                />{" "}
                {member.name}
              </label>
            ))}
        </div>

        <div className="modal-footer">
          <button type="submit" className="btn btn-primary">
            Add Member
          </button>
        </div>
      </form>
    </div>
  );
}
