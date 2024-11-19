import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const Banner = () => {
  return (
    <div className="container mx-auto mt-1 sm:mt-5">
      <div className="md:flex md:gap-5">
        {/* carousel */}
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={4000}
        >
          <div>
            <img
              loading="lazy"
              className="w-full object-fill rounded-xl h-80 sm:h-96 md:h-128"
              src={require('./EXAMPLE_LOGObaner.jpg')}
              alt=""
            />
          </div>
          <div>
            <img
              loading="lazy"
              className="w-full object-fill rounded-xl h-80 sm:h-96 md:h-128"
              src={require('./EXAMPLE_LOGObaner1.jpg')}
              alt=""
            />
          </div>
          <div>
            <img
              loading="lazy"
              className="w-full object-fill rounded-xl h-80 sm:h-96 md:h-128"
              src={require('./EXAMPLE_LOGObaner2.jpg')}
              alt=""
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
};
