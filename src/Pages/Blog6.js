import React from "react";
import Badge from "./Badge";

const Blog6 = () => {
  return (
    <article class="p-6 bg-neutral mt-8 sm:p-8 shadow-md shadow-blue-900 lg:w-4/6 md:w-5/6 w-11/12 mx-auto rounded-xl ">
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
            Question No: 6
          </strong>

          <h2 class="mt-4 text-lg text-left font-medium sm:text-xl">
            $ What is a unit test? Why should write unit tests?
          </h2>
          <p class="mt-3 text-md text-left">
            <strong>Answer: </strong> A unit test is a way of testing a unit -
            the smallest piece of code that can be logically isolated in a
            system. In most programming languages, that is a function, a
            subroutine, a method or property. The isolated part of the
            definition is important. In his book "Working Effectively with
            Legacy Code", author Michael Feathers states that such tests are not
            unit tests when they rely on external systems: “If it talks to the
            database, it talks across the network, it touches the file system,
            it requires system configuration, or it can't be run at the same
            time as any other test."
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
              <p class="ml-1 text-xs font-medium">07/03/2020</p>
            </div>

            <span class="hidden sm:block" aria-hidden="true">
              &middot;
            </span>

            <p class="mt-2 text-xs font-medium text-gray-400 sm:mt-0">
              Writer: Mohammad naim
            </p>
          </div>
        </div>
      </div>
      {/* button badge */}
      <Badge>filter</Badge>
    </article>
  );
};

export default Blog6;
