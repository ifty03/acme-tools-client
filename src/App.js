import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home/Home";
import { Toaster } from "react-hot-toast";
import Payment from "./Pages/Payment/Payment";
import RequireAuth from "./Components/RequireAuth";
import Footer from "./Components/Footer";
import Dashboard from "./Pages/Dashboard/Dashboard";
import MyProfile from "./Pages/Dashboard/MyProfile";
import MyOrders from "./Pages/Dashboard/MyOrders";
import AddReview from "./Pages/Dashboard/AddReview";
import UpdateProfule from "./Pages/Dashboard/UpdateProfule";
import Blogs from "./Pages/Blogs";
import Postfolio from "./Pages/Postfolio";
import MakeAdmin from "./Pages/Dashboard/MakeAdmin";
import AddProduct from "./Pages/Dashboard/AddProduct";
import ManageProducts from "../src/Pages/Dashboard/ManageProducts";
import Pay from "./Pages/Dashboard/Pay";
import ManageAllOrders from "./Pages/Dashboard/ManageAllOrders";
import RequirAdmin from "./Components/RequireAdmin";
import ErrorPage from "./Components/ErrorPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/blogs" element={<Blogs />}></Route>
        <Route path="/portfolio" element={<Postfolio />}></Route>
        <Route
          path="/payment/:toolId"
          element={
            <RequireAuth>
              <Payment />
            </RequireAuth>
          }
        ></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route index element={<MyProfile />}></Route>
          <Route path="myProfile" element={<MyProfile />}></Route>
          <Route
            path="makeAdmin"
            element={
              <RequirAdmin>
                <MakeAdmin />
              </RequirAdmin>
            }
          ></Route>
          <Route
            path="addProduct"
            element={
              <RequirAdmin>
                <AddProduct />
              </RequirAdmin>
            }
          ></Route>
          <Route
            path="manageAllOrders"
            element={
              <RequirAdmin>
                <ManageAllOrders />
              </RequirAdmin>
            }
          ></Route>
          <Route path="pay/:payId" element={<Pay />}></Route>
          <Route
            path="manageProduct"
            element={
              <RequirAdmin>
                <ManageProducts />
              </RequirAdmin>
            }
          ></Route>
          <Route path="myOrders" element={<MyOrders />}></Route>
          <Route path="updateProfile" element={<UpdateProfule />}></Route>
          <Route path="addReview" element={<AddReview />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
      <Toaster />
      <Footer />
    </div>
  );
}

export default App;
