import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  EXPLORE_PROJECTS_ROUTE,
  EXPLORE_USERS_ROUTE,
  FINISH_REGISTRATION_ROUTE,
  GENERATE_PROJECTS_ROUTE,
  HOME_ROUTE,
  PROFILE_ROUTE,
  SAVED_PROJECTS_ROUTE,
  SESSIONS_HISTORY_ROUTE,
  SESSION_DETAIL_ROUTE,
} from "../constants/routes";
import {
  GenerateProjects,
  Home,
  Profile,
  SessionsHistory,
  FinishRegistration,
  SavedProjects,
  ExploreProjects,
  ExploreUsers,
} from "../screens";
import { useAuth } from "../context";
import { Sidebar } from "../components";

const MainNavigation = () => {
  const { authUser } = useAuth();
  return (
    <div style={{ display: "flex", width: "100%" }}>
      {authUser?.registration_completed ? <Sidebar /> : <></>}
      <Routes>
        {authUser?.registration_completed ? (
          <>
            <Route exact path={HOME_ROUTE} element={<Home />} />
            <Route
              exact
              path={GENERATE_PROJECTS_ROUTE}
              element={<GenerateProjects />}
            />
            <Route
              exact
              path={SESSIONS_HISTORY_ROUTE}
              element={<SessionsHistory />}
            />
            <Route
              exact
              path={SESSION_DETAIL_ROUTE}
              element={<GenerateProjects />}
            />
            <Route
              exact
              path={SAVED_PROJECTS_ROUTE}
              element={<SavedProjects />}
            />
            <Route
              exact
              path={EXPLORE_PROJECTS_ROUTE}
              element={<ExploreProjects />}
            />
            <Route
              exact
              path={EXPLORE_USERS_ROUTE}
              element={<ExploreUsers />}
            />
            <Route exact path={PROFILE_ROUTE} element={<Profile />} />
            <Route path="*" element={<Navigate to={HOME_ROUTE} />} />
          </>
        ) : (
          <>
            <Route
              exact
              path={FINISH_REGISTRATION_ROUTE}
              element={<FinishRegistration />}
            />
            <Route
              path="*"
              element={<Navigate to={FINISH_REGISTRATION_ROUTE} />}
            />
          </>
        )}
      </Routes>
    </div>
  );
};

export default MainNavigation;
