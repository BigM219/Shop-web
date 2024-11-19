import React, { useState } from "react";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { FaAlignRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import {
  selectUserAccessToken,
  selectUserInfo,
} from "../../../features/auth/userAuthSelectors";
import { openCart } from "../../../features/cart/cartOpenSlice";
import { selectCartItems } from "../../../features/cart/cartSelectors";
import { Menu } from "./Menu";
import { MobileMenu } from "./MobileMenu";

export const MainHeader = () => {
  const cartItems = useSelector(selectCartItems);
  const userAccessToken = useSelector(selectUserAccessToken);
  const userInfo = useSelector(selectUserInfo);
  const [searchValue, setSearchValue] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // cart open handler
  const cartOpenHandler = () => {
    dispatch(openCart(true));
  };

  // search product handler
  const searchHandler = (e) => {
    e.preventDefault();
    if (searchValue !== "") {
      setMobileSearch(false);
      navigate(`/search?search=${searchValue}`);
    }
  };

  return (
    <div className="w-full h-14 bg-orange-50 text-gray-100 px-2 sm:px-0 sticky top-0 z-40 shadow-md shadow-gray-400">
      <div className="container mx-auto flex w-full h-full items-center justify-between space-x-3 relative">
        <div className="flex items-center space-x-3">
          {/* Mobile left side menu */}
          <div
            className="sm:hidden block"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <FaAlignRight />
          </div>
          {/* Mobile menu */}
          {mobileMenu && (
            <MobileMenu setMobileMenu={setMobileMenu} mobileMenu={mobileMenu} />
          )}
          {/* Logo area */}
          <div className="xl:min-w-[120px]">
            <Link to="/">
              <h1 className="text-2xl text-white font-semibold">
                <img
                  loading="lazy"
                  src={require("./EXAMPLE_LOGO (1).jpg")}
                  alt="Logo"
                  className="shrink-0 self-stretch max-w-full h-[80px]"
                />
              </h1>
            </Link>
          </div>
          <nav className="navbar text-xl font-bold space-x-14 ml-auto">
            <a className="bg-yellow-700 text-white rounded-md w-full px-3 py-1" href="#Home">Trang chủ</a>
            <HashLink className="text-yellow-950 duration-200 ease-linear hover:bg-yellow-700 text-yellow-700 hover:text-white rounded-md w-full px-3 py-1" to="/#featured-product">Sản phẩm</HashLink>
            <HashLink className="text-yellow-950 duration-200 ease-linear hover:bg-yellow-700 text-yellow-700 hover:text-white rounded-md w-full px-3 py-1" to="/#about-us">Về chúng tôi</HashLink>
            <HashLink className="text-yellow-950 duration-200 ease-linear hover:bg-yellow-700 text-yellow-700 hover:text-white rounded-md w-full px-3 py-1" to="/#location">Liên Hệ</HashLink>
          </nav>
        </div>
        {/* Search bar for larger screens */}
        {/* <form className="hidden sm:block sm:w-full" onSubmit={searchHandler}>
          <div className="flex items-center bg-yellow-500/10 rounded-md ring-1 ring-yellow-950">
            <input
              type="search"
              name="search"
              value={searchValue}
              placeholder="Tìm kiếm ...."
              className="bg-transparent text-yellow-950 px-2 py-2 focus:outline-none sm:w-full"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button type="submit" className="pr-3 text-lg text-yellow-950">
              <BsSearch />
            </button>
          </div>
        </form> */}
        {/* Right side */}
        <div className="flex items-center space-x-20 relative">
          {userAccessToken && userInfo?.user_id ? (
            <div className="hidden sm:flex items-center xl:min-w-[300px]">
              <img
                src={
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt="profile"
                className="w-15 h-15 w-[40px] rounded-md whitespace-nowrap"
              />
              <div className="w-full h-full">
                <p className="flex text-yellow-950 text-[15px] whitespace-nowrap mr-16">
                  Xin chào, {userInfo.username}
                </p>
                <Menu />
              </div>
            </div>
          ) : (
            <div className="hidden sm:flex items-center">
              <Link
                to="/login"
                className="flex text-yellow-950 hover:bg-yellow-950 hover:text-white p-2 rounded-md ease-out duration-100"
              >
                <span className="text-2xl pr-1">
                  <AiOutlineUser />
                </span>
                <span className="font-medium whitespace-nowrap">
                  Đăng Nhập
                </span>
              </Link>
              <span className="px-1"> |</span>
              <Link
                to="/register"
                className="text-yellow-950 hover:bg-yellow-950 hover:text-white p-2 rounded-md ease-out duration-100"
              >
                <span className="font-medium whitespace-nowrap">
                  Đăng Ký
                </span>
              </Link>
            </div>
          )}
          {/* Search icon for small devices */}
          <button
            type="submit"
            className="pr-2 text-lg text-yellow-950 block sm:hidden"
            onClick={() => setMobileSearch(!mobileSearch)}
          >
            <BsSearch />
          </button>
          {/* Cart */}
          <div
            className="flex items-center justify-center cursor-pointer w-full"
            onClick={cartOpenHandler}
          >
            <span className="hover:bg-yellow-950 hover:text-white p-1 rounded-md text-3xl text-yellow-950 absolute">
              <AiOutlineShoppingCart />
            </span>
            <p className="relative left-4 bottom-4 w-5 h-5 flex items-left justify-center bg-yellow-800 text-white rounded-full">
              <span>{cartItems.length > 0 ? cartItems.length : "0"}</span>
            </p>
          </div>
        </div>
      </div>
      {/* Mobile search form */}
      <div className={mobileSearch ? "block" : "hidden"}>
        <form
          className="sm:hidden block w-full absolute top-3 left-0"
          onSubmit={searchHandler}
        >
          <div className="flex items-center bg-gray-200 rounded-md ring-1 ring-yellow-950 mx-2">
            <input
              type="search"
              name="search"
              value={searchValue}
              placeholder="Search Product..."
              className="bg-transparent text-black px-2 py-2 focus:outline-none"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button type="submit" className="pr-3 text-lg text-yellow-950">
              <BsSearch />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
