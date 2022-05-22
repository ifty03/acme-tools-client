import React from "react";
import Review from "./Review";
import { BsEmojiSmileFill } from "react-icons/bs";

const Reviews = () => {
  return (
    <div>
      <h2 className="text-secondary text-3xl md:text-4xl font-semibold my-16 flex items-center justify-center">
        Our happy client say <BsEmojiSmileFill className="ml-3" />
      </h2>
      <div className=" grid md:grid-cols-2 grid-cols-1 gap-7 w-11/12 mx-auto">
        <Review />
        <Review />
        <Review />
        <Review />
      </div>
    </div>
  );
};

export default Reviews;
