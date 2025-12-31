import { configureStore } from "@reduxjs/toolkit";
import { projectSlice } from "../features/projectSlice";
import { taskSlice } from "../features/taskSlice";
import { userSlice } from "../features/userSlice";
import { memberSlice } from "../features/memberSlice";
import { teamSlice } from "../features/teamSlice";

export default configureStore({
  reducer: {
    projects: projectSlice.reducer,
    tasks: taskSlice.reducer,
    teams: teamSlice.reducer,
    users: userSlice.reducer,
    members: memberSlice.reducer,
  },
});
