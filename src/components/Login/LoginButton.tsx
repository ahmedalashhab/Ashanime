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

    console.log(userObj);
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
  }, [handleCallbackResponse]);

  return <div id="google-login-button"></div>;
};

//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//
//   const onSuccess = (res: any) => {
//     console.log("Login success!", res.profileObj);
//     localStorage.setItem("user", JSON.stringify(res.profileObj));
//     dispatch(setUser(JSON.parse(localStorage.getItem("user") as string)));
//     navigate("/home");
//   };
//
//   const onFailure = (res: { error: any }) => {
//     console.log("Login failed!", res.error);
//   };
//
//   return (
//     <div id="login-button">
//       <GoogleLogin
//         clientId={CLIENT_ID}
//         buttonText="Login"
//         onSuccess={onSuccess}
//         onFailure={onFailure}
//         cookiePolicy={"single_host_origin"}
//         isSignedIn={true}
//       />
//     </div>
//   );
// };

export default LoginButton;
