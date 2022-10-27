import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Container,
  ConteudoForm,
  ConteudoTitulo,
  Titulo,
  BotaoAcao,
  ButtonInfo,
  AlertSuccess,
  AlertDanger,
  Form,
  Label,
  Input,
  ButtonWarning,
} from "./style";

const Editar = (props) => {
  const [id] = useState(props.match.params.id);
  const [titulo, setTitulo] = useState("");
  const [instagram, setInstagram] = useState("");
  const [etapa, setEtapa] = useState("");
  const [status, setStatus] = useState("");

  const [estado, setEstado] = useState({
    type: "",
    mensagem: "",
  });

  const editCronograma = async (e) => {
    e.preventDefault();

    await fetch("http://localhost/Grupo%20Gatti/wsm-2.0/backend/editar.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, titulo, instagram, etapa, status }),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.erro) {
          setEstado({
            type: "error",
            mensagem: responseJson.mensagem,
          });
        } else {
          setEstado({
            type: "success",
            mensagem: responseJson.mensagem,
          });
        }
      })
      .catch(() => {
        setEstado({
          type: "error",
          mensagem: "Cronograma não editado com sucesso, tente mais tarde!",
        });
      });
  };

  useEffect(() => {
    const getCronograma = async () => {
      await fetch(
        "http://localhost/Grupo%20Gatti/wsm-2.0/backend/visualizar.php?id=" + id
      )
        .then((response) => response.json())
        .then((responseJson) => {
          setTitulo(responseJson.cronograma.titulo);
          setInstagram(responseJson.cronograma.instagram);
          setEtapa(responseJson.cronograma.etapa);
          setStatus(responseJson.cronograma.status);
        });
    };
    getCronograma();
  }, [id]);

  return (
    <Container>
      <ConteudoForm>
        <ConteudoTitulo>
          <Titulo>Editar</Titulo>
          <BotaoAcao>
            <Link to="/cronogramas">
              <ButtonInfo>Listar</ButtonInfo>
            </Link>
          </BotaoAcao>
        </ConteudoTitulo>

        {estado.type === "erro" ? (
          <AlertDanger>{estado.mensagem}</AlertDanger>
        ) : (
          ""
        )}
        {estado.type === "success" ? (
          <AlertSuccess>{estado.mensagem}</AlertSuccess>
        ) : (
          ""
        )}

        <Form onSubmit={editCronograma}>
          <Label>Título: </Label>
          <Input
            type="text"
            name="titulo"
            placeholder="Título do cronograma"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <Label>Instagram: </Label>
          <Input
            type="text"
            name="descricao"
            placeholder="Instagram do cliente"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />

          <Label>Etapa: </Label>
          <Input
            type="text"
            name="descricao"
            placeholder="Descrição do cronograma"
            value={etapa}
            onChange={(e) => setEtapa(e.target.value)}
          />

          <Label>Status: </Label>
          <Input
            type="text"
            name="descricao"
            placeholder="Descrição do cronograma"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />

          <ButtonWarning type="submit">Editar</ButtonWarning>
        </Form>
      </ConteudoForm>
    </Container>
  );
};

export default Editar;
