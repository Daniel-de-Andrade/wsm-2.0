<?php

//Cabecalhos obrigatorios
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

//Incluir a conexao
include_once 'conexao.php'; 

$id = filter_input(INPUT_GET, "id", FILTER_SANITIZE_NUMBER_INT);

$response = "";

$query_cronograma = "DELETE FROM cronogramas WHERE id=:id LIMIT 1";
$delete_cronograma = $conn->prepare($query_cronograma);
$delete_cronograma->bindParam(':id', $id, PDO::PARAM_INT);

if($delete_cronograma->execute()){
    $response = [
        "erro" => false,
        "mensagem" => "Cronograma apagado com sucesso!"
    ];
}else{
    $response = [
        "erro" => true,
        "mensagem" => "Erro: Cronograma não apagado com sucesso!"
    ];
}

http_response_code(200);
echo json_encode($response);
