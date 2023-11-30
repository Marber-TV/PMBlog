<?php 
include_once ("config.php");
$conexion = obtenerConexion();
$ID = $_POST['id'];
$consulta = "DELETE FROM articles WHERE article_id = $ID";
$resultado = mysqli_query($conexion, $consulta);
responder(null, false, "OK", $conexion); 