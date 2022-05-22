import React from "react";
import { useNavigate } from "react-router-dom";

const Tool = () => {
  const navigate = useNavigate();
  return (
    <div className="card max-w-96 bg-neutral shadow-xl">
      <figure>
        <img
          src="https://media.wickes.co.uk/is/image/wickes/normal/Pliers-Wickes-Heavy-Duty-Pliers-200mm-Pack-of-3~T3274_200395_00?$ratio43$&fit=crop"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          Shoes!
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div>
        <button
          onClick={() => navigate(`/payment/id`)}
          className="btn btn-primary w-fit ml-auto mt-5"
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default Tool;
