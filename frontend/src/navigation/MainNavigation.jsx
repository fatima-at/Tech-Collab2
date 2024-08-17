import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { FINISH_REGISTRATION_ROUTE, HOME_ROUTE } from "../constants/routes";
import { Home } from "../screens";
import { FinishRegistration } from "../screens";
import { useAuth } from "../context";

const MainNavigation = () => {
  const { authUser } = useAuth();
  return (
    <Routes>
      {authUser?.registration_completed ? (
        <>
          <Route exact path={HOME_ROUTE} element={<Home />} />
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
  );
};

export default MainNavigation;
