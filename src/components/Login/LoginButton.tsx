import { CLIENT_ID } from "./CONFIG";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../redux/store";
import { setUser } from "../../redux/google-slice";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";

const LoginButton = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCallbackResponse = (response: { credential: string }) => {
    const userObj = jwt_decode(response.credential);
    localStorage.setItem("user", JSON.stringify(userObj));
    dispatch(setUser(JSON.parse(localStorage.getItem("user") as string)));
    navigate("/home");
  };

  useEffect(() => {
    // @ts-ignore
    // eslint-disable-next-line no-undef
    google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCallbackResponse,
    });
    // @ts-ignore
    // eslint-disable-next-line no-undef
    google.accounts.id.renderButton(
      document.getElementById("google-login-button"),
      { theme: "outline", size: "large" }
    );
  }, []);

  return <div id="google-login-button"></div>;
};

export default LoginButton;
