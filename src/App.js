import "./App.css";
import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./pages/List";
import New from "./pages/New";
import View from "./pages/View";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/lista" element={<List />} />
          <Route path="/mascotas/crear" element={<New />} />
          <Route path="/mascotas/:id" element={<View />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
