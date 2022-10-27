<?php

//cabeçalhos obrigatórios

header("Access-Control-Allow-Origin: *");
header("Content-Type: aplication/json; charset-UTF-8");

//incluir a conecção
include_once 'conexao.php';

$query_cronogramas = "SELECT id, titulo, instagram, etapa, `status` FROM cronogramas ORDER BY id DESC";
$result_cronogramas = $conn->prepare($query_cronogramas);
$result_cronogramas ->execute();

if(($result_cronogramas) AND ($result_cronogramas->rowCount() != 0 )){
    while($row_cronograma = $result_cronogramas->fetch(PDO::FETCH_ASSOC)){
        //var_dump($row_cronograma);
        extract($row_cronograma);
        $lista_cronogramas["records"][$id] = [
            'id' => $id,
            'titulo' => $titulo,
            'instagram' => $instagram,
            'etapa' => $etapa,
            'status' => $status
        ];         
    }
    //Resposta com status 200
    http_response_code(200);

    //Retornar os cronogramas em formato json
    echo json_encode($lista_cronogramas);
}