<?php

//cabeçalhos obrigatórios

header("Access-Control-Allow-Origin: *");
header("Content-Type: aplication/json; charset-UTF-8");
header("Access-Control-Allow-Headers: *");
// header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE");


//incluir a conecção
include_once 'conexao.php';

$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);


if ($dados) {

    $query_cronograma = "INSERT INTO cronogramas (titulo, instagram, etapa, status) VALUES (:titulo, :instagram, :etapa, :status)";
    $cad_cronograma = $conn->prepare ($query_cronograma);

    $cad_cronograma->bindParam(':titulo', $dados['cronograma']['titulo'], PDO::PARAM_STR);
    $cad_cronograma->bindParam(':instagram', $dados['cronograma']['instagram'], PDO::PARAM_STR);
    $cad_cronograma->bindParam(':etapa', $dados['cronograma']['etapa'], PDO::PARAM_STR);
    $cad_cronograma->bindParam(':status', $dados['cronograma']['status'], PDO::PARAM_STR);

    $cad_cronograma->execute();

    if($cad_cronograma->rowCount()){
        $response = [
            "error" => false,
            "message" => "Cronograma cadastrado com sucesso!"
        ];
    }else{
        $response = [
            "error" => true,
            "message" => "Cronograma não cadastrado com sucesso!"
        ];
    }

} else {
    $response = [
        "error" => true,
        "message" => "Cronograma não cadastrado com sucesso!"
    ];
}

http_response_code(200);
echo json_encode($response);