import React from "react";

import Home from "./components/Home/Home";
import Sidebar from "./components/Home/Sidebar";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <Home />
    </div>
  );
}

export default App;
