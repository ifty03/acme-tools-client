import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";
import { HiCheckCircle } from "react-icons/hi";
import Loading from "../../Components/Loading/Loading";
import auth from "../../firebase.init";

const MakeAdmin = () => {
  const [user] = useAuthState(auth);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminId, setAdminId] = useState(0);
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("users", () =>
    fetch(
      `https://sheltered-journey-62217.herokuapp.com/users?email=${user.email}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      }
    ).then((res) => {
      if (res.status === 401 || res.status === 403) {
        signOut(auth);
        Navigate("/");
        localStorage.removeItem("access-token");
      }
      return res.json();
    })
  );

  /* make a admin */
  const handelAdmin = (email, name) => {
    setAdminLoading(true);
    fetch(
      `https://sheltered-journey-62217.herokuapp.com/makeAdmin/${user?.email}`,
      {
        method: "PUT",
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    )
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          signOut(auth);
          Navigate("/");
          localStorage.removeItem("access-token");
        }
        return res.json();
      })
      .then((data) => {
        setAdminLoading(false);
        refetch();
        toast.success(`Make ${name} as admin`);
      });
  };
  /* remove a admin */
  const cancelAdmin = (email, name) => {
    setAdminLoading(true);
    fetch(
      `https://sheltered-journey-62217.herokuapp.com/cancelAdmin/${user?.email}`,
      {
        method: "PUT",
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    )
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          signOut(auth);
          Navigate("/");
          localStorage.removeItem("access-token");
        }
        return res.json();
      })
      .then((data) => {
        setAdminLoading(false);
        refetch();
        toast.success(`cancel ${name} admin`);
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="overflow-x-auto w-11/12 bg-neutral rounded-lg mx-auto">
      <table className="table mx-auto my-10 w-10/12">
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
            <tr key={user?._id} className="hover">
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="avatar online">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={user?.img}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">
                      <span className="flex items-center">
                        {user?.name}
                        {user?.role === "admin" && (
                          <HiCheckCircle className="text-blue-600" />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </td>
              <td>{user?.email}</td>
              <th>
                {user?.role === "admin" ? (
                  <button className="btn btn-accent btn-xs"> Admin</button>
                ) : (
                  <button className="btn btn-accent btn-xs"> User</button>
                )}
              </th>
              <th>
                {user?.role === "admin" ? (
                  <button
                    onClick={() => {
                      setAdminId(user?._id);
                      cancelAdmin(user?.email, user?.name);
                    }}
                    className={
                      adminLoading && user?._id == adminId
                        ? "btn btn-error btn-xs loading"
                        : "btn btn-error btn-xs"
                    }
                  >
                    Cancel Admin
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setAdminId(user?._id);
                      handelAdmin(user?.email, user?.name);
                    }}
                    className={
                      adminLoading && user?._id == adminId
                        ? "btn btn-success loading btn-xs"
                        : "btn btn-success btn-xs"
                    }
                  >
                    Make Admin
                  </button>
                )}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MakeAdmin;
