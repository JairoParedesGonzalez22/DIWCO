// ============================================================
// carrusel.js - Carrusel principal galería (no automático)
// ============================================================
$(document).ready(function () {
  let imagenesFiltradas = [];
  let indiceActual = 0;
  const $carruselImg = $("#carrusel-img");
  const $carruselPrev = $("#carrusel-prev");
  const $carruselNext = $("#carrusel-next");
  const $contador = $("#carrusel-contador");
  const $carruselFigura = $(".carrusel-figura");

  function actualizarCarrusel() {
    if (imagenesFiltradas.length === 0) {
      // Mostrar mensaje en lugar de imagen
      $carruselFigura.addClass("vacio");
      $carruselImg.hide();
      $contador.text("0 / 0");
      $carruselPrev.add($carruselNext).prop("disabled", true);
      return;
    }
    // Hay imágenes: mostrar imagen, ocultar mensaje
    $carruselFigura.removeClass("vacio");
    $carruselImg.show();
    $carruselPrev.add($carruselNext).prop("disabled", false);
    const src = imagenesFiltradas[indiceActual];
    $carruselImg.attr("src", src).attr("alt", "Imagen " + (indiceActual + 1));
    $contador.text((indiceActual + 1) + " / " + imagenesFiltradas.length);
  }

  function filtrarCategoria(cat) {
    const $items = $(".item-filtrable");
    imagenesFiltradas = [];
    $items.each(function () {
      const $img = $(this).find(".foto-galeria");
      if (cat === "todo" || $(this).data("categoria") === cat) {
        imagenesFiltradas.push($img.attr("src"));
      }
    });
    indiceActual = 0;
    actualizarCarrusel();
  }

  // Inicial: categoría "todo"
  filtrarCategoria("todo");

  // Botones filtro
  $(".btn-filtro").on("click", function () {
    const cat = $(this).data("filtro");
    $(".btn-filtro").removeClass("activo");
    $(this).addClass("activo");
    filtrarCategoria(cat);
  });

  // Flechas carrusel
  $carruselPrev.on("click", function () {
    if (imagenesFiltradas.length === 0) return;
    indiceActual = (indiceActual - 1 + imagenesFiltradas.length) % imagenesFiltradas.length;
    actualizarCarrusel();
  });

  $carruselNext.on("click", function () {
    if (imagenesFiltradas.length === 0) return;
    indiceActual = (indiceActual + 1) % imagenesFiltradas.length;
    actualizarCarrusel();
  });

  // Teclado (← →)
  $(document).on("keydown", function (e) {
    if (e.key === "ArrowLeft") $carruselPrev.click();
    if (e.key === "ArrowRight") $carruselNext.click();
  });

  // Click en imagen → abre lightbox (usa lightbox.js existente)
  $carruselImg.on("click", function () {
    if (imagenesFiltradas.length > 0) {
      const srcActual = imagenesFiltradas[indiceActual];
      const $target = $(".foto-galeria[src='" + srcActual + "']").first();
      if ($target.length) $target.click();
    }
  });
});