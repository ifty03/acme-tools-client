import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
      </Routes>
    </div>
  );
}

export default App;
