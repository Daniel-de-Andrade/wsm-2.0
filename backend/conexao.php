<?php

$host = "localhost";
$user = "root";
$pass = "d@@19870622";
$dbname = "wsm2.0";
$port = "3306";

// Conecção com a porta
$conn = new PDO("mysql:host=$host; port=$port; dbname=".$dbname, $user, $pass);


// Conecção sem a porta
//$conn = new PDO("mysql:host=$host, dbname=".$dbname, $user, $pass);
