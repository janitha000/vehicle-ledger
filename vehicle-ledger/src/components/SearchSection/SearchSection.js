import React, { useCallback, useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useFetch from "../../customHooks/useFetch";
import { API_URL } from "../../utils/constants";
import { VechicleContext } from "../../context/VehicleContext";
import "./SearchSection.css";
import VechicleData from "./VehicleData";

const SearchSection = () => {
  const { response } = useFetch(`${API_URL}/vehicles`);
  const { dispatch } = useContext(VechicleContext);
  const [vehicle, setVehicle] = React.useState("");
  const [openVehicleData, setOpenVehicleData] = useState(false)
  const [reRender, setRerender] = useState(false)


  const handleChange = (event) => {
    setVehicle(event.target.value);
    const selectedVehicle = response.filter((x) => x.id === event.target.value);
    dispatch({ type: "setSelectedVehicle", payload: selectedVehicle[0] });
  };

  const onOpenClick = () => {
    console.log(openVehicleData)
    setOpenVehicleData((prev) => !prev)
  }

  const reRenderFn = () => {
    console.log(reRender)
    setRerender(true)
    console.log(reRender)

  }

  return (
    <>
      <div className="search-section">
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Vehicle Number
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={vehicle}
            label="Vehicle"
            onChange={handleChange}
            fullWidth
          >
            {response &&
              response.map((item) => (
                <MenuItem value={item.id}>{item.number}</MenuItem>
              ))}
          </Select>
        </FormControl>

        <Button variant="contained" onClick={onOpenClick}>
          {!openVehicleData ? "Show" : "Hide"}  Vehicle Info
        </Button>

        <Link to={"/add"}>
          <Button variant="contained" >
            Add New Vehicle
          </Button>
        </Link>

      </div>
      <div className="search-vehicle">
        <VechicleData isOpen={openVehicleData} reRender={reRenderFn} />

      </div>

    </>

  );
};

export default SearchSection;
