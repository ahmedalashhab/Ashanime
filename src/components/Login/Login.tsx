import React, { useEffect } from "react";
import logo from "../../assets/logo.svg";
import LoginButton from "./LoginButton";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const userSignedIn = typeof localStorage.getItem("user") === "string";

  useEffect(() => {
    //  Go to home page if user is already signed in
    if (userSignedIn) {
      navigate("/home");
    }
  }, []);

  return (
    <section className="login-background">
      <div className="absolute pt-16 pl-16">
        <h1 className="text-redor text-[46px] outfit-medium">Ashanime</h1>
        <h2 className="text-white text-[46px] outfit-medium">
          Explore the world of <span className="text-redor inline">Anime</span>
        </h2>
      </div>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col justify-center items-center h-96 w-96 bg-whole-page rounded-2xl">
          <div className="mb-20">
            <img className="h-16" src={logo} alt="logo" />
          </div>

          <h3 className="text-white outfit-medium text-[32px] mb-6">Login</h3>
          <LoginButton />
        </div>
      </div>
    </section>
  );
};

export default Login;
