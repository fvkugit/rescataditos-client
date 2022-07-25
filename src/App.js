import "./App.css";
import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./pages/List";
import New from "./pages/New";
import View from "./pages/View";
import Code from "./pages/Code"
import Edit from "./pages/Edit"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/lista" element={<List />} />
          <Route path="/codigo" element={<Code />} />
          <Route path="/mascotas/crear" element={<New />} />
          <Route path="/mascotas/editar/:id" element={<Edit />} />
          <Route path="/mascotas/:id" element={<View />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
