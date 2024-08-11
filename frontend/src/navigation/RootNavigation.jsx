import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AUTH_ROUTE } from "../constants/routes";
import { Auth } from "../screens";

const RootNavigation = () => {
  return (
    <Routes>
      <Route exact path={AUTH_ROUTE} element={<Auth />} />
    </Routes>
  );
};

export default RootNavigation;
