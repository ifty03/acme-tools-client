import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading/Loading";
import auth from "../../firebase.init";

const AddReview = () => {
  const [user, loading] = useAuthState(auth);
  const [ratting, setRatting] = useState(3);
  const [reviewLoading, setReviewLoading] = useState(false);
  if (loading || reviewLoading) {
    return <Loading />;
  }

  const handelReview = (e) => {
    setReviewLoading(true);
    e.preventDefault();
    const rate = ratting;
    const description = e.target.review.value;
    const name = user?.displayName;
    const img = user?.photoURL;
    const review = { rate, name, description, img, email: user?.email };
    if (description.length > 50 && description.length < 250) {
      fetch("https://acme-tools-server.vercel.app/reviews", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(review),
      })
        .then((res) => res.json())
        .then((data) => {
          setReviewLoading(false);
          if (data?.insertedId) {
            Swal.fire({
              icon: "success",
              title: "Yeah...",
              text: "Thanks for your valuable review",
              footer: '<a href="">Explore more</a>',
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              footer: '<a href="">Why do I have this issue?</a>',
            });
          }
        });
    } else {
      setReviewLoading(false);
      toast.error("please say opinion min 50 and max 250 characters");
    }
  };
  return (
    <div className="min-h-screen">
      <div className="flex flex-col max-w-lg mx-auto p-8 shadow-sm rounded-xl lg:p-12 bg-neutral  text-gray-300 mt-10">
        <div className="flex flex-col items-center w-full">
          <h2 className="text-3xl font-semibold text-center">
            Your opinion matters!
          </h2>
          <div className="flex flex-col items-center py-6 space-y-3">
            <span className="text-center">How was your experience?</span>

            <div className="rating rating-md">
              <input
                type="radio"
                onClick={() => setRatting(1)}
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                onClick={() => setRatting(2)}
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                onClick={() => setRatting(3)}
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                onClick={() => setRatting(4)}
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
                checked
              />
              <input
                onChange={(e) => setRatting(e.target.value)}
                type="radio"
                onClick={() => setRatting(5)}
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
            </div>
          </div>
        </div>
        <form onSubmit={handelReview}>
          <div className="flex flex-col w-full">
            <textarea
              rows="3"
              name="review"
              required
              placeholder="say opinion min 50 and max 250 characters..."
              className="p-4 rounded-md resize-none text-gray-400 bg-base-100"
            ></textarea>
            <button
              type="submit"
              className="py-4 my-8 font-semibold rounded-md text-gray-800 bg-primary"
            >
              Leave feedback
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center">
          <a
            rel="noopener noreferrer"
            href="#"
            className="text-sm text-gray-300"
          >
            Maybe later
          </a>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
