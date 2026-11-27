// ============================================================
// pedido.js - Pedido Online (carrito)
// ============================================================
$(document).ready(function () {
  let envio = 3.5;

  function recalcularPedido() {
    let subtotal = 0;
    let htmlResumen = "";

    $(".fila-pedido").each(function () {
      const nombre = $(this).data("nombre");
      const precio = parseFloat($(this).data("precio"));
      const cantidad = parseInt($(this).find(".valor-cant").text(), 10);

      if (cantidad > 0) {
        const totalLinea = precio * cantidad;
        subtotal += totalLinea;
        htmlResumen +=
          '<p class="resumen-linea">' +
          "<span>" + cantidad + "x " + nombre + "</span>" +
          "<strong>" + totalLinea.toFixed(2).replace(".", ",") + " €</strong></p>";
      }
    });

    if (htmlResumen === "") {
      htmlResumen = '<p class="resumen-vacio">No has seleccionado ningún plato todavía.</p>';
    }

    const totalFinal = subtotal > 0 ? subtotal + envio : 0;

    $("#lista-resumen-pedido").html(htmlResumen);
    $("#subtotal-pedido").text(subtotal.toFixed(2).replace(".", ",") + " €");
    $("#envio-pedido").text((subtotal > 0 ? envio : 0).toFixed(2).replace(".", ",") + " €");
    $("#total-pedido").text(totalFinal.toFixed(2).replace(".", ",") + " €");
  }

  const params = new URLSearchParams(window.location.search);
  const platoInicial = params.get("plato");
  if (platoInicial) {
    $('.fila-pedido[data-id="' + platoInicial + '"] .valor-cant').text("1");
  }
  if ($(".fila-pedido").length) recalcularPedido();

  $(".btn-mas").on("click", function () {
    const $span = $(this).siblings(".valor-cant");
    $span.text(parseInt($span.text(), 10) + 1);
    recalcularPedido();
  });

  $(".btn-menos").on("click", function () {
    const $span = $(this).siblings(".valor-cant");
    const actual = parseInt($span.text(), 10);
    if (actual > 0) {
      $span.text(actual - 1);
      recalcularPedido();
    }
  });

  $(".btn-modalidad").on("click", function () {
    $(".btn-modalidad").removeClass("btn-primario").addClass("btn-secundario");
    $(this).removeClass("btn-secundario").addClass("btn-primario");

    if ($(this).data("modo") === "recoger") {
      envio = 0;
      $("#campos-domicilio").addClass("hidden");
      $("#campos-domicilio input").prop("required", false);
    } else {
      envio = 3.5;
      $("#campos-domicilio").removeClass("hidden");
      $("#campos-domicilio input").prop("required", true);
    }
    recalcularPedido();
  });

  // Exponer para que formularios.js pueda resetear
  window.recalcularPedido = recalcularPedido;
});