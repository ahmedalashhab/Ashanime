import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import SearchResults from "./components/SearchResults/SearchResults";
import Bookmarks from "./components/Bookmarks/Bookmarks";
import Notification from "./components/Shared/Notification";
import { RootState } from "./redux/store";
import { useSelector } from "react-redux";

function App() {
  const notificationReducer = useSelector(
    (state: RootState) => state.notification
  );
  const { show } = notificationReducer.notification;

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={"/search-results"} element={<SearchResults />} />
        <Route path={"/bookmarks"} element={<Bookmarks />} />
      </Routes>
      {show && <Notification />}
    </>
  );
}

export default App;
