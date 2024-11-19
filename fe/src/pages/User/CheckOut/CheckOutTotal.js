import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCartItems } from "../../../features/cart/cartSelectors";

export const CheckOutTotal = () => {
  const cartItems = useSelector(selectCartItems);

  const dalevaryCharge = 0;

  //subtotal calcutation
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  //total price
  const totalPrice = subtotal + dalevaryCharge;

  return (
    <div className="flex flex-col grow px-2 pt-6 pb-20 mx-auto w-full bg-orange-50 max-md:px-5 max-md:mt-7">
      <h3 className="self-center text-3xl font-bold text-black text-center"> Tổng cộng</h3>
      <div className="px-1 py-10">
        <div className="flex justify-between py-4">
          <p>Tạm tính:</p> <p>{subtotal} VNĐ</p>
        </div>
        <div className="flex justify-between py-4">
          <p>Giao hàng:</p> <p>{dalevaryCharge} VNĐ</p>
        </div>

        <div className="flex flex-col  py-4">
          <p className="border"></p>
          <p className="flex justify-between">
            Tổng:<span>{totalPrice} VNĐ</span>{" "}
          </p>
        </div>
        <div className="justify-center w-full text-xl text-black max-md:px-5 max-md:mt-10">
          <Link to="/order">
            <button className="w-full px-10 py-3 mt-10 text-xl text-black rounded-2xl border border-black border-solid">
              Đặt Hàng
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
