import { useNavigate } from "react-router";
import { setUser } from "../../redux/google-slice";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    setUser({
      googleId: 0,
      email: "",
      givenName: "",
      familyName: "",
      picture: "",
      name: "",
    });
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <button
      className="redor-button rounded w-24 h-8 outfit-medium text-white text-[14px] text-center"
      onClick={() => handleSignOut()}
    >
      Sign Out
    </button>
  );
};

export default LogoutButton;
