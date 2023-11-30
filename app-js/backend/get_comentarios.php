<?php 
include_once ("config.php");
$conexion = obtenerConexion();
$ID = $_GET['id'];;
$consulta = "SELECT * FROM comments WHERE article_id = $ID";
$resultado = mysqli_query($conexion, $consulta);
while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila;
 }
responder($datos, false, "OK", $conexion);