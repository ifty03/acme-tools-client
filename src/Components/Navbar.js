import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CgMenuGridO } from "react-icons/cg";
import { FcManager } from "react-icons/fc";
import auth from "../firebase.init";
import Loading from "./Loading/Loading";
import logo from "../Assets/images/logo.png";

const Navbar = () => {
  const [user, loading] = useAuthState(auth);
  const { pathname } = useLocation();
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="navbar bg-base-200 flex justify-between py-3  md:px-10 px-5 ">
      {/* navbar item */}
      <div className="">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52"
          >
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            {user && (
              <li>
                <NavLink to="dashboard">Dashboard</NavLink>
              </li>
            )}

            <li>
              <NavLink to="/portfolio">Portfolio</NavLink>
            </li>
            <li>
              <NavLink to="/blogs">Blogs</NavLink>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <img src={logo} alt="This is logo png" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          {user && (
            <li>
              <NavLink to="dashboard">Dashboard</NavLink>
            </li>
          )}

          <li>
            <NavLink to="/portfolio">Portfolio</NavLink>
          </li>
          <li>
            <NavLink to="/blogs">Blogs</NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-none">
        {user ? (
          <button
            onClick={async () => {
              await signOut(auth);
              localStorage.removeItem("access-token");
              toast.success("Log Out successfully");
            }}
            className="btn btn-ghost"
          >
            Sign Out
          </button>
        ) : (
          <Link to="/login" className="font-semibold mr-2">
            Login
          </Link>
        )}

        <div className="dropdown dropdown-end">
          <div className="flex items-center">
            <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {user ? (
                  <img src={user?.photoURL} alt="user avtar" />
                ) : (
                  <FcManager className="text-3xl" />
                )}
              </div>
            </label>
            {pathname.includes("dashboard") ? (
              <label
                for="my-drawer-2"
                className=" ml-2 drawer-button lg:hidden"
              >
                <CgMenuGridO className="text-2xl" />
              </label>
            ) : (
              ""
            )}
          </div>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <button
                onClick={async () => {
                  await signOut(auth);
                  localStorage.removeItem("access-token");
                  toast.success("signOut successfully");
                }}
                className=""
              >
                LogOut
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
