import React, { useEffect } from "react";
import logo from "../../assets/logo.svg";
import LoginButton from "./LoginButton";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const userSignedIn = typeof localStorage.getItem("user") === "string";
  console.log(userSignedIn);
  const pathName = window.location.pathname;
  console.log(userSignedIn);

  useEffect(() => {
    if (userSignedIn && pathName === "/login") {
      navigate("/home");
    }
  }, []);

  return (
    <section className="login-background">
      <div className="absolute pt-16 pl-16">
        <h1 className="text-white text-[46px] outfit-medium">
          Explore the world of <span className="text-redor inline">Anime</span>
        </h1>
      </div>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col justify-center items-center h-96 w-96 bg-whole-page rounded-2xl">
          <div className="mb-32">
            <img className="h-16" src={logo} alt="logo" />
          </div>
          {/*<button*/}
          {/*  type="button"*/}
          {/*  className="w-full inline-flex justify-center rounded-md  shadow-sm px-4 py-2 redor-button outfit-medium text-white hover:bg-red-600 hover:scale-105 transition-all ease-linear duration-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"*/}
          {/*>*/}
          {/*  Login with Google*/}
          {/*</button>*/}
          <LoginButton />
        </div>
      </div>
    </section>
  );
};

export default Login;
