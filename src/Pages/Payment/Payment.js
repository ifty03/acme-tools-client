import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import auth from "../../firebase.init";

const Payment = () => {
  const [user] = useAuthState(auth);
  const [quantity, setQuantity] = useState(0);
  const { toolId } = useParams();

  const { data: tool, isLoading } = useQuery("tool", () =>
    fetch(`http://localhost:5000/tool/${toolId}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading />;
  }
  console.log(tool);
  const handelOrder = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const zip = e.target.zip.value;
    const country = e.target.country.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    const quantity = +e.target.quantity.value;
    const totalPrice = +e.target.totalPrice.value;
    const order = {
      name,
      email,
      zip,
      country,
      phone,
      address,
      quantity,
      totalPrice,
    };
    console.log(order);
  };
  return (
    <section>
      <h1 className="sr-only">Checkout</h1>

      <div className="relative mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="py-12 bg-base-100 md:py-24">
            <div className=" px-4 mx-auto lg:px-8">
              <div className="flex items-center">
                <div className="w-10 h-10 overflow-hidden border-[2px] border-primary rounded-full">
                  <img src={user?.photoURL} alt="" />
                </div>

                <h2 className="ml-4 font-medium">{user?.displayName}</h2>
              </div>

              <div className="mt-8">
                <p className="text-2xl font-medium tracking-tight text-warning">
                  ${tool?.price}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  For the purchase of
                </p>
              </div>

              <div className="mt-12">
                <div className="lg:flex bg-white dark:bg-gray-800 rounded-lg shadow">
                  <div className="flex-none w-24 md:w-48  relative">
                    <img
                      src={tool?.img}
                      alt="shopping img"
                      className="absolute rounded-lg inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <form className="flex-auto p-6 text-left">
                    <div className="flex flex-wrap">
                      <h1 className="flex-auto text-xl font-semibold mb-4 dark:text-gray-50">
                        {tool?.name}
                      </h1>
                      <div className="text-xl text-warning font-semibold">
                        ${tool?.price}
                      </div>
                    </div>
                    <h2 className="mb-1">
                      <span className="text-lg font-semibold">Available:</span>{" "}
                      <span className="text-warning">299</span>
                    </h2>
                    <h2 className="mb-1">
                      <span className="text-lg font-semibold">
                        Maximum order:
                      </span>{" "}
                      <span className="text-warning">{tool?.maximum}</span>
                    </h2>
                    <h2 className="mb-1">
                      <span className="text-lg font-semibold">
                        Minimum order:
                      </span>{" "}
                      <span className="text-warning">{tool?.minimum}</span>
                    </h2>

                    <h2 className="mb-3">
                      <span className="text-lg font-semibold">
                        Description:
                      </span>{" "}
                      {tool?.description}
                    </h2>
                    <div className="rating">
                      <input
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                        checked
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* order form */}
          <div className="w-5/6 mx-auto lg:mt-20">
            <form
              onSubmit={handelOrder}
              className="form-control mt-10 bg-neutral p-7 rounded-lg"
            >
              <h2 className="text-2xl font bold mb-6 text-left text-primary">
                Confirm Your Order
              </h2>
              <label className="mb-1 text-left">Name</label>
              <input
                type="text"
                name="name"
                disabled
                value={user?.displayName}
                className="input mb-3 text-[16px] input-bordered"
              />
              <label className="mb-1 text-left">Email</label>
              <input
                type="email"
                name="email"
                disabled
                value={user?.email}
                className="input mb-3 text-[16px] input-bordered"
              />
              <label className="mb-1 text-left">Phone</label>
              <input
                type="text"
                name="phone"
                required
                placeholder="Phone Number"
                className="input mb-3 text-[16px] input-bordered"
              />
              <label className="mb-1 text-left">Address</label>
              <input
                type="text"
                name="address"
                required
                placeholder="Type your address"
                className="input mb-3 text-[16px] input-bordered"
              />
              <div className="flex flex-wrap">
                <div>
                  <p className="mb-1 text-left">Zip code</p>
                  <input
                    type="number"
                    name="zip"
                    required
                    placeholder="Phone Number"
                    className="input mb-3 text-[16px] mr-5 input-bordered"
                  />
                </div>
                <div>
                  <p className="mb-1 text-left">Country</p>
                  <input
                    type="text"
                    name="country"
                    required
                    placeholder="Phone Number"
                    className="input mb-3 text-[16px] mr-5 input-bordered"
                  />
                </div>
              </div>
              <div className="flex flex-wrap">
                <div>
                  <p className="mb-1 text-left">Quantity</p>
                  <input
                    type="number"
                    name="quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    placeholder="How much ?"
                    className="input mb-3 text-[16px] mr-5 input-bordered"
                  />
                </div>
                <div>
                  <p className="mb-1 text-left">Price</p>
                  <input
                    type="number"
                    name="totalPrice"
                    required
                    value={quantity * 10}
                    disabled
                    className="input mb-3 text-[16px] mr-5 input-bordered"
                  />
                </div>
              </div>
              <input
                htmlFor="booking-modal"
                className="btn btn-primary mt-3 w-full"
                type="submit"
                value="SUBMIT"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
