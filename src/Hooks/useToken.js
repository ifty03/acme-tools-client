import { useEffect, useState } from "react";

const useToken = (user) => {
  const [token, setToken] = useState("");
  const email = user?.user?.email;
  const name = user?.user.displayName;
  console.log(user);
  console.log(name);
  useEffect(() => {
    if (email) {
      console.log(user);
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
