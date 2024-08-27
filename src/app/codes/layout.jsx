import React from "react";
import Sidebar from "../Components/Sidebar";

const layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default layout;
