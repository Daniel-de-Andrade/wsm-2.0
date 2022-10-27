import React from "react";
import CadastrarCronogramas from "../../components/cronogramas/Cadastrar";
import Cronogramas from "../../components/cronogramas/Listar";

const ListarCronogramas = () => {
  return (
    <div>
      <Cronogramas />
      <CadastrarCronogramas />
    </div>
  );
};

export default ListarCronogramas;
