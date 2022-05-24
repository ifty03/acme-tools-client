import React from "react";
import { useQuery } from "react-query";
import Loading from "../../../Components/Loading/Loading";
import Tool from "./Tool";

const Tools = () => {
  const {
    data: tools,
    isLoading,
    refetch,
  } = useQuery("tools", () =>
    fetch("https://sheltered-journey-62217.herokuapp.com/tools").then((res) =>
      res.json()
    )
  );

  if (isLoading) {
    return <Loading />;
  }
  console.log(tools?.length);
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7 w-11/12 mx-auto mt-16">
      {tools.map((tool) => (
        <Tool key={tool?._id} tool={tool}></Tool>
      ))}
    </div>
  );
};

export default Tools;
