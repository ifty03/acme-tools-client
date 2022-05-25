import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import auth from "../firebase.init";
const useIsAdmin = (user) => {
  const [admin, setAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const email = user?.email;
  console.log(email);
  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/admin/${email}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      })
        .then((res) => {
          if (res?.status === 401 || res?.status === 403) {
            signOut(auth);
            localStorage.getItem("access-token");
            toast.error("Please reLogin");
          }
          return res.json();
        })
        .then((data) => {
          const isAdmin = data?.admin;
          setAdmin(isAdmin);
          setIsLoading(false);
        });
    }
  }, [user, email]);
  return [admin, isLoading];
};
export default useIsAdmin;
