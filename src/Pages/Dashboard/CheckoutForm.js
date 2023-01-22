import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import auth from "../../firebase.init";

const CheckoutForm = ({ order }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [tranjectionId, setTranjectionId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  // const { totalPrice, phone, email, _id } = order;

  const totalPrice = order?.totalPrice;
  const phone = order?.phone;
  const email = order?.email;
  const _id = order?._id;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (totalPrice) {
      fetch("https://acme-tools-server-production.up.railway.app/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
        body: JSON.stringify({ totalPrice }),
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
          if (data?.clientSecret) {
            setClientSecret(data.clientSecret);
          }
          if (!data?.clientSecret) {
            signOut(auth);
            toast.error("Please reLogin Your clientSecret doesn't find");
          }
        });
    }
  }, [totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      setProcessing(false);
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setProcessing(false);
      setCardError(error.message);
      console.log("[error]", error);
    } else {
      setProcessing(true);
      setCardError("");
      console.log("[PaymentMethod]", paymentMethod);
    }

    setProcessing(true);
    /* confirm card payment */
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: email,
            phone: phone,
          },
        },
      });
    if (intentError) {
      setSuccess("");
      setProcessing(false);
      setTranjectionId("");
      setCardError(intentError?.message);
    } else {
      const payment = {
        paid: true,
        status: "pending",
        transitionId: paymentIntent.id,
      };

      setCardError("");
      setProcessing(false);
      setSuccess("Your payment is successfully done !");
      setTranjectionId(`Transaction Id: ${paymentIntent.id}`);
      toast.success("Hurray your payment is successfully done");

      /* store payment data in database */
      fetch(`https://acme-tools-server-production.up.railway.app/payment/${_id}`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(payment),
      })
        .then((res) => {
          if (res.status === 401 || res.status === 403) {
            signOut(auth);
            toast.error("Please reLogin");
            setProcessing(false);
            localStorage.removeItem("access-token");
            Navigate("/home");
          }
          return res.json();
        })
        .then((data) => setProcessing(false));
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#aab7c4",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />

      {processing ? (
        <div className="flex justify-start">
          <button className="btn loading btn-success btn-xs mt-5">
            Processing
          </button>
        </div>
      ) : (
        <button
          className="btn btn-success btn-xs mr-auto block w-fit mt-5"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      )}
      <p className="text-error pt-4 text-left">{cardError} </p>
      <p className="text-success pt-4 text-left">{success} </p>
      <p className="text-success pt-4 text-left">{tranjectionId} </p>
    </form>
  );
};

export default CheckoutForm;
