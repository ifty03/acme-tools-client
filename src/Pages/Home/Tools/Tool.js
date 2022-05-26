import React from "react";
import { useNavigate } from "react-router-dom";
import Fade from "react-reveal/Fade";

const Tool = ({ tool }) => {
  const { name, maximum, minimum, price, available, description, img, _id } =
    tool;
  const navigate = useNavigate();
  return (
    <Fade left>
      <div className="card max-w-96 bg-neutral shadow-xl">
        <figure>
          <img src={img} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {name}
            <div className="badge badge-secondary">Sold</div>
          </h2>
          <div className="flex flex-start mt-2 items-center">
            <div className="badge badge-xs badge-accent mr-2"></div>
            <span className="text-lg font-semibold mr-2">Available: </span>
            {available}
          </div>
          <div className="flex flex-start -mt-2 items-center">
            <div className="badge badge-xs badge-accent mr-2"></div>
            <span className="text-lg font-semibold mr-2">Minimum: </span>
            {minimum}
          </div>
          <div className="flex flex-start -mt-2 items-center">
            <div className="badge badge-xs badge-accent mr-2"></div>
            <span className="text-lg font-semibold mr-2">Maximum: </span>
            {maximum}
          </div>
          <div className="flex flex-start -mt-2 items-center">
            <div className="badge badge-xs badge-accent mr-2"></div>
            <span className="text-lg font-semibold mr-2">Price: </span>
            {price}
          </div>
          <div className="flex flex-start -mt-2 items-center">
            <div className="badge badge-xs badge-accent mr-2"></div>
            <span className="text-lg font-semibold mr-2">Description: </span>
          </div>
          <p title={description} className="text-left">
            {description.slice(0, 70)}
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
    </Fade>
  );
};

export default Tool;
