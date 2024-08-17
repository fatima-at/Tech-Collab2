import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  AUTH_ROUTE,
  REGISTER_ROUTE,
  VERIFY_ROUTE,
} from "../constants/routes";
import { Auth, Register, Verify } from "../screens";

const RootNavigation = () => {
  return (
    <Routes>
      <Route exact path={AUTH_ROUTE} element={<Auth />} />
      <Route path={VERIFY_ROUTE} element={<Verify />} />
      <Route exact path={REGISTER_ROUTE} element={<Register />} />
      <Route path="*" element={<Navigate to={AUTH_ROUTE} />} />
    </Routes>
  );
};

export default RootNavigation;
