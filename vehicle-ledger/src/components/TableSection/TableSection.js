import id from "date-fns/locale/id";
import * as React from "react";
import { VechicleContext } from "../../context/VehicleContext";
import useFetch from "../../customHooks/useFetch";
import { API_URL } from "../../utils/constants";
import VehicleTable from "../VehicleTable";

const TableSection = () => {
  const { state: { inputYear, inputMonth, selectedVehicle, recallApi }, dispatch } = React.useContext(VechicleContext);
  const [response, setResponse] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      let data = await fetch(`${API_URL}/VehicleData?vehicleId=${selectedVehicle.id}&month=${inputMonth}&year=${inputYear}`);
      let jsonData = await data.json();
      setResponse(jsonData);
    };
    fetchData();
  }, [inputYear, inputMonth, selectedVehicle, recallApi]);

  React.useEffect(() => {
    dispatch({ type: "setVehicleItems", payload: response });
  }, [response]);


  const createHeader = (value, key) => {
    return { key, value };
  };

  const headers = [
    createHeader("DateTime", 1),
    createHeader("Expense", 2),
    createHeader("Amount(LKR)", 3),
    createHeader("OD Meter", 4),
    createHeader("Usage", 5),
    createHeader("Actions", 6),
  ];

  const deleteItem = React.useCallback(async (item) => {
    console.log(item);
    await fetch(`${API_URL}/vehicledata/${item.id}?vehicleId=${selectedVehicle.id}&month=${inputMonth}&year=${inputYear}`, { method: 'DELETE' });
    dispatch({ type: "deleteVehicleData", payload: item.id });
    dispatch({ type: "recallApi", payload: null });
  }, [selectedVehicle, inputMonth, inputYear]);

  return (
    <div>
      {response && response.length > 0 && (
        <VehicleTable
          tableRows={response}
          tableHeaders={headers}
          deleteItemClick={deleteItem}
        />
      )}
    </div>
  );
};

export default TableSection;
