import React from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineBorderColor } from "react-icons/md";
import { MdReviews } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* <!-- Page content here --> */}
        <Outlet />
      </div>
      <div className="drawer-side">
        <label for="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-neutral text-base-content">
          <li>
            <NavLink to="/dashboard/myProfile">
              <CgProfile /> My Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/myOrders">
              <MdOutlineBorderColor /> My Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/addReview">
              <MdReviews /> Add A Review
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
