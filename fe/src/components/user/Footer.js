import React from "react";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiFillFacebook,
} from "react-icons/ai";
import { Link } from "react-router-dom";
// import image from "../../images/playstore.png";

export const Footer = () => {
  return (
    <footer className="px-2 sm:px-0">
      <div className="w-full h-auto bg-gray-100">
        <div className="container mx-auto w-full h-full items-center justify-between mx-auto py-2">
          <div className="container mx-auto flex w-50 h-full grid gap-1  grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4">
            <img
              loading="lazy"
              src={require('./EXAMPLE_LOGO (1).jpg')}
              alt="Logo"
              className="shrink-0 self-stretch max-w-full h-[180px]"
            />
            <div className="">
              <div className="space-y-2 mt-2">
                <p className="font-medium text-yellow-700 text-base">Contact Us</p>
                <div className="flex space-x-2">
                  <p className="text-2xl text-yellow-700">
                    <AiFillFacebook />
                  </p>
                  <div className="text-sm">
                    <p>FaceBook</p>
                    <p>facebook.com/Dnutshealth</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <p className="text-2xl text-yellow-700">
                    <AiOutlinePhone />
                  </p>
                  <div className="text-sm">
                    <p>Call Us</p>
                    <p>+84 793 910 326</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <p className="text-2xl text-yellow-700">
                    <AiOutlineMail />
                  </p>
                  <div className="text-sm">
                    <p>Email Us</p>
                    <p>Dnutshealth@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <h1 className="text-base text-yellow-700 font-medium space-y-2 mt-2">
                Customer Services
              </h1>
              <div className="flex flex-col space-y-2 mt-2 font-normal">
                <Link
                  to="/"
                  className="hover:text-yellow-700 hover:ml-1 duration-100 ease-linear"
                >
                  About Us
                </Link>
                <Link
                  to="/"
                  className="hover:text-yellow-700 hover:ml-1 duration-100 ease-linear"
                >
                  FAQ
                </Link>
                <Link
                  to="/"
                  className="hover:text-yellow-700 hover:ml-1 duration-100 ease-linear"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/"
                  className="hover:text-yellow-700 hover:ml-1 duration-100 ease-linear"
                >
                  Concellation & Return Policy
                </Link>
              </div>
            </div>
            <div className="items-center">
              <h1 className="text-base text-yellow-700 font-medium space-y-2 mt-2">
                Payment
              </h1>
              <div className="flex items-center space-y-2 mt-2 ">
                <img src={require('./EXAMPLE_LOGO (5).jpg')} className="max-w-full h-12 " alt="" />
                <img src={require('./EXAMPLE_LOGO (3).jpg')} className="max-w-full h-12 " alt="" />
                <img src={require('./EXAMPLE_LOGO (4).jpg')} className="max-w-full h-12 " alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
