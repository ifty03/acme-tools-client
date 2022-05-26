import React from "react";
import Badge from "./Badge";

const Blog1 = () => {
  return (
    <article className="p-6 bg-neutral mt-8 sm:p-8 shadow-md shadow-blue-900 lg:w-4/6 md:w-5/6 w-11/12 mx-auto rounded-xl ">
      <div className="flex items-start">
        <div
          className="hidden sm:grid sm:h-20 sm:w-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-indigo-500"
          aria-hidden="true"
        >
          <div className="flex items-center gap-1">
            <span className="h-8 w-0.5 rounded-full bg-indigo-500"></span>
            <span className="h-6 w-0.5 rounded-full bg-indigo-500"></span>
            <span className="h-4 w-0.5 rounded-full bg-indigo-500"></span>
            <span className="h-6 w-0.5 rounded-full bg-indigo-500"></span>
            <span className="h-8 w-0.5 rounded-full bg-indigo-500"></span>
          </div>
        </div>

        <div className="sm:ml-8">
          <strong className="rounded border w-fit mr-auto block border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white">
            Question No: 1
          </strong>

          <h2 className="mt-4 text-lg text-left font-medium sm:text-xl">
            $ How will you improve the performance of a React Application?
          </h2>

          <p className="mt-3 text-md text-left">
            <strong>Answer: </strong> If you want to improve your react
            application performance. follow this steps, 1. Avoid Anonymous
            Functions. Since anonymous functions aren't assigned an identifier
            (via const/let/var), they aren't persistent whenever this functional
            component inevitably gets rendered again. you also Avoid Frequent
            Mounting/Unmounting and Avoid Object Literals for solve this
            performance you will use{" "}
            <strong>React.memo, React.lazy and React.Suspense</strong>
          </p>

          <div className="mt-4 sm:flex sm:items-center sm:gap-2">
            <div className="flex items-center text-gray-400">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <p className="ml-1 text-xs font-medium">12/06/2022</p>
            </div>

            <span className="hidden sm:block" aria-hidden="true">
              &middot;
            </span>

            <p className="mt-2 text-xs font-medium text-gray-400 sm:mt-0">
              Writer: Ashikul islam ifty
            </p>
          </div>
        </div>
      </div>
      {/* button badge */}
      <Badge>React Performance</Badge>
    </article>
  );
};

export default Blog1;
