import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeamsAsync, updateTeamAsync } from "../features/teamSlice";
import {
  addMembersAsync,
  deleteMembersAsync,
  fetchMembersAsync,
} from "../features/memberSlice";
import SideNav from "../components/SideNav";
import AddMember from "./AddMember";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TeamDetail() {
  const [newName, setNewName] = useState("");
  const { teamId } = useParams();
  const dispatch = useDispatch();
  const { teams } = useSelector((state) => state.teams);
  const { members } = useSelector((state) => state.members);

  useEffect(() => {
    dispatch(fetchMembersAsync());
  }, [dispatch]);

  const teamList = Array.isArray(teams) ? teams : [teams];
  const teamData = teamList.find((team) => team?._id === teamId);

  //console.log(teamData);

  useEffect(() => {
    dispatch(fetchTeamsAsync());
  }, [dispatch]);

  const handleAdd = async () => {
    try {
      const newMember = await dispatch(
        addMembersAsync({ name: newName })
      ).unwrap();

      const updatedMembers = [
        ...teamData.members.map((m) => m._id),
        newMember._id,
      ];

      await dispatch(
        updateTeamAsync({
          id: teamData._id,
          members: updatedMembers,
        })
      ).unwrap();

      setNewName("");
      toast.success("Member added to team");
      dispatch(fetchTeamsAsync());
    } catch (error) {
      console.error("failed to add:", error);
    }
  };

  const handleRemoveMember = async (id) => {
    const matchedMember = members.find((member) => member._id === id);

    if (!matchedMember) {
      alert("Member not found.");
      return;
    }

    const updatedMembers = teamData.members
      .filter((mem) => mem._id !== id)
      .map((mem) => mem._id);

    try {
      await dispatch(
        updateTeamAsync({
          id: teamData._id,
          members: updatedMembers,
        })
      ).unwrap();
      toast.success("Member deleted successfully.");
      dispatch(fetchTeamsAsync());
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="container-fluid">
      <ToastContainer position="top-right" className="mt-5" autoClose={3000} />
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
          <section className="pb-3 px-2">
            <Link className="remove-underline mx-4" to="/teams">
              <i className="bi bi-arrow-left"></i> Back to Teams
            </Link>
          </section>

          <section className="px-2">
            <div className="p-4">
              <h3>{teamData?.name}</h3>
              <h4 className="fw-normal fs-5 text-muted">Members</h4>

              <ul className="list-group col-6 mt-3">
                {teamData?.members?.length === 0 && (
                  <li className="list-group-item text-muted">
                    No members in this team.
                  </li>
                )}

                {teamData?.members?.map((member) => (
                  <li
                    key={member._id}
                    className="list-group-item d-flex justify-content-between align-items-center">
                    <span>
                      <span
                        className="me-2 rounded-circle d-inline-block text-center"
                        style={{
                          width: "30px",
                          height: "30px",
                          lineHeight: "30px",
                          backgroundColor: "antiquewhite",
                          color: "brown",
                        }}>
                        {member.name.charAt(0)}
                      </span>
                      {member.name}
                    </span>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleRemoveMember(member._id)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="pb-3 px-2 row">
            <div className="py-1 col-auto">
              <button
                type="button"
                className="btn btn-outline-secondary ms-auto me-2"
                data-bs-toggle="modal"
                data-bs-target="#addNewMember"
                data-bs-whatever="@mdo">
                + Members
              </button>
            </div>

            <div className="col-auto">
              <div className="input-group w-75 mt-1">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Add member name"
                  onChange={(e) => setNewName(e.target.value)}
                />
                <button className="btn btn-outline-primary" onClick={handleAdd}>
                  Add
                </button>
              </div>
            </div>
            <div className="py-1">
              <div
                className="modal fade"
                id="addNewMember"
                tabIndex="-1"
                aria-labelledby="memberModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="memberModalLabel">
                        Create New Member
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"></button>
                    </div>
                    <AddMember teamId={teamData?._id} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
