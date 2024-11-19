import React from "react";

export const Button = ({ name, className, ...rest }) => {
  return (
    <button
      type="submit"
      className={`flex justify-center items-center px-5 py-4 mt-9 rounded-md bg-yellow-700 text-white border-2 border-yellow-700 focus:ring-2 overflow-hidden hover:bg-yellow-700 ease-in duration-300 disabled:bg-gray-500 disabled:border-gray-500 disabled:text-gray-300 ${className}`}
      {...rest}
    >
      {name}
    </button>
  );
};
