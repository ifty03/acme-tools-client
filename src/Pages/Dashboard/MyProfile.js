import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdOutlineBorderColor } from "react-icons/md";
import SocialIcons from "../../Components/SocialIcons";
import auth from "../../firebase.init";

const MyProfile = () => {
  const [user] = useAuthState(auth);
  return (
    <div className="bg-neutral w-11/12 mx-auto mt-8 rounded-lg">
      <div className="flex justify-between items-center pt-5 px-5 ">
        <h1 className="text-3xl font-semibold">My Profile</h1>
        <button className=" btn btn-primary btn-sm">
          <MdOutlineBorderColor className="mr-2" /> Edit
        </button>
      </div>
      <div class="divider"></div>

      {/* profile image and information */}
      <div className="grid grid-cols-4">
        <div className="col-span-1 pb-7">
          <div className="w-40 h-40 mx-auto overflow-hidden rounded-full">
            <img className="" src={user?.photoURL} alt="user profile" />
          </div>
          <button className="btn btn-primary my-6">
            <MdOutlineBorderColor className="mr-2" /> Edit Profile
          </button>
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
