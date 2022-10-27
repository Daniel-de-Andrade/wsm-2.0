<?php

//cabeçalhos obrigatórios

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept, Authorization, X-Requested-With, X-Auth-Token, Origin, Application");
header("Content-Type: aplication/json; charset-UTF-8");

//incluir a conecção
include_once 'conexao.php';

$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);

if($dados){
    $query_cronograma = "UPDATE cronogramas SET titulo=:titulo, instagram=:instagram, etapa=:etapa, status=:status WHERE id=:id";
    $edit_cronograma = $conn->prepare($query_cronograma);

    $edit_cronograma->bindParam(':titulo', $dados['titulo'], PDO::PARAM_STR);
    $edit_cronograma->bindParam(':instagram', $dados['instagram'], PDO::PARAM_STR);
    $edit_cronograma->bindParam(':etapa', $dados['etapa'], PDO::PARAM_STR);
    $edit_cronograma->bindParam(':status', $dados['status'], PDO::PARAM_STR);
    $edit_cronograma->bindParam(':id', $dados['id'], PDO::PARAM_INT);
    $edit_cronograma->bindParam(':id', $dados['id'], PDO::PARAM_INT);

    $edit_cronograma->execute();

    if($edit_cronograma->rowCount()){
        $response = [
            "erro" => false,
            "mensagem" => "cronograma editado com sucesso!"
        ];
    }else{
        $response = [
            "erro" => false,
            "mensagem" => "cronograma não editado com sucesso!"
        ];
    }
}else{
    $response = [
        "erro" => false,
        "mensagem" => "cronograma não editado com sucesso!"
    ];
}

http_response_code(200);
echo json_encode($response);