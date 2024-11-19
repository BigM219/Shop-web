import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeCart } from "../../../features/cart/addToCartSlice";

export const CartItem = ({ item }) => {
  const { product_id, name, image_url, quantity, price } = item || {};
  const dispatch = useDispatch();

  //remove cart item handler
  const removeCartItemHandler = (id) => {
    dispatch(removeCart(id));
  };
  return (
    <div className="flex shadow-md p-1 mb-1">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={image_url}
          alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link to="/">{name?.substring(0, 25)}</Link>
            </h3>
            <p className="ml-4">{price} đ</p>
          </div>
          {/* <p className="mt-1 text-sm text-gray-500">Salmon</p> */}
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Số lượng {quantity}</p>

          <div className="flex" onClick={() => removeCartItemHandler(product_id)}>
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
