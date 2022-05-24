import React from "react";
import { useNavigate } from "react-router-dom";

const Tool = ({ tool }) => {
  const { name, maximum, minimum, price, available, description, img, _id } =
    tool;
  const navigate = useNavigate();
  console.log(img);
  return (
    <div className="card max-w-96 bg-neutral shadow-xl">
      <figure>
        <img src={img} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {name}
          <div className="badge badge-secondary">Sold</div>
        </h2>
        <p>
          <span>Available: </span>
          {available}
        </p>
        <p>
          <span>Minimum: </span>
          {minimum}
        </p>
        <p>
          <span>Maximum: </span>
          {maximum}
        </p>
        <p>
          <span>Price: </span>
          {price}
        </p>
        <p>
          <span>Description</span>
          {description}
        </p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Limited</div>
          <div className="badge badge-outline">Effective</div>
        </div>
        <button
          onClick={() => navigate(`/payment/${_id}`)}
          className="btn btn-primary w-fit ml-auto mt-5"
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default Tool;
