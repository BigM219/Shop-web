import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../../features/auth/userAuthSelectors";
// import { Elements } from "@stripe/react-stripe-js";
// import { useNavigate } from "react-router-dom";
import { Form } from "../../../../components/common/Form/Form";
import { FormInput } from "../../../../components/common/FormInput/FormInput"
import { useUserUpdateMutation } from "../../../../features/auth/userAuthApi";
import { toast } from "react-hot-toast";
import React, { useEffect, useState } from "react";

export const Account = () => {
  const [userUpdate, { isLoading, isSuccess, error: resError }] =
    useUserUpdateMutation();

  const userInfo = useSelector(selectUserInfo);
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
//   const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast.success("Đổi thông tin thành công");
    //   navigate("/");
    }
  }, [isLoading, isSuccess, resError]);

  const UpdateAccount = (e) => {
    e.preventDefault();
    userUpdate({ first_name, last_name, phone, address })
  }

  return (
    <div className="container mx-auto my-5 flex justify-center gap-5 mt-10 sm:px-0">
      <Form>
        <h2 className="text-2xl pb-4">Thông tin của bạn</h2>
        <div className="mb-3">
          <label htmlFor="email" className="text-lg font-normal">
            Tài khoản
          </label>
          <p className=" py-2 px-1 mt-1 w-full rounded-md border-2 border-gray-200 focus:outline-yellow-700">
            {userInfo.username}
          </p>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="text-lg font-normal">
            Email
          </label>
          <p className=" py-2 px-1 mt-1 w-full rounded-md border-2 border-gray-200 focus:outline-yellow-700">
            {userInfo.email}
          </p>
        </div>

        {userInfo.first_name ? (
          <FormInput
          label="Họ"
          type="text"
          name="name"
          placeholder={userInfo.first_name}
          required
          value={first_name}
          onChange={(e) => setFirstname(e.target.value)}
          />
        ) : (
          <FormInput
          label="Họ"
          type="text"
          name="name"
          placeholder="Họ"
          required
          value={first_name}
          onChange={(e) => setFirstname(e.target.value)}
          />
        )}

        {userInfo?.last_name ? (
          <FormInput
          label="Tên"
          type="text"
          name="name"
          placeholder={userInfo.last_name}
          required
          value={last_name}
          onChange={(e) => setLastname(e.target.value)}
          />
        ) : (
          <FormInput
          label="Tên"
          type="text"
          name="name"
          placeholder="Tên"
          required
          value={last_name}
          onChange={(e) => setLastname(e.target.value)}
          />
        )}
        
        {userInfo?.phone ? (
          <FormInput
          label="Số điện thoại"
          type="text"
          name="name"
          placeholder={userInfo.phone}
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          />
        ) : (
          <FormInput
          label="Số điện thoại"
          type="text"
          name="name"
          placeholder="Nhập số điện thoai"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          />
        )}
        
        {userInfo?.address ? (
          <FormInput
          label="Địa chỉ"
          type="text"
          name="name"
          placeholder={userInfo.address}
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          />
        ) : (
          <FormInput
          label="Địa chỉ"
          type="text"
          name="name"
          placeholder="Địa chỉ giao hàng"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          />
        )}
        <button onClick={UpdateAccount} className="justify-center items-start px-5 py-4 mt-9 w-full text-base text-white bg-yellow-700 rounded-xl max-md:max-w-full" >
            Cập nhật thông tin
        </button>
      </Form>
    </div>
  );
};