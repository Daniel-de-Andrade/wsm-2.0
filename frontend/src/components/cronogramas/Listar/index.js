import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Container,
  ConteudoTitulo,
  BotaoAcao,
  ButtonSuccess,
  Table,
  Titulo,
  ButtonPrimary,
  ButtonWarning,
  ButtonDanger,
  AlertSuccess,
  AlertDanger,
} from "./style";

const Listar = () => {
  const [data, setData] = useState([]);

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const getCronogramas = async () => {
    fetch("http://localhost/Grupo%20Gatti/wsm-2.0/backend/index.php")
      .then((response) => response.json())
      .then((responseJson) =>
        //console.log(responseJson),
        setData(responseJson.records)
      );
  };

  const apagarCronograma = async (idCronograma) => {
    //console.log(idcronograma);
    await fetch(
      "http://localhost/Grupo%20Gatti/wsm-2.0/backend/apagar.php?id=" +
        idCronograma
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.erro) {
          setStatus({
            type: "erro",
            mensagem: responseJson.mensagem,
          });
        } else {
          setStatus({
            type: "success",
            mensagem: responseJson.mensagem,
          });
          getCronogramas();
        }
      })
      .catch(() => {
        setStatus({
          type: "erro",
          mensagem:
            "Erro: cronograma não apagado com sucesso, tente mais tarde",
        });
      });
  };

  useEffect(() => {
    getCronogramas();
  }, []);

  return (
    <Container>
      <ConteudoTitulo>
        <Titulo>Listar</Titulo>
        <BotaoAcao>
          <Link to="/cronogramas/criar">
            <ButtonSuccess>Cadastrar</ButtonSuccess>
          </Link>
        </BotaoAcao>
      </ConteudoTitulo>

      {status.type === "erro" ? (
        <AlertDanger>{status.mensagem}</AlertDanger>
      ) : (
        ""
      )}
      {status.type === "success" ? (
        <AlertSuccess>{status.mensagem}</AlertSuccess>
      ) : (
        ""
      )}

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Instagram</th>
            <th>Etapa</th>
            <th>Status</th>
            <th>Detalhes</th>
            <th>Editar</th>
            <th>Apagar</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(data).map((cronograma) => (
            <tr key={cronograma.id}>
              <td>{cronograma.id}</td>
              <td>{cronograma.titulo}</td>
              <td>{cronograma.instagram}</td>
              <td>{cronograma.etapa}</td>
              <td>{cronograma.status}</td>
              <td>
                <Link to={"/cronogramas/visualizar/" + cronograma.id}>
                  <ButtonPrimary>Visualizar</ButtonPrimary>
                </Link>{" "}
              </td>
              <td>
                <Link to={"/cronogramas/editar/" + cronograma.id}>
                  <ButtonWarning>Editar</ButtonWarning>
                </Link>{" "}
              </td>
              <td>
                <ButtonDanger onClick={() => apagarCronograma(cronograma.id)}>
                  Apagar
                </ButtonDanger>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Listar;
