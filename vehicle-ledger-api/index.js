const express = require("express");
const bodyParser = require("body-parser");

const { getRows, getVehicles, getVehicleData, AddVehicleData, AddVehice, DeleteVehicleData, DeleteVehicle } = require("./vehicleService");
const app = express();
const port = 3001;
const cors = require("cors");
const { InsertVehicle, InsertVehicleData } = require("./databaseSevice");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/vehicledata", async (req, res) => {
  let vehicleNumber = req.query.vehicleId;
  let month = req.query.month ? req.query.month : new Date().getMonth();
  let year = req.query.year ? req.query.year : new Date().getFullYear();
  const rows = await getVehicleData(vehicleNumber, month, year);
  res.send(rows);
});

app.get("/vehicles", async (req, res) => {
  const rows = await getVehicles();
  res.send(rows);
});

app.post("/vehicles", async (req, res) => {
  let body = req.body;
  await AddVehice(body);
  res.sendStatus(201)
});

app.post("/vehicledata", async (req, res) => {
  let body = req.body;
  await AddVehicleData(body);
  res.sendStatus(201)
});

app.delete("/vehicledata/:id", async (req, res) => {
  let id = req.params.id
  let month = req.query.month ? req.query.month : new Date().getMonth();
  let year = req.query.year ? req.query.year : new Date().getFullYear();
  let vehicleId = req.query.vehicleId;
  await DeleteVehicleData(id, month, year, vehicleId);
  res.sendStatus(200)
});


app.delete("/vehicles/:id", async (req, res) => {
  let id = req.params.id
  await DeleteVehicle(id);
  res.sendStatus(200)
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
