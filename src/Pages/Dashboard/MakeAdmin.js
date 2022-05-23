import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import auth from "../../firebase.init";

const MakeAdmin = () => {
  const [user] = useAuthState(auth);
  const { data: users, isLoading } = useQuery("users", () =>
    fetch(`http://localhost:5000/users?email=${user.email}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        signOut(auth);
        Navigate("/");
        localStorage.removeItem("access-token");
      }
      return res.json();
    })
  );
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div class="overflow-x-auto w-11/12 bg-neutral rounded-lg mx-auto">
      <table class="table mx-auto my-10 w-10/12">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Make Admin</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr className="hover">
              <td>
                <div class="flex items-center space-x-3">
                  <div class="avatar">
                    <div className="avatar online">
                      <div class="mask mask-squircle w-12 h-12">
                        <img
                          src={user?.img}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">{user?.name}</div>
                  </div>
                </div>
              </td>
              <td>{user?.email}</td>
              <th>
                <button class="btn btn-accent btn-xs"> Admin</button>
              </th>
              <th>
                <button class="btn btn-success btn-xs">Make Admin</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MakeAdmin;
