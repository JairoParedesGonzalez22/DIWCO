// ============================================================
// cookies.js - Banner de cookies
// ============================================================
$(document).ready(function () {
  // Si el usuario ya aceptó las cookies, ocultamos el banner
  if (localStorage.getItem("cookies_diwco") === "aceptadas") {
    $("#banner-cookies").hide();
  }

  // Al pulsar "Aceptar" o "Rechazar": guardamos la decisión y ocultamos el banner
  $("#btn-aceptar-cookies, #btn-rechazar-cookies").on("click", function () {
    localStorage.setItem("cookies_diwco", "aceptadas");
    $("#banner-cookies").fadeOut();
  });
});