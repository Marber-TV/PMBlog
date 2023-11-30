<?php
include_once("config.php");
$conexion = obtenerConexion();

$titulo = $_POST['titulo'];
$contenido = $_POST['contenido'];
$autor = $_POST['autor'];

$fecha_actual = date("Y-m-d H:i:s"); // Obtener la fecha actual en el formato Año-Mes-Día Hora:Minutos:Segundos

$sql = "INSERT INTO articles(article_id, article_title, article_content, article_date_published, article_author) VALUES (null, '$titulo', '$contenido', '$fecha_actual', '$autor')";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) == 0) {
    responder(null, false, "OK", $conexion);
} else {
    responder(null, true, "Error en la consulta: " . mysqli_error($conexion), $conexion);
}
?>
