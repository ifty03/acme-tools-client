import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import Loading from "../../Components/Loading/Loading";
import { FaIdCard } from "react-icons/fa";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MyOrders = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery("orders", () =>
    fetch(`http://localhost:5000/orders?email=${user?.email}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
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
    <div className="overflow-x-auto w-11/12 bg-neutral rounded-lg mx-auto">
      <table className="table mx-auto my-10 w-10/12">
        <thead>
          <tr>
            <th>Name</th>
            <th>Product Id</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order?._id} className="hover">
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="avatar online">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={order?.img}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="font-bold">
                    <span className="flex items-center">{order?.name}</span>
                  </div>
                </div>
              </td>
              <td>
                <div class="">{order?.productId}</div>
              </td>
              <td>
                <div class="badge">{order?.quantity}</div>
              </td>
              <td>
                <span class="badge">{order?.totalPrice}</span>
              </td>
              <td>
                <button
                  onClick={() => navigate(`/dashboard/pay/${order?._id}`)}
                  className="btn btn-success btn-xs "
                >
                  <FaIdCard /> <span className="font-semibold ml-2">Pay</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
