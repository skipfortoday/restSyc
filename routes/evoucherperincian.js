var express = require("express");
var router = express.Router();
const conn = require("../app");

router.get("/", async function (req, res, next) {
  try {
    conn.query(
      `SELECT time from tevoucherperincian ORDER BY time DESC Limit 1`,
      (err, results) => {
        if (err) {
          res.json({
            success: false,
            status: 409,
            message: err.sqlMessage,
            data: false,
          });
        } else {
          res.json({
            success: true,
            status: 200,
            message: "Berhasil Mengambil Jam Terakhir Sinkron",
            data: results[0],
          });
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
});

router.post("/", async function (req, res, next) {
  try {
    conn.query(
      `INSERT IGNORE tevoucherperincian (
        RecordNum,Tanggal,NoBukti,Keterangan,AmountD,AmountK,
        SaldoAwal,SaldoAkhir,IndexNum,UserID,TglInput,Ubah,
        Hapus,Pelanggan,Lokasi,Evoucher,Flag,Koreksi
        ) VALUES ${req.body.data};`,
      (err, results) => {
        if (err) {
          res.json({
            success: false,
            status: 204,
            message: "Belum ada data untuk sinkron",
            data: false,
          });
        } else {
          if (results.affectedRows > 0){
            conn.query(`INSERT INTO log_evoucherperincian (KodeCabang) VALUES ('SB2')`, (err) => {
              if (err) {
                console.log(err);
              }
            });
            res.json({
              success: true,
              status: 201,
              message: results,
              data: false,
            });
          }
          else {
            res.json({
              success: false,
              status: 409,
              message: results.data,
              data: false,
            });
          }
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
