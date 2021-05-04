var express = require("express");
var router = express.Router();
const conn = require("../app");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    await conn.query(
      `SELECT DATE_FORMAT(TerakhirUpdate, "%Y-%m-%d") as date,
      TIME_FORMAT(TerakhirUpdate, "%T") as time from log_evoucherperincian
      ORDER BY id DESC Limit 1`,
      (err, results) => {
        if (err) res.send(err);
        res.json({ error: false,
                   data : results[0]});
      }
    );
  } catch (error) {
    console.error(error);
  }
});

router.post("/", async function (req, res, next) {
  try {
        res.json({ error: false,
                   data :true});
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
