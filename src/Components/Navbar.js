import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import { CgMenuGridO } from "react-icons/cg";
import auth from "../firebase.init";

const Navbar = () => {
  const [user] = useAuthState(auth);
  console.log(user && user?.displayName);
  const { pathname } = useLocation();
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
              <Link to="/home">Home</Link>
            </li>
            {user && (
              <li>
                <Link to="dashboard">Dashboard</Link>
              </li>
            )}

            <li>
              <a>Contact</a>
            </li>
            <li>
              <a>Review</a>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          daisyUI
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link to="/home">Home</Link>
          </li>
          {user && (
            <li>
              <Link to="dashboard">Dashboard</Link>
            </li>
          )}

          <li>
            <a>Contact</a>
          </li>
          <li>
            <a>Review</a>
          </li>
        </ul>
      </div>
      <div className="flex-none">
        {user ? (
          <button
            onClick={async () => {
              await signOut(auth);
              toast.success("Log Out successfully");
            }}
            className="btn btn-ghost"
          >
            Sign Out
          </button>
        ) : (
          <Link to="/login" className="font-semibold">
            Login
          </Link>
        )}

        <div className="dropdown dropdown-end">
          <div className="flex items-center">
            <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://api.lorem.space/image/face?hash=33791" />
              </div>
            </label>
            {pathname.includes("dashboard") ? (
              <label for="my-drawer-2" class=" ml-2 drawer-button lg:hidden">
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
