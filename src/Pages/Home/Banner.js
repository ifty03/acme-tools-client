import React from "react";
import bg from "../../Assets/images/bg.png";

const Banner = () => {
  return (
    <div
      class="hero lg:min-h-screen"
      style={{
        backgroundImage: `url(${bg})`,

        backgroundRepeat: "no-repeat",
      }}
    >
      <div class="hero-overlay md:py-0  bg-opacity-60"></div>
      <div class="hero-content text-center my-12 lg:my-0 text-neutral-content">
        <div class="max-w-md">
          <h1 class="mb-5 md:text-6xl text-5xl font-bold">Small but useful</h1>
          <h4 className="mb-5 text-3xl ">
            Small is the solution to big things
          </h4>
          <p class="mb-5 text-lg">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button class="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
