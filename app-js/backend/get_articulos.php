<?php 
include_once ("config.php");
$conexion = obtenerConexion();
$consulta = "SELECT * FROM articles";
$resultado = mysqli_query($conexion, $consulta);
while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila;
 }
responder($datos, false, "OK", $conexion);