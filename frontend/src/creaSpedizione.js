import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CreaSpedizione() {
  const [nome, SetNome] = useState("");
  const [indirizzo, SetIndirizzo] = useState("");
  const [destinatario, SetDestinatario] = useState("");
  const [citta, SetCitta] = useState("");
  const [cap, SetCap] = useState("");
  const [descrizione, SetDescrizione] = useState("");
  const [dataConsegna, SetDataConsegna] = useState("");
  const naviga = useNavigate();
  const InviaModulo = (evento) => {
    evento.preventDefault();
    axios
      .post("http://localhost:8082/crea", {
        nome,
        indirizzo,
        descrizione,
        dataConsegna,
      })
      .then((res) => {
        console.log(res);
        naviga("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="w-50">
        <Link to="/" className="btn btn-primary ">
          <i className="bi bi-arrow-bar-left"></i>
          Torna indietro
        </Link>
        <form className="w-100" onSubmit={InviaModulo}>
          <h2 className="text-center">Aggiungi Spedizione</h2>
          <div className="mb-2">
            <label>Nome</label>
            <input
              type="text"
              placeholder="Inserisci Nome"
              className="form-control"
              onChange={(e) => SetNome(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label>Indirizzo</label>
            <input
              type="text"
              placeholder="Inserisci Indirizzo"
              className="form-control"
              onChange={(e) => SetIndirizzo(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label>Destinatario</label>
            <input
              type="text"
              defaultValue={destinatario}
              placeholder="Inserisci Indirizzo"
              className="form-control"
              onChange={(e) => SetDestinatario(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label>Città</label>
            <input
              type="text"
              defaultValue={citta}
              placeholder="Inserisci Indirizzo"
              className="form-control"
              onChange={(e) => SetCitta(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label>CAP</label>
            <input
              type="text"
              defaultValue={cap}
              placeholder="Inserisci Indirizzo"
              className="form-control"
              onChange={(e) => SetCap(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label>Descrizione</label>
            <textarea
              className="form-control"
              rows={3}
              placeholder="Inserisci Indirizzo"
              onChange={(e) => SetDescrizione(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-2">
            <label>Data Consegna</label>
            <input
              type="date"
              placeholder="Inserisci Indirizzo"
              className="form-control"
              onBlur={(e) => {
                SetDataConsegna(e.target.value);
              }}
              required
            />
          </div>
          <button className="btn btn-success">Aggiungi</button>
        </form>
      </div>
    </div>
  );
}

export default CreaSpedizione;
