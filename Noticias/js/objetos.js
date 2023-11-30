class Articulo {
    constructor(id, titulo, contenido, autor) {
        this.id = id;
        this.titulo = titulo;
        this.contenido = contenido;
        this.autor = autor;
    }
}

class Comentario {
    constructor(id, contenido, autor, article_id) {
        this.id = id;
        this.contenido = contenido;
        this.autor = autor;
        this.article_id = article_id;
    }
}



class Blog {
   async listarArticulos() {
    let respuesta = await  peticionGET("get_articulos.php", new FormData());
    return respuesta;
    }

    async buscarArticulo(id) {
        let datos = new FormData();
        datos.append("id", id);
        let oRespuesta = await peticionPOST("get_articulo.php", datos);
        return oRespuesta;
    }
    async altaComentario(oComentario) {
        let datos = new FormData();
        datos.append("comentario", oComentario.contenido);
        datos.append("autor", oComentario.autor);
        datos.append("article_id", oComentario.article_id);
        let oRespuesta = await peticionPOST("alta_comentario.php", datos);
        return oRespuesta;
    }

    async listarComentarios(id) {
        let datos = new FormData();
        datos.append("id", id);
        let oRespuesta = await peticionGET("get_comentarios.php", datos);
        return oRespuesta;
    }

    async altaArticulo(oArticulo) {
        let datos = new FormData();
        datos.append("titulo", oArticulo.titulo);
        datos.append("contenido", oArticulo.contenido);
        datos.append("autor", oArticulo.autor);
        let oRespuesta = await peticionPOST("alta_articulo.php", datos);
        return oRespuesta;
    }

    async borrarArticulo(id) {
        let datos = new FormData();
        datos.append("id", id);
        let oRespuesta = await peticionPOST("borrar_articulo.php", datos);
        return oRespuesta;

    }

    async borrarComentario(id) {
        let datos = new FormData();
        datos.append("id", id);
        let oRespuesta = await peticionPOST("borrar_comentario.php", datos);
        return oRespuesta;

    }

    async buscarComentario(id) {
        let datos = new FormData();
        datos.append("id", id);
        let oRespuesta = await peticionGET("buscar_comentario.php", datos);
        return oRespuesta;

    }

    async modificarComentario(oComentario) {
        let datos = new FormData();
        datos.append("id", oComentario.id);
        datos.append("contenido", oComentario.contenido);
        datos.append("autor", oComentario.autor);
        datos.append("article_id", oComentario.article_id);
        let oRespuesta = await peticionPOST("modificar_comentario.php", datos);
        return oRespuesta;
    }   

    async ActualizarArticulo(oArticulo) {
        let datos = new FormData();
        datos.append("id", oArticulo.id);
        datos.append("titulo", oArticulo.titulo);
        datos.append("contenido", oArticulo.contenido);
        datos.append("autor", oArticulo.autor);
        let oRespuesta = await peticionPOST("modificar_articulo.php", datos);
        return oRespuesta;
    }
} 