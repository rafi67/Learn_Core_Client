import { Outlet } from "react-router";
import Sidebar from "../shared/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex w-screen md:max-w-screen-lg lg:max-w-screen-xl mx-auto">
        <Sidebar/>
        <Outlet/>
    </div>
  );
};

export default Dashboard;
