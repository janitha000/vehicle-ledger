import "./App.css";
import React from "react";
import { VehicleContextProvider } from "./context/VehicleContext";

import Home from "./components/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const AddVehicle = React.lazy(() => import("./components/VehicleAdd"));

function App() {
  return (
    <BrowserRouter>
      <VehicleContextProvider>
        <React.Suspense fallback={<div>Loading ...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddVehicle />} />
          </Routes>
        </React.Suspense>
      </VehicleContextProvider>
    </BrowserRouter>
  );
}

export default App;
