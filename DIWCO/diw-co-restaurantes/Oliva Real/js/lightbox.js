// ============================================================
// lightbox.js - Lightbox (Galería)
// ============================================================
$(document).ready(function () {
  let indiceActual = 0;
  const $imagenesGaleria = $(".foto-galeria");

  function mostrarImagenModal(indice) {
    if (indice < 0) indice = $imagenesGaleria.length - 1;
    if (indice >= $imagenesGaleria.length) indice = 0;
    indiceActual = indice;

    const src = $imagenesGaleria.eq(indiceActual).attr("src");
    $("#lightbox-img").attr("src", src);
    $("#lightbox-overlay").css("display", "flex").hide().fadeIn(150);
  }

  $imagenesGaleria.on("click", function () {
    mostrarImagenModal($imagenesGaleria.index(this));
  });

  $("#lightbox-prev").on("click", function () {
    mostrarImagenModal(indiceActual - 1);
  });

  $("#lightbox-next").on("click", function () {
    mostrarImagenModal(indiceActual + 1);
  });

  $("#lightbox-cerrar, #lightbox-overlay").on("click", function (e) {
    if (e.target === this) {
      $("#lightbox-overlay").fadeOut(150);
    }
  });
});