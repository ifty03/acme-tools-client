import React from "react";
import Badge from "./Badge";

const Blog2 = () => {
  return (
    <article class="p-6 mt-8 bg-neutral sm:p-8 shadow-md shadow-blue-900 lg:w-4/6 md:w-5/6 w-11/12 mx-auto rounded-xl ">
      <div class="flex items-start">
        <div
          class="hidden sm:grid sm:h-20 sm:w-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-indigo-500"
          aria-hidden="true"
        >
          <div class="flex items-center gap-1">
            <span class="h-8 w-0.5 rounded-full bg-indigo-500"></span>
            <span class="h-6 w-0.5 rounded-full bg-indigo-500"></span>
            <span class="h-4 w-0.5 rounded-full bg-indigo-500"></span>
            <span class="h-6 w-0.5 rounded-full bg-indigo-500"></span>
            <span class="h-8 w-0.5 rounded-full bg-indigo-500"></span>
          </div>
        </div>

        <div class="sm:ml-8">
          <strong class="rounded border w-fit mr-auto block border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white">
            Question No: 2
          </strong>

          <h2 class="mt-4 text-lg text-left font-medium sm:text-xl">
            $ What are the different ways to manage a state in a React
            application?
          </h2>

          <p class="mt-3 text-md text-left">
            <strong>Answer: </strong> There are four main types of state you
            need to properly manage in your React apps.{" "}
            <strong>1. Local state</strong> Local state is data we manage in one
            or another component. <strong>2. Global state</strong> Global state
            is data we manage across multiple components.{" "}
            <strong> 3. Server state</strong> server is a Data that comes from
            an external server that must be integrated with our UI state.{" "}
            <strong>4. URL state</strong> url state is a Data that exists on our
            URLs, including the pathname and query parameters.
          </p>

          <div class="mt-4 sm:flex sm:items-center sm:gap-2">
            <div class="flex items-center text-gray-400">
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <p class="ml-1 text-xs font-medium">12/06/2022</p>
            </div>

            <span class="hidden sm:block" aria-hidden="true">
              &middot;
            </span>

            <p class="mt-2 text-xs font-medium text-gray-400 sm:mt-0">
              Writer: Ashikul islam ifty
            </p>
          </div>
        </div>
      </div>
      {/* button badge */}
      <Badge>React State</Badge>
    </article>
  );
};

export default Blog2;
