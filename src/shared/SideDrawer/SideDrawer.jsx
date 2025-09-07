import { NavLink } from "react-router";
import { FaHome } from "react-icons/fa";
import { MdClass } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";
import useVerifyUser from "../../hooks/useVerifyUser";
import { CgProfile } from "react-icons/cg";
import { MdOutlineMenu } from "react-icons/md";
import { IoMdGitPullRequest } from "react-icons/io";
import { FaUsers } from "react-icons/fa";

const SideDrawer = () => {
  const { userType } = useVerifyUser();

  return (
    <div className="drawer w-[10%] block lg:hidden">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn border-0 text-xl">
          <MdOutlineMenu />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
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
          {userType?.role === "student" && (
            <li>
              <NavLink to="/studentDashboard/studentProfile">
                <CgProfile />
                Profile
              </NavLink>
            </li>
          )}
          {userType?.role === "admin" && (
          <li>
            <NavLink to="/adminDashboard/teacherRequest">
              <IoMdGitPullRequest />
              Teacher Request
            </NavLink>
          </li>
        )}
        {userType?.role === "admin" && (
          <li>
            <NavLink to="/adminDashboard/users">
              <FaUsers />
              Users
            </NavLink>
          </li>
        )}
        {userType?.role === "admin" && (
          <li>
          <NavLink to="/adminDashboard/allClasses">
            <MdClass />
            All Classes
          </NavLink>
        </li>
        )}
        {userType?.role === "admin" && (
          <li>
            <NavLink to="/adminDashboard/adminProfile">
              <CgProfile />
              Profile
            </NavLink>
          </li>
        )}
        </ul>
      </div>
    </div>
  );
};

export default SideDrawer;
