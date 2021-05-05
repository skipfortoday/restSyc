var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
const conn = require("../app");

router.get("/", async function (req, res, next) {
  try {
    await conn.query(
      `SELECT DATE_FORMAT(TerakhirUpdate, "%Y-%m-%d") as date,
      TIME_FORMAT(TerakhirUpdate, "%T") as time from log_evoucherperincian
      ORDER BY id DESC Limit 1`,
      (err, results) => {
        if (err) console.log(err);
        res.json({
          success: true,
          message: "Berhasil Mengambil Jam Terakhir Sinkron",
          data: results[0],
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Error SQL",
      data: false,
    });
  }
});

router.post("/", async function (req, res, next) {
  console.log(req.body);
  try {
    await


    res.json({
      success: true,
      message: "Berhasil Ambil Data",
      data: req.body,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Error SQL",
      data: false,
       });
  }
});

module.exports = router;
