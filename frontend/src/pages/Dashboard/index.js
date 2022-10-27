import React, { useState } from "react";
import CadastrarCronogramas from "../../components/cronogramas/Cadastrar";
import SideMenu from "../../components/SideMenu";
import ListarCronogramas from "../Listar";

function Dashboard() {
  const [inactive, setInactive] = useState(false);
  const [activePage, setActivePage] = useState(0);

  return (
    <div className={`container ${inactive ? "inactive" : ""}`}>
      <SideMenu
        onCollapse={(inactive) => {
          console.log(inactive);
          setInactive(inactive);
        }}
        setActivePage={setActivePage}
      />
      {activePage === 0 ? (
        <ListarCronogramas setActivePage={setActivePage} />
      ) : null}
      {activePage === 1 ? (
        <CadastrarCronogramas setActivePage={setActivePage} />
      ) : null}
    </div>
  );
}

export default Dashboard;
