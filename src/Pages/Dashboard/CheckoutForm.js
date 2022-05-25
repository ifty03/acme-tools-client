import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CheckoutForm = ({ order }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [tranjectionId, setTranjectionId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const { totalPrice, phone, email } = order;
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify({ totalPrice }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      });
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
      setCardError("");
      setProcessing(false);
      setSuccess("Your payment is successfully done !");
      setTranjectionId(`Transaction Id: ${paymentIntent.id}`);
      console.log(paymentIntent);
      toast.success("Hurray your payment is successfully done");
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
          <button class="btn loading btn-success btn-xs mt-5">
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
