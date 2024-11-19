import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../features/auth/userAuthSelectors";
// import { Elements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Form } from "../../../components/common/Form/Form";
import { FormInput } from "../../../components/common/FormInput/FormInput";
// import { PaymentCkeckoutForm } from "./PaymentCkeckoutForm";
import { selectCartItems } from "../../../features/cart/cartSelectors";
import { useOderCreateMutation } from "../../../features/order/orderApi"
// const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);
import { toast } from "react-hot-toast";
import { Error } from "../../../components/ui/Error";

export const Order = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (userInfo) {
      const { first_name, last_name, phone, address } = userInfo;
      setFirstname(first_name);
      setLastname(last_name);
      setPhone(phone);
      setAddress(address);
    }
  }, [userInfo]);


  const cartItems = useSelector(selectCartItems);

  const dalevaryCharge = 0;

  //subtotal calcutation
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  //total price
  const totalPrice = subtotal + dalevaryCharge;
  
  const [orderCreate, { isLoading, isSuccess, error: resError }] =
    useOderCreateMutation();

  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast.success("Order Successfull");
      navigate("/");
    }
    if (!isLoading && resError) {
        setError(resError.data?.message);
        console.log(resError)
    }
  }, [isLoading, isSuccess, navigate, resError]);
  
  const order_items = cartItems.map(product => {
    return {
      product_id: product.product_id,
      quantity: product.quantity,
      unit_price: product.price
    };
  });

  const orderCreateHandler = (e) => {
    e.preventDefault();
    setError("");
    orderCreate({
      "user_id": userInfo.user_id,
      "status": "Đang xử lý...",
      "total_amount": totalPrice,
      "shipping_address": address,
      "order_items": order_items,
    });
  };

  return (
    <div className="container mx-auto my-5 flex justify-center gap-5 mt-10 sm:px-0">
      <Form>
        <h2 className="text-2xl pb-4">Thông Tin Đơn Hàng</h2>
        <FormInput
          label="Họ"
          type="text"
          name="name"
          required
          placeholder="Họ"
          value={first_name}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <FormInput
          label="Tên"
          type="text"
          name="name"
          required
          placeholder="Tên"
          value={last_name}
          onChange={(e) => setLastname(e.target.value)}
        />
        <FormInput
          label="Your phone"
          type="phone"
          name="phone"
          placeholder="Số điện thoại"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <FormInput
          label="Your Address"
          type="text"
          name="adress"
          placeholder="Địa chỉ giao hàng"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Form>
      <div>
        <img
          src={
            "https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.15752-9/448079728_442649858527783_7857133314525060090_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=jVJQ_Kmh0LwQ7kNvgHlaEae&_nc_ht=scontent.fsgn2-6.fna&oh=03_Q7cD1QHowVXAoZa08nyebD8r3MJYZbQNPPs7Q1DNn6WUlokhaA&oe=66950A5F"
          }
          alt="profile"
          className="w-15 h-15 w-[400px] rounded-md whitespace-nowrap"
        />
        <p className="flex justify-between text-3xl mt-2">
            Tổng:<span>{totalPrice} VNĐ</span>{" "}
        </p>
        <p className="flex justify-between mt-2">
            **** Lưu ý: Gửi tiền với nội dung là tên tài khoản ****
        </p>
        <button onClick={orderCreateHandler} className="px-5 py-4 mt-9 w-full text-base text-white bg-yellow-700 rounded-xl " >
          Tạo đơn hàng
        </button>
        {error !== "" && <Error error={error} />}
      </div>
      
      
      {/* <Elements stripe={stripePromise}>
        <PaymentCkeckoutForm shippingInfo={shippingInfo} />
      </Elements> */}
    </div>
  );
};
