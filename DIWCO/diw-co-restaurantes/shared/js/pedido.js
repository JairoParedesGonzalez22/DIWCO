/* =====================================================================
   pedido.js  ·  PÁGINA "PEDIDO ONLINE"
   ---------------------------------------------------------------------
   - Dibuja la lista de platos (todos empiezan en 0).
   - Los botones + y − cambian la cantidad.
   - Si se llega desde la carta con ?add=croquetas, ese plato suma 1.
   - Calcula subtotal, envío y total, y valida el formulario.
   - Guarda el pedido en el navegador para no perderlo al cambiar de página.
   Orden de scripts:  jQuery → main.js → carta-data.js → pedido.js
   ===================================================================== */
$(function () {
  var $form = $('#form-pedido');
  var CLAVE = 'diw-pedido-' + DIW.sitio;   // un pedido distinto por restaurante
  var ENVIO = 3.5;                         // gastos de envío a domicilio (€)
  var modo = 'domicilio';                  // "domicilio" o "recoger"
  var carrito = DIW.leer(CLAVE, {});       // { croquetas: 2, tarta: 1, ... }

  // 1. DIBUJAR LA LISTA DE PLATOS ------------------------------------------
  var $lista = $('#lista-pedido');
  $.each(CARTA, function (i, plato) {
    var $fila = $('<div class="fila-plato">').attr({ 'data-id': plato.id, 'data-categoria': plato.categoria });

    $('<img>').attr({ src: plato.imagen, alt: plato.nombre }).appendTo($fila);

    var $texto = $('<div>').appendTo($fila);
    $('<h3>').text(plato.nombre).appendTo($texto);
    $('<p>').text(plato.descripcion).appendTo($texto);

    $('<strong>').text(DIW.euros(plato.precio)).appendTo($fila);

    // Contador: [−] 0 [+]
    var $contador = $('<div class="contador">').appendTo($fila);
    $('<button type="button">').attr({ 'data-paso': -1, 'aria-label': 'Quitar una unidad de ' + plato.nombre }).text('−').appendTo($contador);
    $('<output>').text('0').appendTo($contador);
    $('<button type="button">').attr({ 'data-paso': 1, 'aria-label': 'Añadir una unidad de ' + plato.nombre }).text('+').appendTo($contador);

    $lista.append($fila);
  });

  // 2. PLATO QUE VIENE DE LA CARTA (?add=id) ----------------------------------
  var idNuevo = new URLSearchParams(location.search).get('add');
  var existe = $.grep(CARTA, function (p) { return p.id === idNuevo; }).length > 0;
  if (idNuevo && existe) {
    carrito[idNuevo] = (carrito[idNuevo] || 0) + 1;
    // Quitamos "?add=..." de la dirección para que recargar no sume otra vez
    history.replaceState(null, '', location.pathname);
  }

  // 3. PINTAR: actualiza cantidades, resumen y totales ---------------------------
  function pintar() {
    var subtotal = 0, unidades = 0;
    var $lineas = $('#lineas-pedido').empty();

    $.each(CARTA, function (i, plato) {
      var cantidad = carrito[plato.id] || 0;
      $lista.find('[data-id="' + plato.id + '"] output').text(cantidad);

      if (cantidad > 0) {
        subtotal += cantidad * plato.precio;
        unidades += cantidad;
        $('<li>').append(
          $('<span>').text(cantidad + ' × ' + plato.nombre),
          $('<span>').text(DIW.euros(cantidad * plato.precio))
        ).appendTo($lineas);
      }
    });
    if (unidades === 0) { $('<li>').text('Aún no has añadido platos.').appendTo($lineas); }

    var envio = (modo === 'domicilio' && unidades > 0) ? ENVIO : 0;
    $('#subtotal').text(DIW.euros(subtotal));
    $('#envio').text(DIW.euros(envio));
    $('#total').text(DIW.euros(subtotal + envio));
    $('#unidades').text(unidades + (unidades === 1 ? ' unidad' : ' unidades'));
    $('#modo-actual').text(modo === 'domicilio' ? 'Entrega a domicilio' : 'Recoger en tienda');

    // Botones de modalidad: el activo se rellena
    $('[data-modo]').each(function () {
      $(this).toggleClass('activo', $(this).data('modo') === modo);
    });
    // Dirección y teléfono solo se piden (y son obligatorios) a domicilio
    $('.solo-domicilio').prop('hidden', modo !== 'domicilio');
    $form.find('.solo-domicilio input').prop('required', modo === 'domicilio');

    DIW.guardar(CLAVE, carrito);
    return unidades;
  }

  // Muestra un mensaje de éxito o de error bajo el botón
  function mensaje(texto, esCorrecto) {
    $('#mensaje-pedido')
      .text(texto)
      .attr('class', esCorrecto ? 'aviso' : 'aviso aviso-error')
      .prop('hidden', false);
  }

  // 4. EVENTOS ---------------------------------------------------------------------
  // Botones + y −  (delegación: funcionan aunque los creemos con jQuery)
  $lista.on('click', '[data-paso]', function () {
    var id = $(this).closest('.fila-plato').data('id');
    var nueva = (carrito[id] || 0) + Number($(this).data('paso'));
    carrito[id] = Math.max(0, Math.min(20, nueva));      // entre 0 y 20
    pintar();
  });

  // Recoger en tienda / Entrega a domicilio
  $('[data-modo]').on('click', function () {
    modo = $(this).data('modo');
    pintar();
  });

  // Confirmar pedido
  $form.on('submit', function (evento) {
    evento.preventDefault();                              // no recargar la página
    if (pintar() === 0) { mensaje('Añade algún plato para continuar.', false); return; }
    if (!this.reportValidity()) { return; }               // avisa de los campos "required" vacíos
    carrito = {};
    this.reset();
    pintar();
    mensaje('Pedido recibido (prototipo). ¡Gracias!', true);
  });

  // Filtros por categoría
  DIW.activarFiltros('#filtros-pedido', '#lista-pedido .fila-plato');

  pintar();   // primer dibujo al cargar la página
});