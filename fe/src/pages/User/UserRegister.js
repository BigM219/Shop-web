import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
// import { AiOutlineBug } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
// import { Button } from "../../components/common/Button/Button";
import { Form } from "../../components/common/Form/Form";
import { FormInput } from "../../components/common/FormInput/FormInput";
import { Error } from "../../components/ui/Error";
import { useUserRegisterMutation } from "../../features/auth/userAuthApi";
import { setTitle } from "../../utils/setTitle";

export const UserRegister = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const [userRegister, { isLoading, isSuccess, error: resError }] =
    useUserRegisterMutation();

  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast.success("Register Successfull Please Login");
      navigate("/login");
    }
    if (!isLoading && !isSuccess && resError) {
      setError(resError.status);
    }
  }, [isLoading, isSuccess, navigate, resError]);

  //register handler
  const registerHandler = (e) => {
    e.preventDefault();
    setError("");

    //check confirm password
    if (password !== confirmPassword) {
      return setError("Password & Confirm Password Dosen't Match");
    }
    userRegister({
      email,
      username,
      password,
    });
  };

  //set page title
  setTitle("Register User");
  return (
    <div className="flex flex-col items-center px-16 pt-4 bg-white text-neutral-900 max-md:pl-5">
      <div className="flex justify-center items-center px-16 py-20 max-w-full bg-white w-[1301px] max-md:px-5">
        <section className="flex flex-col mt-8 mb-44 max-w-full w-[447px] max-md:mb-10">
          <img
            loading="lazy"
            src={require('./EXAMPLE_LOGO.jpg')}
            alt=""
            className="self-start w-full aspect-[1.82] max-md:max-w-full"
          />
          <form className="flex flex-col justify-center mt-9 max-md:max-w-full">
            <Form>
              <FormInput
                label="Email"
                type="email"
                name="email"
                placeholder="your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="justify-center items-start px-4 py-5 mt-2 text-base whitespace-nowrap rounded-xl border border-solid border-neutral-900 max-md:pr-5 max-md:max-w-full"
              />
              <FormInput
                label="Tên đăng nhập"
                type="text"
                name="username"
                placeholder="Tên đăng nhập"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="justify-center items-start px-4 py-5 mt-2 text-base whitespace-nowrap rounded-xl border border-solid border-neutral-900 max-md:pr-5 max-md:max-w-full"
              />
              <FormInput
                label="Password"
                type="password"
                name="password"
                placeholder="your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="justify-center items-start px-4 py-5 mt-2 text-base whitespace-nowrap rounded-xl border border-solid border-neutral-900 max-md:pr-5 max-md:max-w-full"
              />
              <FormInput
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="your confirm password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="justify-center items-start px-4 py-5 mt-2 text-base whitespace-nowrap rounded-xl border border-solid border-neutral-900 max-md:pr-5 max-md:max-w-full"
              />

              <button onClick={registerHandler} className="flex justify-center items-start px-5 py-4 mt-9 w-full text-base text-white bg-yellow-700 rounded-xl max-md:max-w-full" >
                Đăng ký
              </button>
                </Form>
                {error !== "" && <Error error={error} />}
            <div className="mt-4 mb-3 text-center">
              <span>
                Bạn có tài khoản rồi? Hãy đăng nhập ở {" "}
                <Link to="/login" className="text-yellow-700 font-normal">
                  Đây.
                </Link>
              </span>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};
