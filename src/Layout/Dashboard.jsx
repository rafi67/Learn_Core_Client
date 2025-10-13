import { Outlet } from "react-router";
import Sidebar from "../shared/Sidebar/Sidebar";
import SideDrawer from "../shared/SideDrawer/SideDrawer";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const Dashboard = () => {
  const { setSelected } = useAuth();

  useEffect(() => {
    setSelected(0);
  });

  return (
    <div className="flex flex-col lg:flex-row space-y-2 w-screen md:max-w-screen-lg lg:max-w-screen-xl mx-auto">
      <Sidebar />
      <SideDrawer />
      <Outlet />
    </div>
  );
};

export default Dashboard;
