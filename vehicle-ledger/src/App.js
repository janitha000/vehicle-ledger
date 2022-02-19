import "./App.css";
import React from "react";
import { VehicleContextProvider } from "./context/VehicleContext";

import Home from "./components/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VehicleAdd from "./components/VehicleAdd/VehicleAdd";

function App() {
  return (
    <BrowserRouter>
      <VehicleContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<VehicleAdd />} />
        </Routes>
      </VehicleContextProvider>
    </BrowserRouter>
  );
}

export default App;
