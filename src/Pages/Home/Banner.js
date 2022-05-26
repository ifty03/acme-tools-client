import React from "react";
import bg from "../../Assets/images/bg2.png";
import bannerImg from "../../Assets/images/banner.png";

const Banner = () => {
  return (
    <section class="relative bg-base-100">
      <img
        class="absolute inset-0 object-[75%] sm:object-[25%] object-cover w-full h-full opacity-25 sm:opacity-100"
        src={bg}
        alt="Couple on a bed with a dog"
      />

      <div class="hidden sm:block sm:inset-0 sm:absolute sm:bg-gradient-to-r sm:from-base-100 sm:to-transparent"></div>

      <div class="relative max-w-screen-xl px-4 md:py-32 py-10 md:ml-24  lg:h-screen items-center flex flex-wrap-reverse">
        <div class="max-w-xl text-center sm:text-left">
          <h1 class="text-3xl font-extrabold sm:text-5xl">
            Let us find your
            <strong class="font-extrabold text-primary sm:block">
              Forever Home.
            </strong>
          </h1>

          <p class="max-w-lg mt-4 sm:leading-relaxed sm:text-xl">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            illo tenetur fuga ducimus numquam ea!
          </p>

          <div class="flex flex-wrap gap-4 mt-8 text-center">
            <a
              class="block w-full px-12 py-3 text-sm font-medium text-white rounded shadow bg-primary sm:w-auto active:bg-primary hover:bg-primary focus:outline-none focus:ring"
              href="/get-started"
            >
              Get Started
            </a>

            <a
              class="block w-full px-12 py-3 text-sm font-medium bg-white rounded shadow text-primary sm:w-auto hover:text-primary active:text-primary focus:outline-none focus:ring"
              href="/about"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
