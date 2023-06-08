import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";
import dayjs from "dayjs";
import itLocale from "@fullcalendar/core/locales/it";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./mappa.css";

function Calendario() {
  const MySwal = withReactContent(Swal);
  const [spedizioni, setSpedizioni] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8082/")
      .then((res) => {
        setSpedizioni(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const eventi = [];
  spedizioni.forEach((spedizione) => {
    eventi.push({
      title: `<strong>${spedizione.Nome}</strong><br> ${spedizione.Destinatario}`,
      date: dayjs(spedizione.DataConsegna).format("YYYY-MM-DD"),
      myId: spedizione.ID,
      nome: spedizione.Nome,
      destinatario: spedizione.Destinatario,
      indirizzo: spedizione.Indirizzo,
      città: spedizione.Citta,
      cap: spedizione.CAP,
    });
  });
  const icona = new Icon({
    iconUrl: require("./img/marker.png"),
    iconSize: [38, 38],
  });
  let posizione = [];
  function handleDateClick(eventInfo) {
    const viaDaCercare = eventInfo.event.extendedProps.indirizzo.replaceAll(
      " ",
      "%20"
    );
    const cittaDaCercare = eventInfo.event.extendedProps.città.replaceAll(
      " ",
      "%20"
    );
    const stringa = `https://nominatim.openstreetmap.org/search/${viaDaCercare}%20${cittaDaCercare}?format=geojson&addressdetails=1&limit=1`;
    console.log(stringa);
    axios
      .get(stringa)
      .then((res) => {
        posizione = [
          res.data.features[0].geometry.coordinates[1],
          res.data.features[0].geometry.coordinates[0],
        ];
        console.log(posizione);
        MySwal.fire({
          width: "50%",
          showCloseButton: true,
          showConfirmButton: false,
          customClass: "swal-height",
          padding: "0px",
          title: `Dettagli Spedizione`,
          html: (
            <MapContainer center={posizione} zoom={18}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={posizione} icon={icona}>
                <Popup>
                  Nome: {eventInfo.event.extendedProps.nome}
                  <br></br>Destinatario:{" "}
                  {eventInfo.event.extendedProps.destinatario} <br></br>
                  Indirizzo: {eventInfo.event.extendedProps.indirizzo} -{" "}
                  {eventInfo.event.extendedProps.città}{" "}
                  {eventInfo.event.extendedProps.cap}
                </Popup>
              </Marker>
            </MapContainer>
          ),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function renderEventContent(eventInfo) {
    return { html: eventInfo.event.title };
  }

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="w-50">
        <Link to="/" className="btn btn-primary ">
          <i className="bi bi-arrow-bar-left"></i>
          Torna indietro
        </Link>
        <FullCalendar
          locale={itLocale}
          eventContent={renderEventContent}
          defaultView="dayGridMonth"
          header={{
            left: "prev,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          themeSystem="Simplex"
          plugins={[dayGridPlugin]}
          events={eventi}
          eventClick={handleDateClick}
        />
      </div>
    </div>
  );
}

export default Calendario;
