import React, { createContext, useContext, useReducer } from "react";
import postFetch from "../customHooks/postFetch";
import { API_URL } from "../utils/constants";

const iniialState = {
  vehicleItems: [],
  inputYear: new Date().getFullYear(),
  inputMonth: new Date().getMonth(),
  selectedVehicle: {},
  recallApi: false
};

export const VechicleContext = createContext();

const vehicleReducer = (state, action) => {
  switch (action.type) {
    case "setVehicleItems":
      return {
        ...state,
        vehicleItems: action.payload,
      };
    case "setYear":
      return {
        ...state,
        inputYear: action.payload,
      };
    case "setMonth":
      return {
        ...state,
        inputMonth: action.payload,
      };
    case "setSelectedVehicle":
      return {
        ...state,
        selectedVehicle: action.payload,
      };
    case "deleteVehicleData":
      let filteredItems = state.vehicleItems.filter(x => x.id !== action.payload)
      return {
        ...state,
        vehicleItems: filteredItems,
      };
    case "recallApi":
      let recall = !state.recallApi
      return {
        ...state,
        recallApi: recall,
      };

  }
  return state;
};

export const VehicleContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(vehicleReducer, iniialState);
  return (
    <VechicleContext.Provider value={{ state, dispatch }}>
      {children}
    </VechicleContext.Provider>
  );
};
