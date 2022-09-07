import React, { useState } from "react";
import add from "../../Assets/images/addNew.gif";
import { FcAddImage } from "react-icons/fc";
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

const AddProduct = () => {
  const [image, setImage] = useState("");
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);
  const [postLoading, setPostLoading] = useState(false);
  const handelAddItem = (e) => {
    e.preventDefault();
    setPostLoading(true);
    const name = e.target.name.value;
    const description = e.target.description.value;
    const price = +e.target.price.value;
    const minimum = +e.target.minimum.value;
    const maximum = +e.target.maximum.value;
    const available = +e.target.available.value;

    const formData = new FormData();
    formData.append("image", image);
    if (+min <= +max) {
      fetch(
        "https://api.imgbb.com/1/upload?key=4e5496fb21839e6c601d34be6bd9fb10",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          if (result?.success) {
            const product = {
              name,
              description,
              price,
              minimum,
              maximum,
              available,
              img: result?.data?.url,
            };
            fetch("https://sheltered-journey-62217.herokuapp.com/product", {
              method: "POST",
              headers: {
                authorization: `Bearer ${localStorage.getItem("access-token")}`,
                "content-type": "application/json",
              },
              body: JSON.stringify(product),
            })
              .then((res) => {
                if (res.status === 401 || res.status === 403) {
                  signOut(auth);
                  toast.error("please reLogin");
                  Navigate("/home");
                }
                return res.json();
              })
              .then((data) => {
                setPostLoading(false);
                toast.success("Your product successfully uploaded");
                e.target.reset();
              });
          } else {
            setPostLoading(false);
          }
        });
    } else {
      toast.error("Please increase your available quantity");
    }
  };
  if (postLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-10 w-11/12 mx-auto bg-neutral p-8 rounded-lg mt-10">
        <div className="lg:col-span-5 flex lg:min-h-screen items-center">
          <img
            className="w-4/6 lg:w-full mx-auto"
            src={add}
            alt="all item img"
          />
        </div>
        <div className="lg:col-span-7">
          <div>
            <form
              onSubmit={handelAddItem}
              className="form-control mt-10 bg-base-300 p-7 rounded-lg"
            >
              <h2 className="text-2xl font bold mb-6 text-left text-primary">
                ADD A NEW PRODUCT
              </h2>
              <label className="mb-1 text-left">
                Product Name <span className="text-warning">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Product Name"
                className="input mb-3 text-[16px] input-bordered"
              />
              {/*  image  */}
              <label className="mb-1 text-left">
                Product Image <span className="text-warning">*</span>
              </label>
              <div className="flex items-center input input-bordered space-x-6">
                <div className="shrink-0">
                  <FcAddImage className="text-3xl" />
                </div>

                <label className="block">
                  <span className="sr-only cursor-pointer">Choose File</span>
                  <input
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                    required
                    className="block  w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-neutral file:text-blue-700 hover:file:bg-base-500 cursor-pointer"
                  />
                </label>
              </div>

              <label className="mb-1 text-left">
                Price <span className="text-warning">*</span>
              </label>
              <input
                type="number"
                name="price"
                required
                placeholder="Per unit price"
                className="input mb-3 text-[16px] input-bordered"
              />
              <label className="mb-1 text-left">
                Available <span className="text-warning">*</span>
              </label>
              <input
                type="number"
                name="available"
                onChange={(e) => setMax(e.target.value)}
                required
                placeholder="Available quantity"
                className="input mb-3 text-[16px] input-bordered"
              />
              {/* conditonal qiantity */}
              <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                <div>
                  <p className="mb-1 text-left">
                    Minimum Quantity <span className="text-warning">*</span>
                  </p>
                  <input
                    type="number"
                    name="minimum"
                    onChange={(e) => setMin(e.target.value)}
                    required
                    placeholder="Minimum Quantity"
                    className={
                      +min > +max
                        ? "input mb-3 text-[16px]  input-bordered input-error"
                        : "input mb-3 text-[16px]  input-bordered"
                    }
                  />
                  <small className="text-left text-error block -mt-2">
                    {+min > +max && `your available quantity is ${+max}`}
                  </small>
                </div>

                <div>
                  <p className="mb-1 text-left">
                    Maximum Quantity <span className="text-warning">*</span>
                  </p>
                  <input
                    type="number"
                    name="maximum"
                    required
                    disabled
                    value={max}
                    placeholder="Maximum Quantity"
                    className="input mb-3 text-[16px]  input-bordered"
                  />
                </div>
              </div>
              <label className="mb-1 text-left">
                description <span className="text-warning">*</span>
              </label>
              <textarea
                type="text"
                name="description"
                required
                placeholder="description"
                className="textarea mb-3 text-[16px] textarea-bordered"
              ></textarea>

              <input
                className="btn btn-primary mt-3 w-full"
                type="submit"
                value="SUBMIT"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
