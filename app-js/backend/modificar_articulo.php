<?php
include_once("config.php");
$conexion = obtenerConexion();

$id = $_POST['id'];
$titulo = $_POST['titulo'];
$contenido = $_POST['contenido'];
$autor = $_POST['autor'];

$fecha_actual = date("Y-m-d H:i:s"); // Obtener la fecha actual en el formato Año-Mes-Día Hora:Minutos:Segundos

$sql = "UPDATE articles SET article_title = '$titulo', article_content = '$contenido', article_date_published = '$fecha_actual', article_author = '$autor' WHERE article_id = '$id'";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) == 0) {
    responder(null, false, "OK", $conexion);
} else {
    responder(null, true, "Error en la consulta: " . mysqli_error($conexion), $conexion);
}
?>
