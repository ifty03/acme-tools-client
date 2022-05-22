import React from "react";

const BusinessContact = () => {
  return (
    <div>
      <div className="card mx-auto flex-shrink-0 w-full max-w-lg">
        <h4 className="text-2xl mt-5 text-center text-secondary">Contact Us</h4>
        <div className="card-body">
          <div className="form-control">
            <input
              type="text"
              placeholder="Email Address"
              className="input mb-[12px] input-bordered"
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              placeholder="Subject"
              className="input mb-[12px] input-bordered"
            />
          </div>
          <div className="form-control">
            <textarea
              className="textarea textarea-secondary h-[136px]"
              placeholder="Your message"
            ></textarea>
          </div>
          <div className="form-control mt-6">
            <button className="btn px-8 w-fit mx-auto btn-primary text-black  bg-gradient-to-r from-secondary to-primary hover:bg-gradient-to-r hover:from-primary hover:to-secondary">
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessContact;
