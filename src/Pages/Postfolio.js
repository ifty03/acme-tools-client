import React from "react";
import project1 from "../../src/Assets/images/Screenshot_3.png";
import project2 from "../../src/Assets/images/Innovative fitness (1).png";
import project3 from "../../src/Assets/images/WMS 360.png";
import project4 from "../../src/Assets/images/React App.png";
import AboutMe from "../Components/AboutMe";

const Postfolio = () => {
  return (
    <div>
      <AboutMe />
      <h2 className="text-center text-2xl font-semibold mt-6">
        My Recent works
      </h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 w-11/12 mx-auto mt-10">
        <a
          className="relative block bg-neutral shadow-md shadow-blue-900"
          href=" https://courageous-paprenjak-b4c447.netlify.app/"
          target="_blank"
        >
          <button
            className="absolute p-2 text-black bg-accent rounded-full right-4 top-4"
            type="button"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </button>

          <img
            className=" w-full h-56 lg:h-72"
            src={project1}
            alt="Build Your Own Drone"
            loading="lazy"
          />

          <div className="p-6">
            <h3 className="w-fit text-black px-3 py-1 text-left text-xs font-medium bg-primary">
              Computer mart
            </h3>

            <h5 className="mt-4 text-lg font-bold text-left">
              Build a own dashboard
            </h5>

            <p className="mt-2 text-sm text-gray-300 text-left">
              Developed by <a href="/">Ashikul islam</a>
            </p>

            <button
              className="block w-full p-4 mt-4 text-sm font-medium bg-primary text-black rounded-sm"
              type="button"
            >
              View live demo
            </button>
          </div>
        </a>
        {/* second project */}
        <a
          className="relative block bg-neutral shadow-md shadow-blue-900"
          href=" https://independent-gym-trainer.web.app/"
          target="_blank"
        >
          <button
            className="absolute p-2 text-black bg-accent rounded-full right-4 top-4"
            type="button"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </button>

          <img
            className=" w-full h-56 lg:h-72"
            src={project2}
            alt="Build Your Own Drone"
            loading="lazy"
          />

          <div className="p-6">
            <h3 className="w-fit text-black px-3 py-1 text-left text-xs font-medium bg-primary">
              Innovative fitness
            </h3>

            <h5 className="mt-4 text-lg font-bold text-left">
              This website is independent gym trainer
            </h5>

            <p className="mt-2 text-sm text-gray-300 text-left">
              Developed by <a href="/">Ashikul islam</a>
            </p>

            <button
              className="block w-full p-4 mt-4 text-sm font-medium bg-primary text-black rounded-sm"
              type="button"
            >
              View live demo
            </button>
          </div>
        </a>
        {/* third project */}
        <a
          className="relative block bg-neutral shadow-md shadow-blue-900"
          href=" https://car-warehouse-as-11.web.app/"
          target="_blank"
        >
          <button
            className="absolute p-2 text-black bg-accent rounded-full right-4 top-4"
            type="button"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </button>

          <img
            className=" w-full h-56 lg:h-72"
            src={project3}
            alt="Build Your Own Drone"
            loading="lazy"
          />

          <div className="p-6">
            <h3 className="w-fit text-black px-3 py-1 text-left text-xs font-medium bg-primary">
              WMS Stock management
            </h3>

            <h5 className="mt-4 text-lg font-bold text-left">
              This is stock management website
            </h5>

            <p className="mt-2 text-sm text-gray-300 text-left">
              Developed by <a href="/">Ashikul islam</a>
            </p>

            <button
              className="block w-full p-4 mt-4 text-sm font-medium bg-primary text-black rounded-sm"
              type="button"
            >
              View live demo
            </button>
          </div>
        </a>
        {/* forth project */}
        <a
          className="relative block bg-neutral shadow-md shadow-blue-900"
          href=" https://todo-project-69953.web.app/"
          target="_blank"
        >
          <button
            className="absolute p-2 text-black bg-accent rounded-full right-4 top-4"
            type="button"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </button>

          <img
            className=" w-full h-56 lg:h-72"
            src={project4}
            alt="Build Your Own Drone"
            loading="lazy"
          />

          <div className="p-6">
            <h3 className="w-fit text-black px-3 py-1 text-left text-xs font-medium bg-primary">
              Todo App
            </h3>

            <h5 className="mt-4 text-lg font-bold text-left">
              This is todo app
            </h5>

            <p className="mt-2 text-sm text-gray-300 text-left">
              Developed by <a href="/">Ashikul islam</a>
            </p>

            <button
              className="block w-full p-4 mt-4 text-sm font-medium bg-primary text-black rounded-sm"
              type="button"
            >
              View live demo
            </button>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Postfolio;
