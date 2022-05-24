import React from "react";
import { useQuery } from "react-query";
import Loading from "../../Components/Loading/Loading";

const ManageProducts = () => {
  const {
    data: tools,
    isLoading,
    refetch,
  } = useQuery("manageTools", () =>
    fetch("http://localhost:5000/allTools").then((res) => res.json())
  );
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="overflow-x-auto w-11/12 bg-neutral rounded-lg mx-auto">
      <table className="table mx-auto my-10 w-10/12">
        <thead>
          <tr>
            <th>Name</th>
            <th>Product Id</th>
            <th>Available</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {tools?.map((tool) => (
            <tr key={tool?._id} className="hover">
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="avatar online">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={tool?.img}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="font-bold">
                    <span className="flex items-center">{tool?.name}</span>
                  </div>
                </div>
              </td>
              <td>
                <div class="">{tool?._id}</div>
              </td>
              <td>
                <div class="badge">{tool?.available}</div>
              </td>
              <th>
                <span class="badge">{tool?.price}</span>
              </th>
              <th>
                <button className="btn btn-error btn-xs">Delete</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
