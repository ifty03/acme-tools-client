import { signOut } from "firebase/auth";
import React from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading/Loading";
import auth from "../../firebase.init";

const ManageProducts = () => {
  const {
    data: tools,
    isLoading,
    refetch,
  } = useQuery("manageTools", () =>
    fetch("https://acme-tools-server-production.up.railway.app/allTools", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
        "content-type": "application/json",
      },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        signOut(auth);
        localStorage.removeItem("access-token");
        toast.error("please-reLogin");
      }
      return res.json();
    })
  );

  const handelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://acme-tools-server-production.up.railway.app/tool/${id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
          .then((res) => {
            if (res.status === 401 || res.status === 403) {
              signOut(auth);
              localStorage.removeItem("access-token");
              Navigate("/home");
            }
            return res.json();
          })
          .then((data) => {
            refetch();
            toast.success("Product successfully deleted");
          });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

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
                <div className="">{tool?._id}</div>
              </td>
              <td>
                <div className="badge">{tool?.available}</div>
              </td>
              <th>
                <span className="badge">{tool?.price}</span>
              </th>
              <th>
                <button
                  onClick={() => handelDelete(tool._id)}
                  className="btn btn-error btn-xs"
                >
                  Delete
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
