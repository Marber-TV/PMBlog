<?php
include_once("config.php");
$conexion = obtenerConexion();

$comentario = $_POST['comentario'];
$autor = $_POST['autor'];
$articulo = $_POST['article_id'];

$fecha_actual = date("Y-m-d H:i:s"); // Obtener la fecha actual en el formato Año-Mes-Día Hora:Minutos:Segundos

$sql = "INSERT INTO comments(comment_id, comment_text, comment_date, article_id, comment_author) VALUES (null, '$comentario', '$fecha_actual', '$articulo', '$autor')";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) == 0) {
    responder(null, false, "OK", $conexion);
} else {
    responder(null, true, "Error en la consulta: " . mysqli_error($conexion), $conexion);
}
?>
