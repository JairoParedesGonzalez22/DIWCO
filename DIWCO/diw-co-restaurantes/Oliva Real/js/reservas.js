// ============================================================
// reservas.js - Reservas (resumen dinámico)
// ============================================================
$(document).ready(function () {
  function textoComensales(n) {
    return n + (n === 1 ? " persona" : " personas");
  }

  $("#res-mas").on("click", function () {
    const actual = parseInt($("#res-comensales").text(), 10);
    const nuevo = actual + 1;
    $("#res-comensales").text(nuevo);
    $("input[name='comensales']").val(nuevo);
    $("#sum-comensales").text(textoComensales(nuevo));
  });

  $("#res-menos").on("click", function () {
    const actual = parseInt($("#res-comensales").text(), 10);
    if (actual > 1) {
      const nuevo = actual - 1;
      $("#res-comensales").text(nuevo);
      $("input[name='comensales']").val(nuevo);
      $("#sum-comensales").text(textoComensales(nuevo));
    }
  });

  $("#res-fecha").on("change", function () {
    $("#sum-fecha").text($(this).val() || "Por seleccionar");
  });

  $("#res-hora").on("change", function () {
    $("#sum-hora").text($(this).val() || "Por seleccionar");
  });

  $('input[name="zona"]').on("change", function () {
    $("#sum-zona").text($(this).val());
  });

  // Exponer para que formularios.js pueda resetear
  window.textoComensales = textoComensales;
});