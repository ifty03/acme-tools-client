import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdOutlineBorderColor } from "react-icons/md";
import auth from "../../firebase.init";

const MyProfile = () => {
  const [user] = useAuthState(auth);
  return (
    <div className="bg-neutral w-11/12 mx-auto mt-8 rounded-lg">
      <div className="flex justify-between items-center pt-5 px-5 ">
        <h1 className="text-3xl font-semibold">My Profile</h1>
        <h1 className="flex items-center">
          <MdOutlineBorderColor className="mr-2" /> Edit
        </h1>
      </div>
      <div class="divider"></div>

      {/* profile image and information */}
      <div>
        <div>
          <img
            className="w-48 rounded-t-full"
            src={user?.photoURL}
            alt="user profile"
          />
          <button className="btn btn-primary">
            <MdOutlineBorderColor className="mr-2" /> Edit Profile
          </button>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default MyProfile;
