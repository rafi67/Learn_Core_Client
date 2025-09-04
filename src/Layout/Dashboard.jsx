import { Outlet } from "react-router";
import Sidebar from "../shared/Sidebar/Sidebar";
import SideDrawer from "../shared/Sidedrawer/Sidedrawer";

const Dashboard = () => {
  return (
    <div className="flex flex-col lg:flex-row space-y-2 w-screen md:max-w-screen-lg lg:max-w-screen-xl mx-auto">
        <Sidebar/>
        <SideDrawer/>
        <Outlet/>
    </div>
  );
};

export default Dashboard;
