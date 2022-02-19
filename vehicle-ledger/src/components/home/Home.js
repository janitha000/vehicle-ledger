import React, { memo, useEffect } from "react";
import { VechicleContext } from "../../context/VehicleContext";
import useFetch from "../../customHooks/useFetch";
import { API_URL } from "../../utils/constants";
import AverageCard from "../Cards/AverageCard";
import InputSection from "../InputSection/InputSection";
import MonthInput from "../MonthInput/MonthInput";
import SearchSection from "../SearchSection/SearchSection";
import TableSection from "../TableSection/TableSection";
import "./Home.css";

const Home = () => {
  // const { response } = useFetch(
  //   `${API_URL}/VehicleData?vehicleId=${selectedVehicle.id}&month=${inputMonth}&year=${inputYear}`
  // );

  // useEffect(() => {
  //   dispatch({ type: "setVehicleItems", payload: response });
  // }, [response]);

  return (
    <div className="home">
      <div className="home-search">
        <SearchSection />
      </div>
      <div className="home-average-card">
        <AverageCard />
      </div>
      <div className="home-input">
        <InputSection />
      </div>
      <div className="home-month-input">
        <MonthInput />
      </div>
      <TableSection />
    </div>
  );
};

export default Home
