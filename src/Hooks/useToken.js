import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";

const useToken = (user) => {
  const [token, setToken] = useState("");
  const [currentUser] = useAuthState(auth);
  const email = user?.user?.email;
  const name = user?.user.displayName;
  console.log(currentUser?.displayName);
  console.log(currentUser?.email);

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/user/${email}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, name }),
      })
        .then((res) => res.json())
        .then((data) => localStorage.setItem("access-token", data?.token));
    }
  }, [email, name, user]);
  return [token, setToken];
};
export default useToken;
