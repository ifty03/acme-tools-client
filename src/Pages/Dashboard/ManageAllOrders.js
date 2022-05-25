import { signOut } from "firebase/auth";
import React from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import auth from "../../firebase.init";
import Order from "./Order";

const ManageAllOrders = () => {
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery("allOrders", () =>
    fetch("http://localhost:5000/allOrders", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }).then((res) => {
      if (res?.status === 401 || res?.status === 403) {
        signOut(auth);
        toast.error("Please reLogin");
        localStorage.removeItem("access-token");
        Navigate("/home");
      }
      return res.json();
    })
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid lg:grid-cols-2 gap-5 mx-6 rounded-lg my-8 bg-neutral p-6">
      {orders.map((order) => (
        <Order key={order?._id} order={order} refetch={refetch}></Order>
      ))}
    </div>
  );
};

export default ManageAllOrders;
