import React from "react";
import Menufecturer from "../Menufecturer";
import OurServices from "../OurServices";
import Banner from "./Banner";
import BusinessSummary from "./BusinessSummary";
import Reviews from "./Review/Reviews";
import Tools from "./Tools/Tools";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Tools></Tools>
      <Reviews />
      <BusinessSummary />
      <OurServices />
      <Menufecturer />
    </div>
  );
};

export default Home;
