import React from "react";
import { toast } from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../features/cart/addToCartSlice";
// import createSlug from "../../utils/createSlug";

export const ProductCard = ({ product }) => {
  const { product_id, image_url, description, price, name } = product || {};

  const rating = 5;

  const dispatch = useDispatch();

  //create product slug
  // const productSlug = createSlug(name);

  //add to cart
  const addToCartHandler = (item) => {
    dispatch(addToCart(item));
    toast.success("Product Add To Cart");
  };

  return (
    <div className="justify-center md:max-w-[250px] bg-white/80 border-gray-100 border rounded-md hover:shadow-lg duration-100 ease-linear">
      <Link to={`/product-details/${product_id}`}>
        <div className="pt-2">
        <img loading="lazy" src={image_url} alt="Product" className="mt-2 w-full max-md:max-w-full" />
        </div>
      </Link>
      <div className="p-2 space-y-2">
        <div className="flex justify-center pt-2 font-semibold text-base">
          <Link to={`/product-details/${product_id}`}>
            <h3>{name}</h3>
          </Link>
        </div> 
        <div className="flex justify-center">
          <p>{price} đ</p>
        </div>
        <p className="flex justify-center font-normal text-sm">
          {description?.substring(1, 45)}...
        </p>
        <p className="flex justify-center text-yellow-300">
          {Array(rating)
            .fill()
            .map((i) => (
              <FaStar />
            ))}

          <span className="text-gray-500 text-sm font-thin ml-1">
            ({rating})
          </span>
        </p>
        <div>
          <button
            className="bg-white duration-200 ease-linear hover:bg-yellow-700 text-yellow-700 hover:text-white border border-yellow-700 w-full rounded-md py-1"
            onClick={() => addToCartHandler(product)}
          >
            Mua
          </button>
        </div>
      </div>
    </div>
  );
};
