import React from "react";
import { useParams } from "react-router-dom";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import Loading from "../../Components/Loading/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const Pay = () => {
  const { payId } = useParams();
  const [user] = useAuthState(auth);
  const stripePromise = loadStripe(
    "pk_test_51L1TVtFBIaSlFfNXVsw7wg2WrEnZ7w8b0amGGpxAiJT7sns5U0VhzfKI57g3Pdd0alwzvLSyZDeaQJPRT88ieIif00GQdQn6kg"
  );

  const { data: order, isLoading } = useQuery(["payOrder", payId], () =>
    fetch(`http://localhost:5000/order/${payId}`, {
      headers: {
        authorization: `Berar ${localStorage.getItem("access-token")}`,
      },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        signOut(auth);
        toast.error("please reLogin");
        localStorage.removeItem("access-token");
      }
      return res.json();
    })
  );
  if (isLoading) {
    return <Loading />;
  }
  console.log(order);
  return (
    <div className="bg-neutral lg:w-7/12 md:w-4/6 mx-auto p-8 mt-5 rounded-lg ">
      <div class="card mx-auto  bg-base-100 shadow-lg shadow-blue-900">
        <div class="card-body">
          <div class="mockup-code">
            <pre>
              <div className="px-5 -mt-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-[1px] border-primary">
                    <img src={user?.photoURL} alt="profile" />
                  </div>
                  <h2 className="ml-2 text-lg text-primary font-semibold">
                    {user?.displayName}
                  </h2>
                </div>
                <h2 class="card-title mt-2">
                  Hi,
                  <span className="text-primary text-sm -mb-2">
                    {user?.displayName}
                  </span>
                </h2>
                <h1 className="text-left mt-1">
                  Please Pay for{" "}
                  <span className="text-primary">{order?.name}</span>
                </h1>
                <p className="text-left mt-3">
                  <div class="badge badge-primary badge-xs"></div>{" "}
                  <span>
                    <span className="font-semibold">Quantity:</span>{" "}
                    {order?.quantity}
                  </span>
                </p>
                <p className="text-left mt-3">
                  <div class="badge badge-primary badge-xs"></div>{" "}
                  <span>
                    <span className="font-semibold">Total Price:</span> $
                    {order?.totalPrice}
                  </span>
                </p>
              </div>
            </pre>
          </div>
        </div>

        <div className="px-6 pb-6 pt-2">
          <Elements stripe={stripePromise}>
            <div className="bg-neutral mx-2 rounded-lg p-5 shadow-inner shadow-blue-900">
              <CheckoutForm order={order} />
            </div>
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Pay;
