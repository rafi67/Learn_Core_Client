import { Link, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import useVerifyUser from "../../hooks/useVerifyUser";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut, setSearchClass, selected, setSelected } = useAuth();
  const { userType } = useVerifyUser();
  const { pathname } = useLocation();

  const handleLogOut = () => {
    logOut()
      .then(() =>
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully Logout",
          showConfirmButton: false,
          timer: 1500,
        })
      )
      .catch((err) =>
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${err.message}`,
          showConfirmButton: false,
          timer: 1500,
        })
      );
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl hidden lg:flex">
          <img
            className="w-[40px]"
            src="https://img.icons8.com/?size=100&id=uQOVVJtLx7J8&format=png&color=000000"
            alt=""
          />
          LearnCore
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link
              to="/"
              className={`hover:text-[#FDC800] ${
                selected == 1 && "bg-[#FDC800]"
              } hover:bg-transparent`}
              onClick={() => setSelected(1)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/class"
              className={`hover:text-[#FDC800] ${
                selected == 2 && "bg-[#FDC800]"
              } hover:bg-transparent`}
              onClick={() => setSelected(2)}
            >
              All Classes
            </Link>
          </li>
          <li>
            <Link
              to="/teachOnLearnCore"
              className={`hover:text-[#FDC800] ${
                selected == 3 && "bg-[#FDC800]"
              } hover:bg-transparent`}
              onClick={() => setSelected(3)}
            >
              Teach on LearnCore
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end space-x-6">
        {pathname.includes("class") && (
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
            onChange={(e) => setSearchClass(e.target.value)}
          />
        )}
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">{user.displayName}</a>
              </li>
              {userType?.role === "student" && (
                <li>
                  <Link to="/studentDashboard/myEnrollClass">My Dashboard</Link>
                </li>
              )}
              {userType?.role === "admin" && (
                <li>
                  <Link to="/adminDashboard/teacherRequest">My Dashboard</Link>
                </li>
              )}
              {userType?.role === "teacher" && (
                <li>
                  <Link to="/teacherDashboard/addClass">My Dashboard</Link>
                </li>
              )}
              <li>
                <a onClick={handleLogOut}>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/signIn" className="btn hidden lg:flex">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
