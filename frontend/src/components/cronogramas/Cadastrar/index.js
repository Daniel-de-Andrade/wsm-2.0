import React, { useState } from "react";
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
  ButtonSuccess,
} from "./style";

const CadastrarCronogramas = () => {
  const [cronograma, setCronograma] = useState({
    titulo: "",
    instagram: "",
    etapa: "",
    status: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const valorInput = (e) =>
    setCronograma({ ...cronograma, [e.target.name]: e.target.value });

  const cadCronograma = async (e) => {
    e.preventDefault();
    // console.log(cronograma.titulo);

    try {
      if (
        !cronograma.titulo ||
        !cronograma.instagram ||
        !cronograma.etapa ||
        !cronograma.status
      ) {
        throw Error("Favor preencher o formulário.");
      }
      await fetch(
        "http://localhost/Grupo%20Gatti/wsm-2.0/backend/cadastrar.php",
        {
          method: "Post",
          headers: {
            "Content-Type": "aplication/json",
          },
          body: JSON.stringify({ cronograma }),
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          // console.log(responseJson);
          if (responseJson.error) {
            setStatus({
              type: "error",
              message: responseJson.message,
            });
          } else {
            setStatus({
              type: "success",
              message: responseJson.message,
            });
          }
        });
    } catch (error) {
      setStatus({
        type: "error",
        message: "Cronograma não cadastrado, tente novamente.",
      });
    }
  };
  return (
    <Container>
      <ConteudoForm>
        <ConteudoTitulo>
          <Titulo>Cadastrar</Titulo>
          <BotaoAcao>
            <Link to="/cronogramas">
              <ButtonInfo>Listar</ButtonInfo>
            </Link>
          </BotaoAcao>
        </ConteudoTitulo>
        {status.type === "error" ? (
          <AlertDanger>{status.message}</AlertDanger>
        ) : (
          ""
        )}
        {status.type === "success" ? (
          <AlertSuccess>{status.message}</AlertSuccess>
        ) : (
          ""
        )}
        <Form onSubmit={cadCronograma}>
          <Label>Título</Label>
          <Input
            type="text"
            name="titulo"
            placeholder="Titulo do cronograma"
            onChange={valorInput}
          />{" "}
          <br />
          <br />
          <Label>Instagram</Label>
          <Input
            type="text"
            name="instagram"
            placeholder="Instagram do cliente"
            onChange={valorInput}
          />{" "}
          <br />
          <br />
          <Label>Etapa</Label>
          <Input
            type="text"
            name="etapa"
            placeholder="Etapa do cronograma"
            onChange={valorInput}
          />{" "}
          <br />
          <br />
          <Label>Status</Label>
          <Input
            type="text"
            name="status"
            placeholder="Status do cronograma"
            onChange={valorInput}
          />{" "}
          <br />
          <br />
          <ButtonSuccess type="submit">Cadastrar</ButtonSuccess>
        </Form>
      </ConteudoForm>
    </Container>
  );
};

export default CadastrarCronogramas;
