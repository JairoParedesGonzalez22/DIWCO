/* =====================================================================
   galeria.js  ·  PÁGINA "GALERÍA"
   ---------------------------------------------------------------------
   - Filtros: Todo / El local / Platos / Eventos.
   - Al pulsar una foto se abre ampliada, con flechas para pasar a la
     anterior o siguiente y una × para cerrar (también con el teclado).
   Orden de scripts:  jQuery → main.js → galeria.js
   ===================================================================== */
$(function () {
  var $visor = $('.visor');
  var $imagenGrande = $visor.find('.visor-img');
  var actual = 0;   // posición de la foto abierta (entre las visibles)

  DIW.activarFiltros('#filtros-galeria', '.galeria .foto');

  // Fotos que se ven en este momento (las que el filtro no ha ocultado)
  function visibles() {
    return $('.galeria .foto').filter(function () { return !this.hidden; });
  }

  // Muestra la foto número "i" (da la vuelta al llegar al final o al principio)
  function mostrar(i) {
    var $fotos = visibles();
    if ($fotos.length === 0) { return; }
    actual = (i + $fotos.length) % $fotos.length;
    var $img = $fotos.eq(actual).find('img');
    $imagenGrande.attr({ src: $img.attr('src'), alt: $img.attr('alt') });
  }

  function cerrar() { $visor.prop('hidden', true); }

  // Abrir: pulsar una foto
  $('.galeria').on('click', '.foto', function () {
    mostrar(visibles().index(this));
    $visor.prop('hidden', false);
    $visor.find('.visor-cerrar').trigger('focus');   // el foco pasa al visor (accesibilidad)
  });

  // Botones del visor
  $visor.on('click', '.visor-cerrar', cerrar);
  $visor.on('click', '.visor-anterior', function () { mostrar(actual - 1); });
  $visor.on('click', '.visor-siguiente', function () { mostrar(actual + 1); });

  // Teclado: Esc cierra, ← y → cambian de foto
  $(document).on('keydown', function (evento) {
    if ($visor.prop('hidden')) { return; }
    if (evento.key === 'Escape') { cerrar(); }
    if (evento.key === 'ArrowLeft') { mostrar(actual - 1); }
    if (evento.key === 'ArrowRight') { mostrar(actual + 1); }
  });
});