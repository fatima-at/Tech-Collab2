import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AUTH_ROUTE, REGISTER_ROUTE } from "../constants/routes";
import { Auth, Register } from "../screens";

const RootNavigation = () => {
  return (
    <Routes>
      <Route exact path={AUTH_ROUTE} element={<Auth />} />
      <Route exact path={REGISTER_ROUTE} element={<Register />} />
    </Routes>
  );
};

export default RootNavigation;
