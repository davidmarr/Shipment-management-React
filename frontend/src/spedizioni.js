import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
require("dayjs/locale/it");

function Spedizioni() {
  const MySwal = withReactContent(Swal);
  dayjs.locale("it");
  const [pacchi, setPacchi] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8082/")
      .then((res) => {
        setPacchi(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const CancellaSpedizione = async (id, nome) => {
    MySwal.fire({
      icon: "warning",
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger ms-2",
      },
      buttonsStyling: false,
      showCancelButton: true,
      confirmButtonText: "Si, elimina",
      cancelButtonText: "No, annulla!",
      title: ``,
      html: <h3>Eliminare spedizione {nome}?</h3>,
    }).then((res) => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      if (res.isConfirmed) {
        axios
          .delete("http://localhost:8082/cancella", { data: { id: id } })
          .then((res) => {
            window.location.reload();
            Toast.fire({
              icon: "success",
              text: "Spedizione Eliminata!",
            });
          })
          .catch((err) => {
            console.log(err);
            Toast.fire({
              icon: "error",
              text: "Errore Imprevisto!",
            });
          });
      } else if (res.dismiss === Swal.DismissReason.cancel) {
        Toast.fire({
          icon: "info",
          text: "Operazione annullata",
        });
      }
    });
  };
  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="w-auto">
        <Link to="/crea" className="btn btn-success">
          Aggiungi spedizione <i className="bi bi-plus-circle"></i>
        </Link>
        <Link className="btn btn-success ms-2" to="/calendario">
          Calendario
        </Link>
        <Link className="btn btn-success ms-2" to="/tabella">
          tabella
        </Link>
        <h2 className="text-center ">Elenco Spedizioni</h2>
        <table className="table table-striped table-bordered text-center">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Indirizzo</th>
              <th>Destinatario</th>
              <th>Città</th>
              <th>CAP</th>
              <th>Descrizione</th>
              <th>Data Consegna</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pacchi.map((data, i) => (
              <tr key={i}>
                <td>{data.Nome}</td>
                <td>{data.Indirizzo}</td>
                <td>{data.Destinatario}</td>
                <td>{data.Citta}</td>
                <td>{data.CAP}</td>
                <td>{data.Descrizione}</td>
                <td>{dayjs(data.DataConsegna).format("dddd DD MMMM YYYY")}</td>
                <td>
                  <Link
                    to="/modifica"
                    state={{
                      id: data.ID,
                      nome: data.Nome,
                      indirizzo: data.Indirizzo,
                      destinatario: data.Destinatario,
                      citta: data.Citta,
                      cap: data.CAP,
                      descrizione: data.Descrizione,
                      dataConsegna: dayjs(data.DataConsegna).format(
                        "YYYY-MM-DD"
                      ),
                    }}
                    className="btn btn-primary"
                  >
                    <i className="bi bi-pen"></i>
                  </Link>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={(e) => {
                      CancellaSpedizione(data.ID, data.Nome);
                    }}
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Spedizioni;
