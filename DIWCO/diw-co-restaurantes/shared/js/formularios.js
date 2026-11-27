/* =====================================================================
   formularios.js  ·  PÁGINAS "RESERVAS" Y "CONTACTO Y UBICACIÓN"
   ---------------------------------------------------------------------
   - Reservas: el resumen se rellena en directo y el contador de
     comensales sube y baja con + y −.
   - Reservas y contacto: al enviar, el navegador valida los campos
     "required" y, si todo va bien, mostramos un mensaje de confirmación.
   Orden de scripts:  jQuery → main.js → formularios.js
   ===================================================================== */
$(function () {

  // 1. RESERVAS: RESUMEN EN DIRECTO ---------------------------------------------------
  var $reserva = $('#form-reserva');
  if ($reserva.length) {
    var comensales = 2;

    // Convierte "2026-12-24" en "24/12/2026"
    function formatoFecha(valor) {
      return valor ? valor.split('-').reverse().join('/') : 'Por seleccionar';
    }

    function actualizarResumen() {
      var f = $reserva[0].elements;   // acceso a los campos por su atributo name
      $('#comensales').text(comensales);
      $('#res-fecha').text(formatoFecha(f.fecha.value));
      $('#res-hora').text(f.hora.value || 'Por seleccionar');
      $('#res-comensales').text(comensales + (comensales === 1 ? ' persona' : ' personas'));
      $('#res-zona').text(f.zona.value);
      // El aviso "pendiente" desaparece cuando todo está relleno
      var completo = f.fecha.value && f.hora.value && f.nombre.value && f.telefono.value;
      $('#res-pendiente').prop('hidden', Boolean(completo));
    }

    // Botones − y + de comensales (entre 1 y 12)
    $reserva.on('click', '[data-paso]', function () {
      comensales = Math.max(1, Math.min(12, comensales + Number($(this).data('paso'))));
      actualizarResumen();
    });
    // Cualquier cambio en el formulario actualiza el resumen
    $reserva.on('input change', actualizarResumen);
    actualizarResumen();
  }

  // 2. ENVÍO DE FORMULARIOS DE DEMOSTRACIÓN (reservas y contacto) ---------------------
  // Es un prototipo: no se envía nada a ningún servidor.
  $('.formulario-demo').on('submit', function (evento) {
    evento.preventDefault();                       // el navegador ya validó los "required"
    $(this).find('.aviso').prop('hidden', false);  // mostramos el mensaje de confirmación
  });
});