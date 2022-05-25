import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";

import { signOut } from "firebase/auth";
import auth from "../firebase.init";
import useIsAdmin from "../Hooks/useIsAdmin";
import Loading from "./Loading/Loading";

const RequirAdmin = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [admin, isLoading] = useIsAdmin(user);
  let location = useLocation();

  if (loading || isLoading) {
    return <Loading />;
  }

  if (!user || !admin) {
    signOut(auth);
    localStorage.removeItem("access-token");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequirAdmin;
