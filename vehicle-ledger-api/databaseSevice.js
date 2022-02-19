const sqlite3 = require("sqlite3").verbose();
const util = require("util");

// open the database
let db = new sqlite3.Database("./db/sample.db");

exports.InsertVehicle = async (vehicle) => {
    console.log(vehicle)
    await db.run(
        `INSERT INTO vehicles(name, phone, model, number, photo) VALUES (?,?,?,?,?)`, [...vehicle]
    );
};

exports.InsertVehicleData = async (vehicle) => {
    let month = vehicle[1].split('-')[1] - 1;
    let year = vehicle[1].split('-')[0];
    let records = await module.exports.GetVehicleData(vehicle[0], month, year)
    if (records.length > 0 && Date.parse(records[0].date) > Date.parse(vehicle[1])) {
        let lessRecord = records.filter(x => Date.parse(x.date) > Date.parse(vehicle[1])).pop()
        let sql1 = `UPDATE vehicle_data SET usage=${lessRecord.od_meter - vehicle[4]} WHERE id=${lessRecord.id}`
        await db.run(sql1);
    }
    await db.run(
        `INSERT INTO vehicle_data(vehicle_id, date, expense, amount, od_meter, usage) VALUES(?,?,?,?,?,?)`, [...vehicle]
    );
    return;
};

exports.GetVehicles = async () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM vehicles`, [], (err, rows) => {
            resolve(rows);
        });
    });
};

exports.GetVehicleData = async (id, month, year) => {
    let calculatedMonth = (month < 10) ? `0${parseInt(month) + 1}` : `parseInt(month) + 1`
    const startDate = `${year}-${calculatedMonth}-01`
    const endtDate = `${year}-${calculatedMonth}-31`

    return new Promise((resolve, reject) => {
        db.all(
            `SELECT * FROM vehicle_data WHERE vehicle_id = ${id} AND date BETWEEN date('${startDate}') AND date('${endtDate}')  ORDER BY od_meter DESC`,
            (err, rows) => {
                resolve(rows);
            }
        );
    });
};

exports.DeleteVehicleData = async (id, month, year, vehicleId) => {
    return new Promise(async (resolve, reject) => {
        let records = await module.exports.GetVehicleData(vehicleId, month, year);
        let deletingRecord = await GetVehicleDataById(id);

        if (records.length > 0 && records[0].od_meter > deletingRecord.od_meter) {

            // let lessRecord = records.filter(x => Date.parse(x.date) > Date.parse(deletingRecord.date)).pop()
            // let greatRecord = records.filter(x => Date.parse(x.date) < Date.parse(deletingRecord.date))[0]

            let lessRecord = records.filter(x => x.od_meter > deletingRecord.od_meter).pop()
            let greatRecord = records.filter(x => x.od_meter < deletingRecord.od_meter)[0]

            console.log(lessRecord)
            console.log(greatRecord)

            if (lessRecord !== undefined && greatRecord !== undefined) {
                let sql1 = `UPDATE vehicle_data SET usage=${Math.abs(lessRecord.od_meter - greatRecord.od_meter)} WHERE id=${lessRecord.id}`
                await db.run(sql1);
            }
        }

        db.run(`DELETE FROM vehicle_data where id = ${id} `, (err, rows) => {
            resolve(rows);
        });
    });
};

exports.DeleteVehicle = async (id) => {
    return new Promise(async (resolve, reject) => {

        db.run(`DELETE FROM vehicles where id = ${id} `, (err, rows) => {
            resolve(rows);
        });
    });
};

const GetVehicleDataById = (id) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM vehicle_data where id=${id}`, [], (err, rows) => {
            resolve(rows);
        });
    });
}

const UpdateRecord = async () => {

}


