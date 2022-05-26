import { useEffect, useState } from "react";
const useToken = (user) => {
  const [token, setToken] = useState("");
  const email = user?.user?.email;
  useEffect(() => {
    if (email) {
      fetch(`https://sheltered-journey-62217.herokuapp.com/user/${email}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then((data) => localStorage.setItem("access-token", data?.token));
    }
  }, [email, user]);
  return [token, setToken];
};
export default useToken;
