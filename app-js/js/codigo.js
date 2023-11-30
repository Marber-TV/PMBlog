"use strict";

// MAIN PROGRAM
var oBlog = new Blog();

registrarEventos();

// Registro de eventos
function registrarEventos() {
    // Opciones de menú
    document
        .querySelector("#mnualtaArticulo")
        .addEventListener("click", mostrarFormulario);

    document
        .querySelector("#mnuListadoArticulos")
        .addEventListener("click", mostrarFormulario);

    document
        .querySelector("#mnuBuscarxID")
        .addEventListener("click", mostrarFormulario);

    document
        .querySelector("#mnuAltaComentario")
        .addEventListener("click", mostrarFormulario);

    document
        .querySelector("#inicio")
        .addEventListener("click", ocultarFormularios);

    document.querySelector("#mnuListarComentarios").addEventListener("click", mostrarFormulario);

    // Botones
    frmBuscarxID.btnBuscar.addEventListener("click", buscarID);
    frmAltaComentario.btnAltaComentario.addEventListener("click", altaComentario);
    lstComentarios.btnListarComentario.addEventListener("click", listarComentarios);
    frmAltaArticulo.btnAltaArticulo.addEventListener("click", altaArticulo);
    frmMODComentario.btnModComentario.addEventListener("click", modificarComentario);
    frmMODArticulo.btnModArticulo.addEventListener("click", modificarArticulo);
}

function mostrarFormulario(oEvento) {
    let opcionMenu = oEvento.target.id; // Opción de menú pulsada (su id)

    ocultarFormularios();

    switch (opcionMenu) {
        case "mnualtaArticulo":
            frmAltaArticulo.style.display = "block";
            break;
        case "mnuListadoArticulos":
            lstArticulos();
            break;
        case "mnuBuscarxID":
            frmBuscarxID.style.display = "block";
            break;
        case "mnuAltaComentario":
            frmAltaComentario.style.display = "block";
            actualizarSelects();
            break;
        case "mnuListarComentarios":
            actualizarSelects();
            lstComentarios.style.display = "block";
            break;
    }
}

function ocultarFormularios() {
    frmAltaArticulo.style.display = "none";
    frmBuscarxID.style.display = "none";
    document.querySelector("#lstArticulos").style.display = "none";
    document.querySelector("#resultadoBusqueda").style.display = "none";
    frmAltaComentario.style.display = "none";
    document.querySelector("#lstComentariosResult").style.display = "none";
    lstComentarios.style.display = "none";
    frmAltaArticulo.style.display = "none";
    frmMODComentario.style.display = "none";
    frmMODArticulo.style.display = "none";
}


async function lstArticulos() {
    let respuesta = await oBlog.listarArticulos();
    let lstTabla = "<table class='table bg-light table-striped'>";
    lstTabla += '<thead><tr><th>ID</th><th>Titulo</th><th>Contenido</th><th>Fecha</th><th>Autor</th></thead>'
    for (let dato of respuesta.datos) {
        lstTabla += "<tr><td>" + dato.article_id + "</td>";
        lstTabla += "<td>" + dato.article_title + "</td>";
        lstTabla += "<td>" + dato.article_content + "</td>";
        lstTabla += "<td>" + dato.article_date_published + "</td>";
        lstTabla += "<td>" + dato.article_author + "</tr></td>";
    }
    lstTabla += "</table>";
    document.querySelector("#lstArticulos").innerHTML = lstTabla;
    document.querySelector("#lstArticulos").style.display = "block";

}


