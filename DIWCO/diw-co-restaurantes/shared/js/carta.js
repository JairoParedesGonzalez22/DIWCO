/* =====================================================================
   carta.js  ·  PÁGINA "LA CARTA"
   ---------------------------------------------------------------------
   Lee la lista CARTA (definida en cada restaurante, en js/carta-data.js),
   dibuja una tarjeta por plato y activa los filtros de categoría.
   Orden de scripts:  jQuery → main.js → carta-data.js → carta.js
   ===================================================================== */
$(function () {
  var $lista = $('#lista-platos');

  // Por cada plato de CARTA creamos una tarjeta con jQuery.
  // Usamos .text() (no .html()) para insertar el texto de forma segura.
  $.each(CARTA, function (i, plato) {
    var $tarjeta = $('<article class="tarjeta">').attr('data-categoria', plato.categoria);

    $('<img>').attr({ src: plato.imagen, alt: plato.nombre }).appendTo($tarjeta);

    var $cuerpo = $('<div class="tarjeta-cuerpo">').appendTo($tarjeta);
    $('<h3>').text(plato.nombre).appendTo($cuerpo);
    $('<p>').text(plato.descripcion).appendTo($cuerpo);

    var $pie = $('<div class="tarjeta-pie">').appendTo($tarjeta);
    $('<strong>').text(DIW.euros(plato.precio)).appendTo($pie);
    // "Pedir" lleva al pedido y le dice qué plato añadir: ?add=croquetas
    $('<a class="boton">').attr('href', 'pedido-online.html?add=' + plato.id).text('Pedir').appendTo($pie);

    $lista.append($tarjeta);
  });

  DIW.activarFiltros('#filtros-carta', '#lista-platos .tarjeta');
});