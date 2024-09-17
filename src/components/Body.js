import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="flex mt-20 absolute top-0 w-full h-[calc(100vh-80px)] overflow-auto">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Body;