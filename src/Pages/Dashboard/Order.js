import { signOut } from "firebase/auth";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import auth from "../../firebase.init";

const Order = ({ order, refetch }) => {
  console.log(refetch);
  const { email, name, img, status, paid, transitionId, address, phone, _id } =
    order;
  const [processing, setProcessing] = useState(false);

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
        fetch(`http://localhost:5000/order/${id}`, {
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

  const handelShipped = (id, status) => {
    if (status === "pending") {
      setProcessing(true);
      fetch(`http://localhost:5000/payment/${id}`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ status: "Shipped" }),
      })
        .then((res) => {
          if (res.status === 401 || res.status === 403) {
            setProcessing(false);
            signOut(auth);
            toast.error("Please reLogin");

            localStorage.removeItem("access-token");
            Navigate("/home");
          }
          console.log("i m from res");
          return res.json();
        })
        .then((data) => {
          setProcessing(false);
          refetch();
          toast.success("This order is Shipped !");
        });
    } else {
      toast.error("Order already Approved");
    }
  };

  return (
    <article class="bg-base-100 rounded-xl">
      <div class="flex items-start p-6">
        <a href="/" class="block shrink-0">
          <img
            src={img}
            alt="User Avatar"
            class="object-cover rounded-lg h-14 w-14"
          />
        </a>

        <div class="ml-4">
          <strong class="font-medium sm:text-lg">{name}</strong>

          <p class="text-sm  line-clamp-2 text-left">
            <span className="text-lg font-semibold"> Customer Email:</span>{" "}
            {email}
          </p>
          <p class="text-sm  line-clamp-2 text-left">
            <span className="text-lg font-semibold"> Address:</span> {address}
          </p>
          <p class="text-sm  line-clamp-2 text-left">
            <span className="text-lg font-semibold"> Phone Number:</span>{" "}
            {phone}
          </p>
          {transitionId ? (
            <p class="text-sm  line-clamp-2 text-left">
              <span className="text-lg font-semibold"> Transition Id:</span>{" "}
              <span className="text-accent ml-2">{transitionId}</span>
            </p>
          ) : (
            <p className="text-left">
              <span className="badge badge-outline badge-error">Unpaid</span>
            </p>
          )}
          {paid && !processing && (
            <button
              onClick={() => handelShipped(_id, status)}
              className={
                status === "pending"
                  ? "bg-secondary hover:bg-primary text-white font-semibold px-4 mt-5 rounded-tl-xl rounded-br-xl w-fit mr-auto block  btn-xs"
                  : "bg-green-600 text-white font-semibold px-4 mt-5 rounded-tl-xl rounded-br-xl w-fit mr-auto block  btn-xs"
              }
            >
              {status === "Shipped" ? "Approved" : status}
            </button>
          )}
          {processing && (
            <div className="flex justify-start">
              <button class="btn loading btn-secondary btn-xs mt-5">
                Processing...
              </button>
            </div>
          )}

          {!paid && (
            <button
              onClick={() => handelDelete(_id)}
              className="bg-error text-black hover:bg-red-500 font-semibold px-4 mt-5  rounded-tl-xl rounded-br-xl w-fit mr-auto block  btn-xs"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div class="flex justify-end">
        {paid && (
          <strong
            class={
              status === "pending"
                ? "-mr-[2px] -mb-[2px] mt-auto inline-flex items-center gap-1 rounded-tl-xl rounded-br-xl bg-secondary py-1.5 px-3 text-white"
                : "-mr-[2px] -mb-[2px] mt-auto inline-flex items-center gap-1 rounded-tl-xl rounded-br-xl bg-green-600 py-1.5 px-3 text-white"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>

            <span class="text-[10px] font-medium sm:text-xs">
              {status === "Shipped" ? "Approved" : status}
            </span>
          </strong>
        )}
        {!paid && (
          <strong class="-mr-[2px] -mb-[2px] mt-auto inline-flex items-center gap-1 rounded-tl-xl rounded-br-xl bg-error py-1.5 px-3 text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>

            <span class="text-[10px] font-medium sm:text-xs">Unpaid</span>
          </strong>
        )}
      </div>
    </article>
  );
};

export default Order;
