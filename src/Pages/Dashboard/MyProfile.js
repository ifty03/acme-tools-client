import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdOutlineBorderColor } from "react-icons/md";
import { useQuery } from "react-query";
import { Link, Navigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { HiCheckCircle } from "react-icons/hi";
import SocialIcons from "../../Components/SocialIcons";
import auth from "../../firebase.init";

const MyProfile = () => {
  const [user] = useAuthState(auth);
  const { data, isLoading } = useQuery("user", () =>
    fetch(`http://localhost:5000/user?email=${user?.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        signOut(auth);
        Navigate("/");
        localStorage.removeItem("access-token");
      }
      return res.json();
    })
  );
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-neutral w-11/12 mx-auto mt-8 rounded-lg">
      <div className="flex justify-between items-center pt-5 px-5 ">
        <h1 className="text-3xl font-semibold">My Profile</h1>
        <Link to="/dashboard/updateProfile" className=" btn btn-primary btn-sm">
          <MdOutlineBorderColor className="mr-2" /> Edit
        </Link>
      </div>
      <div className="divider"></div>

      {/* profile image and information */}
      <div className="grid md:grid-cols-4 grid-cols-1">
        <div className="col-span-1 pb-7">
          <div className="avatar online">
            <div className="w-40 h-40 mx-auto overflow-hidden rounded-full ">
              <img className="" src={user?.photoURL} alt="user profile" />
            </div>
          </div>
          <Link
            to="/dashboard/updateProfile"
            className="btn btn-primary btn-sm my-6"
          >
            <MdOutlineBorderColor className="mr-2" /> Edit Profile
          </Link>
        </div>
        <div className="col-span-3 text-left pl-7">
          <h2 className="text-md font-semibold text-primary">Full Name:</h2>
          <p className="text-xl font-semibold mb-2 flex items-center">
            {data?.name}{" "}
            {data?.role && <HiCheckCircle className="text-blue-600" />}
          </p>
          <h2 className="text-md font-semibold text-primary">Email Address:</h2>
          <p className="text-xl font-semibold mb-2">{data?.email}</p>
          <h2 className="text-md font-semibold text-primary">Role:</h2>
          <p className="text-xl font-semibold mb-4">
            {data?.role ? data.role : "User"}
          </p>
          {data?.phone && (
            <>
              {" "}
              <h2 className="text-md font-semibold text-primary">
                Phone Number:
              </h2>{" "}
              <p className="text-xl font-semibold mb-2">{data?.phone}</p>
            </>
          )}
          {data?.address && (
            <>
              {" "}
              <h2 className="text-md font-semibold text-primary">
                Address:
              </h2>{" "}
              <p className="text-xl font-semibold mb-2">{data?.address}</p>
            </>
          )}

          <SocialIcons />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
