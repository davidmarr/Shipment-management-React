const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});
app.get("/", (req, res) => {
  const sql = "SELECT * FROM spedizioni";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/crea", (req, res) => {
  const sql = `INSERT INTO spedizioni (Nome,Indirizzo,Destinatario,Citta,CAP,Descrizione,DataConsegna) VALUES ('${req.body.nome}','${req.body.destinatario}','${req.body.citta}','${req.body.cap}','${req.body.indirizzo}','${req.body.descrizione}','${req.body.dataConsegna}')`;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.put("/modifica", (req, res) => {
  const sql = `UPDATE spedizioni SET Nome ='${req.body.nome}',Destinatario ='${req.body.destinatario}',Citta ='${req.body.citta}',CAP ='${req.body.cap}',Indirizzo ='${req.body.indirizzo}',Descrizione ='${req.body.descrizione}',DataConsegna='${req.body.dataConsegna}' WHERE ID = ${req.body.id}`;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.delete("/cancella", (req, res) => {
  const sql = `DELETE FROM spedizioni WHERE ID = ${req.body.id}`;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(8082, () => {
  console.log("ascolto");
});