async function buscarID() {

    let id = parseInt(frmBuscarxID.txtBuscar.value.trim());
    let respuesta = await oBlog.buscarArticulo(id);
    if (respuesta.error) {
        alert(respuesta.mensaje);
        document.querySelector("#resultadoBusqueda").style.display = "none";
    } else {
        if (respuesta.datos == null) {
            document.querySelector("#resultadoBusqueda").style.display = "none";
        } else {
            let tabla = "<table class='table bg-light table-striped'>";
            tabla += '<thead><tr><th>ID</th><th>Titulo</th><th>Contenido</th><th>Fecha</th><th>Autor</th><th>Editar</th><th>Borrar</th</thead>'
            tabla += "<tbody><tr><td>" + respuesta.datos.article_id + "</td>";
            tabla += "<td>" + respuesta.datos.article_title + "</td>";
            tabla += "<td>" + respuesta.datos.article_content + "</td>";
            tabla += "<td>" + respuesta.datos.article_date_published + "</td>";
            tabla += "<td>" + respuesta.datos.article_author + "</td>";
            tabla += "<td><button type='button' class='btn btn-primary' id='btnEditar'>Editar</button></td>";
            tabla += "<td><button type='button' class='btn btn-danger' id='btnBorrar'>Borrar</button></td></tr>";
            tabla += "</tbody></table>";
            document.querySelector("#resultadoBusqueda").innerHTML = tabla;
            document.querySelector("#resultadoBusqueda").style.display = "block";
            document.querySelector("#btnEditar").addEventListener("click", editarArticulo);
            document.querySelector("#btnBorrar").addEventListener("click", borrarArticulo);
        }
    }
}

async function borrarArticulo() {
    let id = parseInt(frmBuscarxID.txtBuscar.value.trim());
    let respuesta = await oBlog.borrarArticulo(id);
    if (respuesta.error) {
        alert(respuesta.mensaje);
    } else {
        alert("Articulo borrado correctamente");
        frmBuscarxID.reset();
        document.querySelector("#resultadoBusqueda").style.display = "none";
    }
}

async function editarArticulo() {
    let id = parseInt(frmBuscarxID.txtBuscar.value.trim());
    let respuesta = await oBlog.buscarArticulo(id);
    if (respuesta.error) {
        alert(respuesta.mensaje);
    } else {
        frmMODArticulo.style.display = "block";
        frmBuscarxID.style.display = "none";
        document.querySelector("#resultadoBusqueda").style.display = "none";
        frmMODArticulo.txtModTitulo.value = respuesta.datos.article_title;
        frmMODArticulo.txtModContenido.value = respuesta.datos.article_content;
        frmMODArticulo.txtModAutor.value = respuesta.datos.article_author;
        frmMODArticulo.articuloModID.value = respuesta.datos.article_id;
    }

}

async function altaComentario() {
    ocultarFormularios();
    let idArticulo = frmAltaComentario.lstArt.value.trim();
    let comentario = frmAltaComentario.comentarioContenido.value.trim();
    let autor = frmAltaComentario.comentarioAutor.value.trim();
    let respuesta = await oBlog.altaComentario(new Comentario(null, comentario, autor, idArticulo));
    if (respuesta.error) {
        alert(respuesta.mensaje);
    } else {
        alert("Comentario dado de alta correctamente");
        frmAltaComentario.reset();
    }
}

async function modificarComentario() {
    let id = parseInt(frmMODComentario.comentarioModID.value.trim());
    let idArt = parseInt(frmMODComentario.modArtID.value.trim());
    let comentario = frmMODComentario.comentarioModContenido.value.trim();
    let autor = frmMODComentario.comentarioModAutorthor.value.trim();
    let respuesta = await oBlog.modificarComentario(new Comentario(id, comentario, autor, idArt));
    if (respuesta.error) {
        alert(respuesta.mensaje);
    } else {
        alert("Comentario modificado correctamente");
        frmMODComentario.reset();
        frmMODComentario.style.display = "none";
    }

}

async function modificarArticulo() {
    let id = parseInt(frmMODArticulo.articuloModID.value.trim());
    let titulo = frmMODArticulo.txtModTitulo.value.trim();
    let contenido = frmMODArticulo.txtModContenido.value.trim();
    let autor = frmMODArticulo.txtModAutor.value.trim();
    let respuesta = await oBlog.ActualizarArticulo(new Articulo(id, titulo, contenido, autor));
    if (respuesta.error) {
        alert(respuesta.mensaje);
    } else {
        alert("Articulo modificado correctamente");
        frmMODArticulo.reset();
        frmMODArticulo.style.display = "none";
    }
}

