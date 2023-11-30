<?php
include_once("config.php");
$conexion = obtenerConexion();

$id = $_POST['id'];
$contenido = $_POST['contenido'];
$autor = $_POST['autor'];
$articulo = $_POST['article_id'];

$fecha_actual = date("Y-m-d H:i:s"); 

$sql = "UPDATE comments SET comment_text = '$contenido', comment_date = '$fecha_actual', article_id = '$articulo', comment_author = '$autor' WHERE comment_id = '$id'";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) == 0) {
    responder(null, false, "OK", $conexion);
} else {
    responder(null, true, "Error en la consulta: " . mysqli_error($conexion), $conexion);
}
?>
