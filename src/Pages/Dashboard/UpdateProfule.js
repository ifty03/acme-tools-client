import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BsSkipBackwardCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import auth from "../../firebase.init";

const UpdateProfule = () => {
  const [user, loading] = useAuthState(auth);
  const [updating, setUpdating] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  if (updating || loading) {
    return <Loading />;
  }

  const onSubmit = (data) => {
    setUpdating(true);
    fetch(`https://sheltered-journey-62217.herokuapp.com/user/${user?.email}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        reset();
        setUpdating(false);
        toast.success("Profile update Completed");
      });
  };
  return (
    <div className="bg-neutral w-11/12 mx-auto mt-8 rounded-lg">
      <div className="flex justify-between items-center pt-5 px-5 ">
        <h1 className="text-3xl font-semibold">Update Profile</h1>
        <Link to="/dashboard/myProfile" className=" btn btn-primary btn-sm">
          <BsSkipBackwardCircleFill className="mr-2" /> Back
        </Link>
      </div>
      <div className="divider"></div>

      {/* profile image and information */}
      <div className="grid md:grid-cols-4 grid-cols-1">
        <div className="col-span-1 md:mt-10 pb-7">
          <div className="w-40 h-40 mx-auto overflow-hidden rounded-full">
            <img className="" src={user?.photoURL} alt="user profile" />
          </div>
          <Link
            to="/dashboard/myProfile"
            className="btn btn-primary btn-sm my-6"
          >
            <BsSkipBackwardCircleFill className="mr-2" /> Back Profile
          </Link>
        </div>
        <div className="col-span-3 text-left md:px-28">
          <form
            className="form-control shadow-2xl p-5 bg-base-50 mb-10 mt-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="mb-1">your Email</label>
            <input
              className="input mb-3 text-[16px] input-bordered"
              type="text"
              value={user?.email}
              disabled
            />
            <label className="mb-1">your name</label>
            <input
              placeholder="your name"
              value={user?.displayName}
              className="input mb-3 text-[16px] input-bordered"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-error -mt-2">This field is required</span>
            )}
            <label className="mb-1">Phone Number</label>
            <input
              placeholder="Phone number"
              className="input mb-3 text-[16px] input-bordered"
              {...register("phone", { required: true })}
            />
            {errors.phone && (
              <span className="text-error -mt-2">This field is required</span>
            )}
            <label className="mb-1">Your Address</label>
            <input
              placeholder="Address"
              className="input mb-3 text-[16px] input-bordered"
              {...register("address", { required: true })}
            />
            {errors.address && (
              <span className="text-error -mt-2">This field is required</span>
            )}
            <fieldset className="w-full space-y-1 text-gray-400">
              <label for="url" className="block text-sm font-medium">
                Linkedin Profile
              </label>
              <div className="flex">
                <span className="flex items-center px-3 pointer-events-none sm:text-sm rounded-l-md bg-gray-700 text-gray-200">
                  https://
                </span>
                <input
                  type="text"
                  name="linkedin"
                  id="url"
                  placeholder="www.yourProfile.com"
                  className="flex pl-3 flex-1 input-bordered h-10 sm:text-sm text-[16px] rounded-r-md focus:ring-inset  text-gray-400 bg-base-100 focus:ring-violet-600"
                  {...register("linkedin", { required: true })}
                />
              </div>
            </fieldset>
            {errors.linkedin && (
              <span className="text-error mt-1">This field is required</span>
            )}

            <input
              className="btn btn-primary mt-5  mb-8"
              type="submit"
              value="Update !"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfule;
