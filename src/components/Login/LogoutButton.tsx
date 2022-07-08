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
    <div
      className="rounded w-24 text-base text-gray-300 text-[14px] text-left flex items-center hover:text-white transition-all cursor-pointer"
      onClick={() => handleSignOut()}
    >
      Sign Out
    </div>
  );
};

export default LogoutButton;
