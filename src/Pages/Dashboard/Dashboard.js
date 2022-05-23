import React from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineBorderColor } from "react-icons/md";
import { MdReviews } from "react-icons/md";
import { BiAddToQueue } from "react-icons/bi";
import { IoMdRemoveCircle } from "react-icons/io";
import { MdAddLocationAlt } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content ">
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
          <li>
            <NavLink to="/dashboard/manageProduct">
              <IoMdRemoveCircle /> Manage Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/addProduct">
              <BiAddToQueue /> Add A Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manageAllOrders">
              <MdAddLocationAlt /> Manage All Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/makeAdmin">
              <MdAdminPanelSettings /> Make Admin
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
