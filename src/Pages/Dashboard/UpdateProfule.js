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
    fetch(`http://localhost:5000/user/${user?.email}`, {
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
      <div class="divider"></div>

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
