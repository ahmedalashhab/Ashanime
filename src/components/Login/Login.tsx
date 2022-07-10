import React, { useEffect } from "react";
//@ts-ignore
import logo from "../../assets/logo-long.png";
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
      <div className="flex flex-col lg:items-center justify-center lg:h-screen">
        <h2 className="text-white lg:text-[46px] text-[24px] outfit-medium lg:pb-10">
          Explore the world of <span className="text-redor inline">Anime</span>
        </h2>
        <div className="flex flex-col justify-center items-center lg:h-96 h-52 lg:w-96 w-80 bg-whole-page rounded-2xl">
          <div className="lg:mb-20 mb-6">
            <img className="lg:h-16 h-12" src={logo} alt="logo" />
          </div>

          <h3 className="text-white outfit-medium lg:text-[32px] text-[24px] lg:mb-6 mb-6">
            Login
          </h3>
          <LoginButton />
        </div>
      </div>
    </section>
  );
};

export default Login;
