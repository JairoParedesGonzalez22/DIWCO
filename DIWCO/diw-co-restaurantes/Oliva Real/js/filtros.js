// ============================================================
// filtros.js - Filtros (La Carta y Galería)
// ============================================================
$(document).ready(function () {
  // Al click en un botón de filtro
  $(".btn-filtro").on("click", function () {
    const categoria = $(this).data("filtro");
    $(".btn-filtro").removeClass("activo");
    $(this).addClass("activo");

    if (categoria === "todo") {
      $(".item-filtrable").fadeIn(200);
    } else {
      $(".item-filtrable").hide();
      $('.item-filtrable[data-categoria="' + categoria + '"]').fadeIn(200);
    }
  });
});