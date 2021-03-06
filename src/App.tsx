import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SearchResults from "./components/SearchResults/SearchResults";
import Genres from "./components/Genres/Genres";
import Bookmarks from "./components/Bookmarks/Bookmarks";
import Notification from "./components/Shared/Notification";
import { RootState } from "./redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function App() {
  const navigate = useNavigate();
  // checks if user is signed in
  const userSignedIn = typeof localStorage.getItem("user") === "string";

  useEffect(() => {
    !userSignedIn && navigate("/login");
    userSignedIn && navigate("/home");
  }, []);

  const notificationReducer = useSelector(
    (state: RootState) => state.notification
  );
  const { show } = notificationReducer.notification;

  return (
    <div className=" flex justify-center">
      <div className="lg:w-screen w-screen">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path={"/search-results"} element={<SearchResults />} />
          <Route path={"/genres"} element={<Genres/>} />
          <Route path={"/bookmarks"} element={<Bookmarks />} />
        </Routes>
        {show && <Notification />}
      </div>
    </div>
  );
}

export default App;
