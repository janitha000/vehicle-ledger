import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Navigate } from 'react-router-dom';
import { API_URL } from "../../utils/constants";
import useInput from "../../customHooks/useInput";
import './VehicleAdd.css'

const VehicleAdd = () => {
  const [redirect, setRedirect] = useState(false)
  const name = useInput()
  const phone = useInput()
  const model = useInput()
  const number = useInput()

  const onAdd = async () => {
    if (name.value == undefined || phone.value == undefined || model.value == undefined || number.value == undefined) return;
    const payload = { name: name.value, phone: phone.value, model: model.value, number: number.value };
    console.log(payload)
    await SaveVehicle(payload);
  }

  const SaveVehicle = async (payload) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };
    const response = await fetch(`${API_URL}/vehicles`, requestOptions);
    setRedirect(true)
  };

  if (redirect) return <Navigate to='/' />

  return (
    <div className="vehicle-add">
      <TextField
        required
        id="outlined-required"
        label="User Name"
        defaultValue=""
        {...name}
      />
      <TextField
        required
        id="outlined-required"
        label="Phone Number"
        defaultValue=""
        {...phone}
      />
      <TextField
        required
        id="outlined-required"
        label="Vehicle Model"
        defaultValue=""
        {...model}
      />
      <TextField
        required
        id="outlined-required"
        label="Vehicle Number"
        defaultValue=""
        {...number}
      />

      <Fab color="primary" aria-label="add" onClick={onAdd}>
        <AddIcon />
      </Fab>
    </div>
  );
};

export default VehicleAdd;
