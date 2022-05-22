import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../../Components/Loading/Loading";
import auth from "../../firebase.init";

const AddReview = () => {
  const [user, loading] = useAuthState(auth);
  const [ratting, setRatting] = useState(3);
  if (loading) {
    return <Loading />;
  }

  const handelReview = (e) => {
    e.preventDefault();
    const rate = ratting;
    const review = e.target.review.value;
    console.log(rate, review);
  };
  return (
    <div className="flex flex-col max-w-xl p-8 shadow-sm rounded-xl lg:p-12 bg-neutral min-h-screen text-gray-300 mt-10">
      <div className="flex flex-col items-center w-full">
        <h2 className="text-3xl font-semibold text-center">
          Your opinion matters!
        </h2>
        <div className="flex flex-col items-center py-6 space-y-3">
          <span className="text-center">How was your experience?</span>

          <div class="rating rating-md">
            <input
              type="radio"
              onClick={() => setRatting(1)}
              name="rating-2"
              class="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              onClick={() => setRatting(2)}
              name="rating-2"
              class="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              onClick={() => setRatting(3)}
              name="rating-2"
              class="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              onClick={() => setRatting(4)}
              name="rating-2"
              class="mask mask-star-2 bg-orange-400"
              checked
            />
            <input
              onChange={(e) => setRatting(e.target.value)}
              type="radio"
              onClick={() => setRatting(5)}
              name="rating-2"
              class="mask mask-star-2 bg-orange-400"
            />
          </div>
        </div>
      </div>
      <form onSubmit={handelReview}>
        <div className="flex flex-col w-full">
          <textarea
            rows="3"
            name="review"
            placeholder="Message..."
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
        <a rel="noopener noreferrer" href="#" className="text-sm text-gray-300">
          Maybe later
        </a>
      </div>
    </div>
  );
};

export default AddReview;
