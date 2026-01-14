import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeamsAsync, updateTeamAsync } from "../features/teamSlice";
import { fetchMembersAsync } from "../features/memberSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addMembersAsync } from "../features/memberSlice";

export default function AddMember() {
  const { teamId } = useParams();
  //console.log("teamId from params:", teamId);
  const [newMemberName, setNewMemberName] = useState("");

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
    dispatch(fetchTeamsAsync());
  }, [dispatch]);

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!getTeam) return;

    const updatedMembers = [
      ...getTeam.members.map((m) => m._id),
      ...selectedMembers,
    ];

    const uniqueMembers = [...new Set(updatedMembers)];

    try {
      await dispatch(
        updateTeamAsync({
          id: teamId,
          members: uniqueMembers,
        })
      ).unwrap();

      toast.success("Members added successfully");

      setSelectedMembers([]);
      dispatch(fetchTeamsAsync());
    } catch (err) {
      toast.error("Failed to add members");
    }
  };

  const handleCreateMember = async () => {
    if (!newMemberName.trim()) return;

    try {
      const newMember = await dispatch(
        addMembersAsync({ name: newMemberName })
      ).unwrap();

      // auto-select newly created member
      setSelectedMembers((prev) => [...prev, newMember._id]);

      setNewMemberName("");
      dispatch(fetchMembersAsync());

      toast.success("Member created");
    } catch (err) {
      toast.error("Failed to create member");
    }
  };

  return (
    <div className="modal-body">
      <form onSubmit={handleAddMember}>
        <div className="mb-3">
          {members?.map((member) => {
            // Skip member if already in team
            if (getTeam?.members?.some((m) => m._id === member._id))
              return null;

            return (
              <label key={member._id}>
                <input
                  type="checkbox"
                  className="input-check my-3 ms-3"
                  onChange={selectMemberHandler}
                  value={member._id}
                />{" "}
                {member.name}
              </label>
            );
          })}
        </div>

        {/* <div className="mb-3">
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
        </div> */}

        <div className="modal-footer">
          <button type="submit" className="btn btn-primary">
            Add Member
          </button>
        </div>
      </form>
      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Add new member name"
          value={newMemberName}
          onChange={(e) => setNewMemberName(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={handleCreateMember}>
          Add
        </button>
      </div>
    </div>
  );
}
