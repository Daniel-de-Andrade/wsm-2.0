import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Container,
  ConteudoTitulo,
  BotaoAcao,
  ButtonInfo,
  Titulo,
  ConteudoProd,
} from "./style";

const Visualizar = (props) => {
  const [data, setData] = useState([]);

  const [id] = useState(props.match.params.id);

  useEffect(() => {
    const getCronograma = async () => {
      await fetch(
        "http://localhost/Grupo%20Gatti/wsm-2.0/backend/visualizar.php?id=" + id
      )
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          setData(responseJson.cronograma);
        });
    };
    getCronograma();
  }, [id]);
  return (
    <Container>
      <ConteudoTitulo>
        <Titulo>Visualizar</Titulo>
        <BotaoAcao>
          <Link to="/cronogramas">
            <ButtonInfo>Listar</ButtonInfo>
          </Link>
        </BotaoAcao>
      </ConteudoTitulo>
      <ConteudoProd>ID: {data.id}</ConteudoProd>
      <ConteudoProd>Título: {data.titulo}</ConteudoProd>
      <ConteudoProd>Instagram: {data.instagram}</ConteudoProd>
      <ConteudoProd>Etapa: {data.etapa}</ConteudoProd>
      <ConteudoProd>Status: {data.status}</ConteudoProd>
    </Container>
  );
};

export default Visualizar;
