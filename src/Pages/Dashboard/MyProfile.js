import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdOutlineBorderColor } from "react-icons/md";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import SocialIcons from "../../Components/SocialIcons";
import auth from "../../firebase.init";

const MyProfile = () => {
  const [user] = useAuthState(auth);
  const { data, isLoading } = useQuery("user", () =>
    fetch(`http://localhost:5000/user?email=${user?.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading />;
  }
  console.log(data);
  return (
    <div className="bg-neutral w-11/12 mx-auto mt-8 rounded-lg">
      <div className="flex justify-between items-center pt-5 px-5 ">
        <h1 className="text-3xl font-semibold">My Profile</h1>
        <Link to="/dashboard/updateProfile" className=" btn btn-primary btn-sm">
          <MdOutlineBorderColor className="mr-2" /> Edit
        </Link>
      </div>
      <div class="divider"></div>

      {/* profile image and information */}
      <div className="grid md:grid-cols-4 grid-cols-1">
        <div className="col-span-1 pb-7">
          <div className="w-40 h-40 mx-auto overflow-hidden rounded-full">
            <img className="" src={user?.photoURL} alt="user profile" />
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
          <p className="text-xl font-semibold mb-2">Your name is here</p>
          <h2 className="text-md font-semibold text-primary">Email Address:</h2>
          <p className="text-xl font-semibold mb-2">
            ashikulislamifty@gmail.com
          </p>
          <h2 className="text-md font-semibold text-primary">Role:</h2>
          <p className="text-xl font-semibold mb-4">Admin</p>
          <SocialIcons />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
