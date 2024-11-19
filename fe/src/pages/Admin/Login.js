import React, { useEffect, useState } from "react";
// import { AiOutlineBug } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
// import { Button } from "../../components/common/Button/Button";
import { Form } from "../../components/common/Form/Form";
import { FormInput } from "../../components/common/FormInput/FormInput";
import { useAdminLoginMutation } from "../../features/auth/authApi";
import { setTitle } from "../../utils/setTitle";
import { toast } from "react-hot-toast";
import { Error } from "../../components/ui/Error";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const [adminLoggedIn, { isLoading, isSuccess, error: resError }] =
  useAdminLoginMutation();

  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast.success("Login Successfull");
      navigate("/");
    }
    if (!isLoading && resError) {
        setError(resError.data?.message);
        console.log(resError)
    }
  }, [isLoading, isSuccess, navigate, resError]);

  // const handleSubmit = async () => {
  //   try {
  //     userLoggedIn({ username, password });
  //   } catch (error) {
  //     console.error("Error during registration:", error);
  //     // message.error("An error occurred during registration");
  //   };
  // };
  // user Login Handler
  const adminLoginHandler = (e) => {
    e.preventDefault();
    setError("");
    adminLoggedIn({ username, password });
  };

  //set page title
  setTitle("User Login");
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
              <div className="flex flex-col justify-center mt-9 max-md:max-w-full">
                <label htmlFor="username" className="sr-only">
                  Tên đăng nhập
                </label>
                <FormInput
                  label="Tên đăng nhập"
                  type="username"
                  name="username"
                  placeholder="Tên đăng nhập"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="justify-center items-start px-4 py-5 mt-2 text-base whitespace-nowrap rounded-xl border border-solid border-neutral-900 max-md:pr-5 max-md:max-w-full"
                />
                </div>
                <label htmlFor="password" className="sr-only">
                  Mật khẩu
                </label>
                <FormInput
                  label="Mật khẩu"
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="justify-center items-start px-4 py-5 mt-2 text-base whitespace-nowrap rounded-xl border border-solid border-neutral-900 max-md:pr-5 max-md:max-w-full"
                />
                <button onClick={adminLoginHandler} className="flex justify-center items-start px-5 py-4 mt-9 w-full text-base text-white bg-yellow-700 rounded-xl max-md:max-w-full" >
                  Đăng nhập
                </button>
                  </Form>
                  {error !== "" && <Error error={error} />}
          </form>
        </section>
      </div>
    </div>
  );
};
