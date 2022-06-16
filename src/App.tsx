import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import SearchResults from "./components/SearchResults/SearchResults";
import Bookmarks from "./components/Bookmarks/Bookmarks";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path={"/search-results"} element={<SearchResults />} />
      <Route path={"/bookmarks"} element={<Bookmarks />} />
    </Routes>
  );
}

export default App;
