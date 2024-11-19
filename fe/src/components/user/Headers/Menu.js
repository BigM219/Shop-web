import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLoggedOut } from "../../../features/auth/userAuthSlice";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";

export const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //user logout hanlder
  const logoutHandler = () => {
    dispatch(userLoggedOut());
    localStorage.removeItem("userAuth");
    toast.success("User LogOut SuccessFull");
    navigate("/login");
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <p className="text-yellow-950 hover:underline text-[15px] font-semibold whitespace-nowrap">
          Quản lý tài khoản
        </p>
      </DropdownTrigger>
      <DropdownMenu variant="bordered" className = "rounded-md bg-yellow-500/10 text-yellow-950">
        <DropdownItem>
          <Link to="/account">
            Thông tin tài khoản
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link to="/my-order">
            Đơn hàng
          </Link>
        </DropdownItem>
        {/* <DropdownItem key="copy">Copy link</DropdownItem> */}
        {/* <DropdownItem key="edit">Edit file</DropdownItem> */}
        <DropdownItem onClick={logoutHandler}>
          Đăng xuất
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
