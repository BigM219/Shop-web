import React from "react";
import { useDispatch } from "react-redux";
import { decreaseQty, increaseQty, removeCart } from "../../../features/cart/addToCartSlice";
import { AiOutlineClose } from "react-icons/ai";

export const CheckOutItems = ({ item }) => {
  const { product_id, name, image_url, quantity, price } = item || {};
  const dispatch = useDispatch();

  //remove cart item handler
  const removeCartItemHandler = (id) => {
    dispatch(removeCart(id));
  };
  //increase product qty
  const increaseProductQtyHandler = (id) => {
    dispatch(increaseQty({ id, data: quantity + 1 }));
  };

  //decrease product qty
  const decreaseProductQtyHandler = (id) => {
    dispatch(decreaseQty({ id, data: quantity - 1 }));
  };

  return (
    <tr className="bg-white border-b  hover:bg-gray-50">
      <th scope="row" className="">
        <img
          src={image_url}
          alt="product"
          className="h-20 rounded-md"
        />
      </th>
      <th
        scope="row"
        className="text-center px-6 py-4 font-medium text-gray-600 whitespace-nowrap"
      >
        {name?.substring(0, 25)}
      </th>
      <td className="text-center px-6 py-4">{price} đ</td>
      <td className="px-6 py-4">
        <div className="flex bg-white rounded-md overflow-hidden">
          <button
            disabled={quantity <= 1}
            className="bg-white text-yellow-950 py-1 px-3"
            onClick={() => decreaseProductQtyHandler(product_id)}
          >
            {" "}
            -{" "}
          </button>
          <span className=" w-10 bg-transparent text-yellow-950 font-normal text-2xl text-center focus:outline-none">
            {quantity}
          </span>
          <button
            className="bg-white text-yellow-950 py-1 px-3"
            onClick={() => increaseProductQtyHandler(product_id)}
          >
            {" "}
            +{" "}
          </button>
        </div>
      </td>
      <td className="text-center px-6 py-4">{price * quantity} đ</td>
      <td className="px-6 py-4 " onClick={() => removeCartItemHandler(product_id)}>
        <button className="text-yellow-950">
          <AiOutlineClose />
        </button>
      </td>
    </tr>
  );
};
