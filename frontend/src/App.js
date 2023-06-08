import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Spedizioni from "./spedizioni";
import CreaSpedizione from "./creaSpedizione";
import ModificaSpedizioni from "./ModificaSpedizione";
import Calendario from "./Calendario";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Spedizioni />}></Route>
          <Route path="/crea" element={<CreaSpedizione />}></Route>
          <Route path="/modifica/" element={<ModificaSpedizioni />}></Route>
          <Route path="/calendario/" element={<Calendario />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
