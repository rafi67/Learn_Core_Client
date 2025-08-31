import { Outlet } from "react-router";
import Sidebar from "../shared/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex flex-row items-center justify-start w-screen md:max-w-screen-lg lg:max-w-screen-xl mx-auto">
        <Sidebar/>
        <Outlet/>
    </div>
  );
};

export default Dashboard;
