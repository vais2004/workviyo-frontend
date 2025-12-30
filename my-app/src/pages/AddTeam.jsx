// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addTeamsAsync, updateTeamAsync } from "../features/teamSlice";
// import { fetchMembersAsync } from "../features/memberSlice";

// export default function AddTeam({ teamId }) {
//   const dispatch = useDispatch();

//   const { teams = [] } = useSelector((state) => state.teams);
//   const { members = [] } = useSelector((state) => state.members);

//   const [teamName, setTeamName] = useState("");
//   const [selectedMembers, setSelectedMembers] = useState([]);

//   // ✅ fetch ONLY members (not teams)
//   useEffect(() => {
//     dispatch(fetchMembersAsync());
//   }, [dispatch]);

//   // ✅ populate form ONLY when editing
//   useEffect(() => {
//     if (!teamId) return;

//     const team = teams.find((t) => t._id === teamId);
//     if (!team) return;

//     setTeamName(team.name);

//     setSelectedMembers(
//       Array.isArray(team.members)
//         ? team.members.map((m) => (typeof m === "string" ? m : m._id))
//         : []
//     );
//   }, [teamId, teams]);

//   const selectMemberHandler = (e) => {
//     const { checked, value } = e.target;

//     setSelectedMembers((prev) =>
//       checked ? [...prev, value] : prev.filter((id) => id !== value)
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!teamName.trim()) {
//       alert("Team name is required");
//       return;
//     }

//     const payload = {
//       name: teamName.trim(),
//       members: selectedMembers,
//     };

//     try {
//       if (teamId) {
//         await dispatch(updateTeamAsync({ id: teamId, ...payload })).unwrap();
//       } else {
//         await dispatch(addTeamsAsync(payload)).unwrap();
//       }

//       // ✅ reset ONLY after success
//       setTeamName("");
//       setSelectedMembers([]);
//       document.querySelector(".btn-close")?.click();
//     } catch (err) {
//       console.error("Team save failed", err);
//     }
//   };

//   return (
//     <div className="modal-body">
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="col-form-label">Team Name:</label>
//           <input
//             type="text"
//             className="form-control"
//             value={teamName}
//             onChange={(e) => setTeamName(e.target.value)}
//             placeholder="Enter Team Name"
//           />
//         </div>

//         <div className="mb-3">
//           <label className="col-form-label">Add Members:</label>

//           {Array.isArray(members) &&
//             members.map((member) => (
//               <label key={member._id} className="d-block">
//                 <input
//                   type="checkbox"
//                   className="me-2"
//                   value={member._id}
//                   checked={selectedMembers.includes(member._id)}
//                   onChange={selectMemberHandler}
//                 />
//                 {member.name}
//               </label>
//             ))}
//         </div>

//         <div className="modal-footer">
//           <button type="submit" className="btn btn-primary">
//             {teamId ? "Update Team" : "Save Team"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTeamsAsync, updateTeamAsync } from "../features/teamSlice";
import { fetchMembersAsync } from "../features/memberSlice";

export default function AddTeam({ teamId }) {
  const dispatch = useDispatch();

  const { teams = [] } = useSelector((state) => state.teams);
  const { members = [] } = useSelector((state) => state.members);

  const [teamName, setTeamName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  useEffect(() => {
    dispatch(fetchMembersAsync());
  }, [dispatch]);

  useEffect(() => {
    if (!teamId) return;

    const team = teams.find((t) => t._id === teamId);
    if (!team) return;

    setTeamName(team.name);
    setSelectedMembers(team.members.map((m) => m._id));
  }, [teamId, teams]);

  const selectMemberHandler = (e) => {
    const { checked, value } = e.target;

    setSelectedMembers((prev) =>
      checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: teamName,
      members: selectedMembers,
    };

    try {
      if (teamId) {
        await dispatch(updateTeamAsync({ id: teamId, ...payload })).unwrap();
      } else {
        await dispatch(addTeamsAsync(payload)).unwrap();
      }

      document.querySelector(".btn-close")?.click();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal-body">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="col-form-label">Team Name:</label>
          <input
            type="text"
            className="form-control"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="col-form-label">Add Members:</label>
          {members.map((member) => (
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
            {teamId ? "Update Team" : "Save Team"}
          </button>
        </div>
      </form>
    </div>
  );
}
