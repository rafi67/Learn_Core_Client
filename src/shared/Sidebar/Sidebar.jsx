import { Link, NavLink } from "react-router";
import { FaHome } from "react-icons/fa";
import { MdClass } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";
import useVerifyUser from "../../hooks/useVerifyUser";
import { CgProfile } from "react-icons/cg";

const Sidebar = () => {
  const { userType } = useVerifyUser();

  return (
    <div className="w-64 hidden lg:block min-h-screen bg-[#1A2131] text-white">
      <ul className="w-full menu p-4">
        {/* shared nav links */}
        <li>
          <NavLink to="/">
            <FaHome />
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/class">
            <MdClass />
            All Classes
          </NavLink>
        </li>
        {userType?.role === "student" && (
          <li>
            <NavLink to="/studentDashboard/myEnrollClass">
              <MdEditDocument />
              My Enroll Class
            </NavLink>
          </li>
        )}
        <li>
          <NavLink to="/studentDashboard/studentProfile">
            <CgProfile />
            Profile
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
