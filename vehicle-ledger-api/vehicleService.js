const {
  InsertVehicleData,
  GetVehicles,
  GetVehicleData,
  InsertVehicle,
  DeleteVehicleData,
  DeleteVehicle,
} = require("./databaseSevice");

exports.getVehicleData = async (id, month, year) => {
  const result = await GetVehicleData(id, month, year);
  return result;
};

exports.getVehicles = async () => {
  const vehicles = await GetVehicles();
  return vehicles;
};

exports.AddVehice = async (vehicle) => {
  const values = Object.values(vehicle);
  await InsertVehicle(values);
};

exports.AddVehicleData = async (vehicle) => {
  const values = Object.values(vehicle);
  await InsertVehicleData(values);
};

exports.DeleteVehicleData = async (id, month, year, vehicleId) => {
  await DeleteVehicleData(id, month, year, vehicleId);
};

exports.DeleteVehicle = async (id) => {
  await DeleteVehicle(id);
};