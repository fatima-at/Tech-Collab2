import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  EXPLORE_PROJECTS_ROUTE,
  EXPLORE_USERS_ROUTE,
  FINISH_REGISTRATION_ROUTE,
  GENERATE_PROJECTS_ROUTE,
  PROFILE_ROUTE,
  RECOMMENDED_PROJECTS_ROUTE,
  SAVED_PROJECTS_ROUTE,
  SESSIONS_HISTORY_ROUTE,
  SESSION_DETAIL_ROUTE,
} from "../constants/routes";
import {
  GenerateProjects,
  Profile,
  SessionsHistory,
  FinishRegistration,
  SavedProjects,
  ExploreProjects,
  ExploreUsers,
  RecommendedProjects,
} from "../screens";
import { useAuth } from "../context";
import { Sidebar } from "../components";
import Navbar from "../components/Layout/Navbar/Navbar";

const MainNavigation = () => {
  const { authUser } = useAuth();
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
      }}
    >
      {authUser?.registration_completed ? <Sidebar /> : <></>}
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {authUser?.registration_completed ? <Navbar /> : <></>}
        <Routes>
          {authUser?.registration_completed ? (
            <>
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
              <Route
                exact
                path={RECOMMENDED_PROJECTS_ROUTE}
                element={<RecommendedProjects />}
              />
              <Route exact path={PROFILE_ROUTE} element={<Profile />} />
              <Route path="*" element={<Navigate to={EXPLORE_USERS_ROUTE} />} />
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
    </div>
  );
};

export default MainNavigation;
