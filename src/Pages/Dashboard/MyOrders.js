import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import Loading from "../../Components/Loading/Loading";
import { FaIdCard } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useIsAdmin from "../../Hooks/useIsAdmin";

const MyOrders = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [admin] = useIsAdmin(user);
  console.log(" ", admin);
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery("orders", () =>
    fetch(`https://acme-tools-server.vercel.app/orders?email=${user?.email}`, {
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

  /* handel delete one order */
  const handelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://acme-tools-server.vercel.app/order/${id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
            "content-type": "application/json",
          },
        })
          .then((res) => {
            if (res.status === 401 || res.status === 403) {
              signOut(auth);
              toast.error("Please reLogin");
              localStorage.removeItem("access-token");
              Navigate("/home");
            }
            return res.json();
          })
          .then((data) => {
            refetch();
            toast.success("Your order is canceled !");
          });

        Swal.fire("Canceled!", "Your order is canceled !", "success");
      }
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

            <th>Quantity</th>
            <th>Total Price</th>
            <th>Payment</th>
            <th>Action</th>
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
                <div className="badge">{order?.quantity}</div>
              </td>
              <td>
                <span className="badge">{order?.totalPrice}</span>
              </td>
              <td>
                {order?.paid ? (
                  <button className="btn btn-accent btn-xs">
                    {order?.status}
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/dashboard/pay/${order?._id}`)}
                    className="btn btn-success btn-xs "
                  >
                    <FaIdCard /> <span className="font-semibold ml-2">Pay</span>
                  </button>
                )}
              </td>
              <td>
                {order?.paid ? (
                  <div className="">
                    <p>Transition Id:</p>
                    <p className="text-accent">{order?.transitionId}</p>
                  </div>
                ) : (
                  <button
                    onClick={() => handelDelete(order?._id)}
                    className="btn btn-error btn-xs "
                  >
                    {" "}
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
