<?php 
include_once ("config.php");
$conexion = obtenerConexion();
$ID = $_GET['id'];

if ($conexion) {
    $consulta = "SELECT * FROM comments WHERE comment_id = $ID";
    $resultado = mysqli_query($conexion, $consulta);

    if ($resultado) { 
        if(mysqli_num_rows($resultado) > 0) {
            $fila = mysqli_fetch_assoc($resultado);
            responder($fila, false, "OK", $conexion);
        } else {
            responder(null, true, "No se encontró el artículo", $conexion);
        }
    } else {
        responder(null, true, "Error en la consulta: " . mysqli_error($conexion), $conexion);
    }
} else {
    responder(null, true, "Error en la conexión a la base de datos", null);
}
