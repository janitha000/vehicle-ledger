import * as React from "react";
import { VechicleContext } from "../../context/VehicleContext";
import VehicleCard from "../VehicleCard";
import './AverageCard.css'

const AverageCard = () => {
  const { state: { vehicleItems }, } = React.useContext(VechicleContext);
  const averages = React.useMemo(() => {
    if (vehicleItems && vehicleItems.length > 0) {
      const totalCost = vehicleItems.reduce(
        (a, b) => a + parseInt((b.amount) ? b.amount : 0),
        0
      );
      const totalKm = vehicleItems.reduce((a, b) => a + b.usage, 0);
      console.log(totalCost)
      console.log(totalKm)
      return { totalCost, totalKm, average: (totalCost / totalKm).toFixed(2) };
    }
  }, [vehicleItems])

  return (
    <div className="average">
      {averages && averages.average && <>
        <VehicleCard header={"Average cost per km"} value={averages.average} unit={"LKR"} />
        <VehicleCard header={"Total cost"} value={averages.totalCost} unit={"LKR"} />
        <VehicleCard header={"Total usage"} value={averages.totalKm} unit={"Km"} /></>}

    </div>
  );
}


export default AverageCard