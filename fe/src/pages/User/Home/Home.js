import React from "react";
import { setTitle } from "../../../utils/setTitle";
import { Banner } from "./Banner";
import { Location } from "./Location";
import { FeaturedProduct } from "./FeaturedProduct";
import { AboutUs } from "./AboutUs";

export const Home = () => {
  // Set page title
  setTitle("Trang chủ");

  return (
    <>
      <Banner />
      <section id="featured-product">
        <FeaturedProduct />
      </section>
      <section id="about-us">
        <AboutUs />
      </section>
      <section id="location">
        <Location />
      </section>
    </>
  );
};
