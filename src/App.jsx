import React from "react";

// Importando o outlet do rea
import { Outlet } from "react-router-dom";

//Importação do React-Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// importando components do bootstrap
import Container from "react-bootstrap/Container";

import NavBarra from "./components/NavBarra"

function App() {
  return (
    <>
      <React.StrictMode>
        <div className="App">
          <NavBarra />
          <Container>
            <Outlet />
          </Container>
        </div>
      </React.StrictMode>
    </>
  );
}

export default App;
