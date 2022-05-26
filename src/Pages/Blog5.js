import React from "react";
import Badge from "./Badge";

const Blog5 = () => {
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
            Question No: 5
          </strong>

          <h2 class="mt-4 text-lg text-left font-medium sm:text-xl md:w-4/6">
            $ You have an array of products. Each product has a name,
            <br /> price, description, etc. How will you implement <br /> a
            search to find products by name?
          </h2>
          <div class="mockup-code bg-base-100 mt-5 text-left  lg:w-5/6  w-20">
            <pre>
              <p className=" -mt-5 px-5">
                $ const products ={" "}
                {`[{name:"tesla",price:3,0000,description:"This is tesla"},
                {name:"volvo",price:31,000,description:"This is volvo"},
                {name:"vogati",price:5,0000,description:"This is vogati"},]`}
              </p>
            </pre>
            <pre data-prefix=">" class="text-warning px-5">
              <code>{`import React,{useState} from "react";
            const Search = () => {
                const [searchProduct,setSearchProduct]=useState("")
                const handelSearch =(search)=>{
                    const searchValue = products.filter(item=>item.name===search);
                    setSearchProduct(searchValue)
                }
                return (
                    <input onClick={(e)handelSearch(e.target.value)} type="text" />
                    <h1>This Search item name {searchProduct?.name}</h1>
                );
            };

    export default Blog5;`}</code>
            </pre>
          </div>
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

export default Blog5;
