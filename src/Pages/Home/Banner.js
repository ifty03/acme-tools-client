import React from "react";
import bg from "../../Assets/images/bg2.png";
import bannerImg from "../../Assets/images/banner.png";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="relative bg-base-100">
      <img
        className="absolute inset-0 object-[75%] sm:object-[25%] object-cover w-full h-full opacity-25 sm:opacity-100"
        src={bg}
        alt="Couple on a bed with a dog"
      />

      <div className="hidden sm:block sm:inset-0 sm:absolute sm:bg-gradient-to-r sm:from-base-100 sm:to-transparent"></div>

      <div className="relative max-w-screen-xl px-4 md:py-32 py-10 md:ml-24  lg:h-screen items-center flex flex-wrap-reverse">
        <div className="max-w-xl text-center sm:text-left">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Tools is Small
            <strong className="font-extrabold text-primary sm:block">
              But Very Usefull
            </strong>
          </h1>

          <p className="max-w-lg mt-4 sm:leading-relaxed sm:text-xl">
            A tool can be any item that is used to achieve a goal. Equipment
            usually denotes a set of tools that are used to achieve a specific
            objective
          </p>

          <div className="flex flex-wrap gap-4 mt-8 text-center">
            <Link
              className="block w-full px-12 py-3 text-sm font-medium text-white rounded shadow bg-primary sm:w-auto active:bg-primary hover:bg-primary focus:outline-none focus:ring"
              to="/dashboard"
            >
              Get Started
            </Link>

            <Link
              className="block w-full px-12 py-3 text-sm font-medium text-black bg-white rounded shadow sm:w-auto hover:text-primary active:text-primary focus:outline-none focus:ring"
              to="/portfolio"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