async function listarComentarios() {
    let id = parseInt(lstComentarios.lstArtBuscar.value.trim());
    let respuesta = await oBlog.listarComentarios(id);
    if (respuesta.datos == null) {
        alert("No hay comentarios para este articulo");
    } else {
        let lstTabla = "<table class='table bg-light table-striped'>";
        lstTabla += '<thead><tr><th>ID</th><th>Contenido</th><th>Fecha</th><th>Autor</th><th>Editar</th><th>Borrar</th></tr></thead>'
        for (let dato of respuesta.datos) {
            lstTabla += "<tr><td>" + dato.comment_id + "</td>";
            lstTabla += "<td>" + dato.comment_text + "</td>";
            lstTabla += "<td>" + dato.comment_date + "</td>";
            lstTabla += "<td>" + dato.comment_author + "</td>";
            lstTabla += "<td><input type='button' class='btn btn-primary btnEditarComentario' data-comentario='" + dato.comment_id + "' value='Editar'></td>";
            lstTabla += "<td><input type='button' class='btn btn-danger btnBorrarComentario' data-comentario='" + dato.comment_id + "' value='Borrar'></td></tr>";
        }

        lstTabla += "</table>";
        document.querySelector("#lstComentariosResult").innerHTML = lstTabla;
        document.querySelector("#lstComentariosResult").style.display = "block";

        let btnsEditarComentario = document.querySelectorAll(".btnEditarComentario");
        btnsEditarComentario.forEach(btn => {
            btn.addEventListener("click", editarComentario);
        });

        let btnsBorrarComentario = document.querySelectorAll(".btnBorrarComentario");
        btnsBorrarComentario.forEach(btn => {
            btn.addEventListener("click", borrarComentario);
        });
    }
}

async function borrarComentario(event) {
    let id = parseInt(event.target.getAttribute('data-comentario'));
    let respuesta = await oBlog.borrarComentario(id);
    if (respuesta.error) {
        alert(respuesta.mensaje);
    } else {
        alert("Comentario borrado correctamente");
        document.querySelector("#lstComentariosResult").style.display = "none";
    }
}

async function editarComentario(event) {
    let id = parseInt(event.target.getAttribute('data-comentario'));
    let respuesta = await oBlog.buscarComentario(id);
    if (respuesta.error) {
        alert(respuesta.mensaje);
    } else {
        frmMODComentario.style.display = "block";
        lstComentarios.style.display = "none";
        document.querySelector("#lstComentariosResult").style.display = "none";
        frmMODComentario.comentarioModContenido.value = respuesta.datos.comment_text;
        frmMODComentario.comentarioModAutorthor.value = respuesta.datos.comment_author;
        frmMODComentario.modArtID.value = respuesta.datos.article_id;
        frmMODComentario.comentarioModID.value = respuesta.datos.comment_id;
    }
}



async function actualizarSelects() {
    let respuesta = await oBlog.listarArticulos();
    let options = "";
    for (let dato of respuesta.datos) {
        options += "<option value='" + dato.article_id + "'>" + dato.article_title + "</option>";
    }
    frmAltaComentario.lstArt.innerHTML = options;
    lstComentarios.lstArtBuscar.innerHTML = options;
}

async function altaArticulo() {
    let titulo = frmAltaArticulo.txtTitulo.value.trim();
    let contenido = frmAltaArticulo.txtContenido.value.trim();
    let autor = frmAltaArticulo.txtAutor.value.trim();
    let respuesta = await oBlog.altaArticulo(new Articulo(null, titulo, contenido, autor));
    if (respuesta.error) {
        alert(respuesta.mensaje);
    } else {
        alert("Todo Bien");
        frmAltaArticulo.reset();
    }
}