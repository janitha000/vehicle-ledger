import * as React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import VCalendar from "../VCalendar";
import "./InputSection.css";
import useInput from "../../customHooks/useInput";
import { VechicleContext } from "../../context/VehicleContext";
import { API_URL } from "../../utils/constants";

const InputSection = () => {
  const [date, setDate] = React.useState(new Date());
  const usageValue = React.useRef(0);
  const expense = useInput();
  const amount = useInput();
  const odMeter = useInput();
  const { state: { selectedVehicle, vehicleItems }, dispatch } = React.useContext(VechicleContext);

  usageValue.current = React.useMemo(() => {
    console.log(vehicleItems)
    return odMeter.value && vehicleItems && vehicleItems.length > 0
      ? odMeter.value - vehicleItems.filter(x => Date.parse(x.date) <= Date.parse(date))[0]?.od_meter
      : 0
  }, [odMeter, vehicleItems]);

  const onAdd = async () => {
    if (date.toDateString() == null || expense.value == null || usageValue.current < 0) return;
    const payload = {
      vehicle_id: selectedVehicle.id,
      date: date.toISOString(),
      expense: expense.value,
      amount: amount.value ?? 0,
      od_meter: parseInt(odMeter.value),
      usage: usageValue.current,
    };

    await SaveVehicleData(payload);
    dispatch({ type: "recallApi", payload });
  };

  const SaveVehicleData = async (payload) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    const response = await fetch(`${API_URL}/vehicleData`, requestOptions);
  };
  const onDateSelect = (pickedDate) => {
    console.log(pickedDate);
    setDate(pickedDate);
    //date.current = pickedDate;
  };

  return (
    <div className="input-section">
      <VCalendar onDateSelect={onDateSelect} />

      <TextField
        required
        id="outlined-required"
        label="Expenses"
        defaultValue=""
        {...expense}
      />
      <TextField
        required
        id="outlined-required"
        label="Amount"
        type="number"
        defaultValue=""
        {...amount}
      />
      <TextField
        required
        id="outlined-required"
        label="OD Meter"
        type="number"
        defaultValue=""
        {...odMeter}
      />
      <TextField
        id="outlined-required"
        label="Usage"
        value={usageValue.current}
        InputProps={{
          readOnly: true,
        }}
      />
      <Fab color="primary" aria-label="add" onClick={onAdd}>
        <AddIcon />
      </Fab>
    </div>
  );
};

export default InputSection;
