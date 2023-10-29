import React from "react";
import { Outlet } from "react-router-dom";
import { getSession } from "../utils/sessionMethods";
import Signup from "../components/Signup";
import Sidebar from "../components/Sidebar";
import Navigationbar from "../components/Navigationbar";

export default function DashboardLayout() {
  return getSession("isAuthenticated") ? (
    <div>
      <Navigationbar/>
      <div className="d-flex flex-row">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  ) : (
    <Signup />
  );
}
