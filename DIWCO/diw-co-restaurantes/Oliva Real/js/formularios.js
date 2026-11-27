// ============================================================
// formularios.js - Envío formularios (evita recarga, muestra aviso)
// ============================================================
$(document).ready(function () {
  $("form").on("submit", function (e) {
    e.preventDefault();
    alert("Solicitud enviada correctamente. ¡Gracias por confiar en DIW&CO Restaurantes!");
    this.reset();

    $(".valor-cant").text("0");
    $("#res-comensales").text("1");
    if (window.textoComensales) {
      $("#sum-comensales").text(window.textoComensales(1));
    }
    $("input[name='comensales']").val("1");
    $("#sum-fecha").text("Por seleccionar");
    $("#sum-hora").text("Por seleccionar");
    $("#sum-zona").text("Interior");
    $('input[name="zona"][value="Interior"]').prop("checked", true);

    if ($("#lista-resumen-pedido").length && window.recalcularPedido) {
      window.recalcularPedido();
    }
  });
});