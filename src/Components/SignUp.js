import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FcManager } from "react-icons/fc";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";

import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSendEmailVerification } from "react-firebase-hooks/auth";
import Loading from "./Loading/Loading";
import auth from "../firebase.init";
import useToken from "../Hooks/useToken";

const SignUp = () => {
  const [createUserWithEmailAndPassword, eUser, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const [user] = useAuthState(auth);
  let navigate = useNavigate();
  let location = useLocation();
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [sendEmailVerification, sending] = useSendEmailVerification(auth);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [imgLoading, setImgLoading] = useState(false);
  const [token] = useToken(eUser || gUser);
  const [displayError, setDisplayError] = useState("");
  let from = location.state?.from?.pathname || "/";
  /* proctacted page */

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  /* loading spinner */
  if (updating || loading || gLoading || sending || imgLoading) {
    return <Loading />;
  }

  const handelSignUp = async (e) => {
    setImgLoading(true);
    e.preventDefault();
    const name = e.target.name.value;
    setName(name);
    const email = e.target.email.value;
    const password = e.target.password.value;
    const formData = new FormData();
    formData.append("image", image);
    fetch(
      `https://api.imgbb.com/1/upload?key=6ae4be522324a7f35282e6aa517d4990`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then(async ({ data }) => {
        setImgLoading(false);
        if (password.length >= 6) {
          setDisplayError("");
          await createUserWithEmailAndPassword(email, password);
          await updateProfile({ displayName: name, photoURL: data?.url });
          await sendEmailVerification();

          /* user data update in database */
          const user = { name, img: data.url };

          fetch(`https://acme-tools-server-production.up.railway.app/user/${email}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(user),
          });

          toast.success("user created successfully !");
          e.target.reset();
        } else {
          setDisplayError("password must be contain 6 charecter");
          toast.error("password must be contain 6 charecter");
        }
      });
  };
  /* googleLogin */
  const handelGoogleLogin = async (e) => {
    e.preventDefault();
    await signInWithGoogle();
  };

  return (
    <div>
      <div className="hero px-5 min-h-screen bg-neutral">
        <div className="card flex-shrink-0 w-full max-w-[455px] shadow-2xl  bg-base-100">
          <form onSubmit={handelSignUp} className="card-body">
            <h3 className="text-[25px] font-semibold text-center mb-2">
              Sign Up
            </h3>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your name"
                name="name"
                required
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              {/* image */}
              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <div className="flex items-center input input-bordered space-x-6">
                <div className="shrink-0">
                  <FcManager className="text-3xl" />
                </div>

                <label className="block">
                  <span className="sr-only cursor-pointer">Choose File</span>
                  <input
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                    required
                    className="block  w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-neutral file:text-blue-700 hover:file:bg-base-500 cursor-pointer"
                  />
                </label>
              </div>

              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                required
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                placeholder="password"
                name="password"
                required
                className="input input-bordered"
              />
              <small className="text-error text-left">
                {displayError ? displayError : ""}
              </small>
            </div>
            <div className="form-control mt-6">
              <small className="text-red-500">{eUser?.message}</small>
              <input
                className="btn btn-primary"
                type="submit"
                value="Sign Up"
              />
              <div className="flex justify-center items-center mt-2">
                <span>Already have an account? </span>
                <Link
                  to="/login"
                  className="text-secondary ml-1 cursor-pointer"
                >
                  Please login
                </Link>
              </div>
            </div>
            <div className="divider">OR</div>
            <button onClick={handelGoogleLogin} className="btn btn-outline">
              <FcGoogle className="text-3xl mr-5" /> CONTINUE WITH GOOGLE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
