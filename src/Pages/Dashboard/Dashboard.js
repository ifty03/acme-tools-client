import React from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineBorderColor } from "react-icons/md";
import { MdReviews } from "react-icons/md";
import { BiAddToQueue } from "react-icons/bi";
import { IoMdRemoveCircle } from "react-icons/io";
import { MdAddLocationAlt } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import useIsAdmin from "../../Hooks/useIsAdmin";
import Loading from "../../Components/Loading/Loading";

const Dashboard = () => {
  const [user, isLoading] = useAuthState(auth);
  const [admin] = useIsAdmin(user);
  if (isLoading) {
    return <Loading />;
  }
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
          <div class="sticky inset-x-0 bottom-0 border-t border-neutral">
            <Link
              to="/dashboard/myProfile"
              class="flex items-center p-4 bg-base-100 rounded-lg shrink-0"
            >
              <img
                class="object-cover w-10 h-10 rounded-full"
                src={user?.photoURL}
                alt="Simon Lewis"
              />

              <div class="ml-1.5">
                <p class="text-xs">
                  <strong class="block font-medium text-left">
                    {user?.displayName}
                  </strong>

                  <span> {user?.email} </span>
                </p>
              </div>
            </Link>
          </div>
          <li>
            <NavLink to="/dashboard/myProfile">
              <CgProfile /> My Profile
            </NavLink>
          </li>
          {!admin && (
            <>
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
            </>
          )}
          {admin && (
            <>
              {" "}
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
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
