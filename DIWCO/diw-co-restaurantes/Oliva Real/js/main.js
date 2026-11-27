// ============================================================
// main.js - Oliva Real (DIW&CO)
// JavaScript de interactividad del sitio web.
// Requiere jQuery.
// ============================================================

// Cuando la página esté lista, ejecutamos todo el código
$(document).ready(function () {

  // ----------------------------------------------------------
  // 1. BANNER DE COOKIES
  // ----------------------------------------------------------

  // Si el usuario ya aceptó las cookies, ocultamos el banner
  if (localStorage.getItem("cookies_diwco") === "aceptadas") {
    $("#banner-cookies").hide();
  }

  // Al pulsar "Aceptar" o "Rechazar": guardamos la decisión y ocultamos el banner
  $("#btn-aceptar-cookies, #btn-rechazar-cookies").on("click", function () {
    localStorage.setItem("cookies_diwco", "aceptadas");
    $("#banner-cookies").fadeOut();
  });

  // ----------------------------------------------------------
  // 2. FILTROS (La Carta y Galería)
  // ----------------------------------------------------------

  // Al click en un botón de filtro
  $(".btn-filtro").on("click", function () {
    const categoria = $(this).data("filtro"); // leemos qué filtro se ha pulsado
    $(".btn-filtro").removeClass("activo");   // quitamos "activo" a todos
    $(this).addClass("activo");               // se lo ponemos al pulsado

    if (categoria === "todo") {
      $(".item-filtrable").fadeIn(200);       // mostramos todo
    } else {
      $(".item-filtrable").hide();            // ocultamos todo
      $('.item-filtrable[data-categoria="' + categoria + '"]').fadeIn(200); // mostramos solo la categoría
    }
  });

  // ----------------------------------------------------------
  // 3. LIGHTBOX (Galería)
  // ----------------------------------------------------------

  let indiceActual = 0;                       // índice de la imagen abierta
  const $imagenesGaleria = $(".foto-galeria"); // todas las imágenes de la galería

  // Función: muestra la imagen del lightbox según el índice
  function mostrarImagenModal(indice) {
    if (indice < 0) indice = $imagenesGaleria.length - 1; // vuelta al final
    if (indice >= $imagenesGaleria.length) indice = 0;    // vuelta al principio
    indiceActual = indice;

    const src = $imagenesGaleria.eq(indiceActual).attr("src"); // src de la imagen
    $("#lightbox-img").attr("src", src);                       // la ponemos en el lightbox
    $("#lightbox-overlay").css("display", "flex").hide().fadeIn(150); // abrimos modal
  }

  // Click en una imagen de la galería -> abre lightbox en esa imagen
  $imagenesGaleria.on("click", function () {
    mostrarImagenModal($imagenesGaleria.index(this));
  });

  // Botón "anterior"
  $("#lightbox-prev").on("click", function () {
    mostrarImagenModal(indiceActual - 1);
  });

  // Botón "siguiente"
  $("#lightbox-next").on("click", function () {
    mostrarImagenModal(indiceActual + 1);
  });

  // Click en cerrar (X) o en el fondo oscuro -> cierra lightbox
  $("#lightbox-cerrar, #lightbox-overlay").on("click", function (e) {
    if (e.target === this) { // solo si clicas en el fondo, no en la imagen
      $("#lightbox-overlay").fadeOut(150);
    }
  });

  // ----------------------------------------------------------
  // 4. PEDIDO ONLINE (carrito)
  // ----------------------------------------------------------

  let envio = 3.5; // coste envío por defecto (domicilio)

  // Recalcula subtotal, envío y total y actualiza la pantalla
  function recalcularPedido() {
    let subtotal = 0;
    let htmlResumen = "";

    // Recorremos cada fila de plato
    $(".fila-pedido").each(function () {
      const nombre = $(this).data("nombre");
      const precio = parseFloat($(this).data("precio"));
      const cantidad = parseInt($(this).find(".valor-cant").text(), 10);

      if (cantidad > 0) {
        const totalLinea = precio * cantidad;
        subtotal += totalLinea;
        // Añadimos línea al resumen HTML
        htmlResumen +=
          '<p class="resumen-linea">' +
          "<span>" + cantidad + "x " + nombre + "</span>" +
          "<strong>" + totalLinea.toFixed(2).replace(".", ",") + " €</strong></p>";
      }
    });

    // Si no hay platos, mensaje vacío
    if (htmlResumen === "") {
      htmlResumen = '<p class="resumen-vacio">No has seleccionado ningún plato todavía.</p>';
    }

    const totalFinal = subtotal > 0 ? subtotal + envio : 0;

    // Actualizamos el DOM con los nuevos valores
    $("#lista-resumen-pedido").html(htmlResumen);
    $("#subtotal-pedido").text(subtotal.toFixed(2).replace(".", ",") + " €");
    $("#envio-pedido").text((subtotal > 0 ? envio : 0).toFixed(2).replace(".", ",") + " €");
    $("#total-pedido").text(totalFinal.toFixed(2).replace(".", ",") + " €");
  }

  // Si venimos de la carta con ?plato=XXX, ponemos ese plato a cantidad 1
  const params = new URLSearchParams(window.location.search);
  const platoInicial = params.get("plato");
  if (platoInicial) {
    $('.fila-pedido[data-id="' + platoInicial + '"] .valor-cant').text("1");
  }
  // Cálculo inicial al cargar
  if ($(".fila-pedido").length) recalcularPedido();

  // Botón "+" -> sube cantidad y recalcula
  $(".btn-mas").on("click", function () {
    const $span = $(this).siblings(".valor-cant");
    $span.text(parseInt($span.text(), 10) + 1);
    recalcularPedido();
  });

  // Botón "-" -> baja cantidad (mínimo 0) y recalcula
  $(".btn-menos").on("click", function () {
    const $span = $(this).siblings(".valor-cant");
    const actual = parseInt($span.text(), 10);
    if (actual > 0) {
      $span.text(actual - 1);
      recalcularPedido();
    }
  });

  // Cambio modalidad: Recoger / Domicilio
  $(".btn-modalidad").on("click", function () {
    // Cambiamos estilos visuales de los botones
    $(".btn-modalidad").removeClass("btn-primario").addClass("btn-secundario");
    $(this).removeClass("btn-secundario").addClass("btn-primario");

    if ($(this).data("modo") === "recoger") {
      envio = 0;                                // envío gratis
      $("#campos-domicilio").addClass("hidden"); // ocultamos dirección/teléfono
      $("#campos-domicilio input").prop("required", false);
    } else {
      envio = 3.5;                               // coste envío
      $("#campos-domicilio").removeClass("hidden"); // mostramos dirección/teléfono
      $("#campos-domicilio input").prop("required", true);
    }
    recalcularPedido();
  });

  // ----------------------------------------------------------
  // 5. RESERVAS (resumen dinámico)
  // ----------------------------------------------------------

  // Botón "+" comensales
  $("#res-mas").on("click", function () {
    const actual = parseInt($("#res-comensales").text(), 10);
    const nuevo = actual + 1;
    $("#res-comensales").text(nuevo);
    $("input[name='comensales']").val(nuevo);
    $("#sum-comensales").text(nuevo + " personas");
  });

  // Botón "-" comensales (mínimo 1)
  $("#res-menos").on("click", function () {
    const actual = parseInt($("#res-comensales").text(), 10);
    if (actual > 1) {
      const nuevo = actual - 1;
      $("#res-comensales").text(nuevo);
      $("input[name='comensales']").val(nuevo);
      $("#sum-comensales").text(nuevo + " personas");
    }
  });

  // Cambio fecha -> actualiza resumen
  $("#res-fecha").on("change", function () {
    $("#sum-fecha").text($(this).val() || "Por seleccionar");
  });

  // Cambio hora -> actualiza resumen
  $("#res-hora").on("change", function () {
    $("#sum-hora").text($(this).val() || "Por seleccionar");
  });

  // Cambio zona (radio) -> actualiza resumen
  $('input[name="zona"]').on("change", function () {
    $("#sum-zona").text($(this).val());
  });

  // ----------------------------------------------------------
  // 6. ENVÍO FORMULARIOS (evita recarga, muestra aviso)
  // ----------------------------------------------------------

  $("form").on("submit", function (e) {
    e.preventDefault(); // evitamos envío real
    alert("Solicitud enviada correctamente. ¡Gracias por confiar en DIW&CO Restaurantes!");
    this.reset(); // limpiamos el formulario

    // Reseteamos contadores visuales
    $(".valor-cant").text("0");
    $("#res-comensales").text("2");
    $("#sum-comensales").text("2 personas");
    $("input[name='comensales']").val("2");
    $("#sum-fecha").text("Por seleccionar");
    $("#sum-hora").text("Por seleccionar");
    $("#sum-zona").text("Interior");
    $('input[name="zona"][value="Interior"]').prop("checked", true);

    // Si estamos en pedido online, recalculamos a cero
    if ($("#lista-resumen-pedido").length) {
      recalcularPedido();
    }
  });

});
