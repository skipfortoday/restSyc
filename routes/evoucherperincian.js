var express = require("express");
var router = express.Router();
const conn = require("../app");

router.get("/", async function (req, res, next) {
  try {
    conn.query(
      `SELECT DATE_FORMAT(CreateAt, "%Y-%m-%d") as date,
      TIME_FORMAT(CreateAt, "%T") as time 
      from tevoucherperincian
      ORDER BY CreateAt DESC Limit 1`,
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
            data: results[0].date + " " + results[0].time,
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
      `INSERT INTO tevoucherperincian (
        RecordNum,Tanggal,NoBukti,Keterangan,AmountD,AmountK,
        SaldoAwal,SaldoAkhir,IndexNum,UserID,TglInput,Ubah,
        Hapus,Pelanggan,Lokasi,Evoucher,Flag,Koreksi,CreateAt
        ) VALUES ${req.body.data} 
        ON DUPLICATE KEY UPDATE
        RecordNum=VALUES(RecordNum),
        Tanggal=VALUES(Tanggal),
        NoBukti=VALUES(NoBukti),
        Keterangan=VALUES(Keterangan),
        AmountD=VALUES(AmountD),
        AmountK,
        SaldoAwal,
        SaldoAkhir,
        IndexNum,
        UserID,
        TglInput,
        Ubah,
        Hapus,
        Pelanggan,
        Lokasi,
        Evoucher,
        Flag,
        Koreksi,
        CreateAt
        ;`,
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

router.get("/data", async function (req, res, next) {
  try {
    conn.query(
      `SELECT Flag,Lokasi,      
      DATE_FORMAT(CreateAt, "%Y-%m-%d %T") as Time
      from tevoucherperincian
      ORDER BY CreateAt DESC`,
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
            message: "Berhasil Mendapatkan Data",
            data: results,
          });
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
});


module.exports = router;
