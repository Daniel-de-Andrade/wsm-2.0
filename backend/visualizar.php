<?php

//Cabecalhos obrigatorios
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

//Incluir a conexao
include_once 'conexao.php';

// $id = 4;
$id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_NUMBER_INT);
$response = "";

$query_cronograma = "SELECT id, titulo, instagram, etapa, status FROM cronogramas WHERE id=:id LIMIT 1";
$result_cronograma = $conn->prepare($query_cronograma);
$result_cronograma->bindParam(':id', $id, PDO::PARAM_INT);
$result_cronograma->execute();

if(($result_cronograma) AND ($result_cronograma->rowCount() != 0)){
    $row_cronograma = $result_cronograma->fetch(PDO::FETCH_ASSOC);
    extract($row_cronograma);

    $cronograma = [
        'id' => $id,  
        'titulo' => $titulo,
        'instagram' => $instagram,
        'etapa' => $etapa,
        'status' => $status
    ];  

    $response = [
        "erro"=> false,
        "cronograma" => $cronograma
    ];
}else{
    $response = [
        "erro"=> true,
        "messagem" => "cronograma não encontrado!"
    ];
}
http_response_code(200);
echo json_encode($response);
