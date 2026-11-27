/* =====================================================================
   main.js  ·  SE CARGA EN TODAS LAS PÁGINAS (después de jQuery)
   ---------------------------------------------------------------------
   1. Crea el objeto DIW con funciones de ayuda que usan los demás scripts.
   2. Marca el enlace de la página actual en el menú.
   3. Controla el menú lateral y el aviso de cookies de la página de Inicio.
   ===================================================================== */

// "DIW" agrupa nuestras funciones para no ensuciar el espacio global.
window.DIW = window.DIW || {};

// Nombre del sitio, tomado de <body data-sitio="oro-viejo">.
// Los 5 sitios están en el mismo dominio, así que lo usamos para que
// cada restaurante guarde SU pedido sin mezclarlo con los demás.
DIW.sitio = $('body').data('sitio') || 'sitio';

// Formatea un número como euros: 12 → "12,00 €"
DIW.euros = function (numero) {
  return numero.toFixed(2).replace('.', ',') + ' €';
};

// Guardar y leer datos en el navegador (localStorage) con try/catch
// por si el navegador lo bloquea.
DIW.guardar = function (clave, valor) {
  try { localStorage.setItem(clave, JSON.stringify(valor)); } catch (e) {}
};
DIW.leer = function (clave, porDefecto) {
  try {
    var guardado = localStorage.getItem(clave);
    return guardado === null ? porDefecto : JSON.parse(guardado);
  } catch (e) { return porDefecto; }
};

// FILTROS: sirve para la carta, el pedido y la galería.
//   selectorFiltros → contenedor con los botones (cada uno con data-filtro="...")
//   selectorItems   → elementos a filtrar (cada uno con data-categoria="...")
// Pulsar un botón muestra solo esa categoría; pulsarlo otra vez la quita.
// Un botón con data-filtro="todo" (galería) muestra todo.
DIW.activarFiltros = function (selectorFiltros, selectorItems) {
  var $filtros = $(selectorFiltros);

  $filtros.on('click', 'button', function () {
    var $boton = $(this);
    var valor = $boton.data('filtro');
    var estabaActivo = $boton.hasClass('activo');

    // Desmarca todos los botones del grupo
    $filtros.find('button').removeClass('activo').attr('aria-pressed', 'false');

    if (estabaActivo && valor !== 'todo') {
      valor = 'todo';                                   // segundo clic: quitar filtro
      $filtros.find('[data-filtro="todo"]').addClass('activo').attr('aria-pressed', 'true');
    } else {
      $boton.addClass('activo').attr('aria-pressed', 'true');
    }

    // Muestra u oculta cada elemento según su categoría
    $(selectorItems).each(function () {
      var coincide = (valor === 'todo' || $(this).data('categoria') === valor);
      $(this).prop('hidden', !coincide);
    });
  });
};

// Todo lo siguiente se ejecuta cuando la página ha terminado de cargar.
$(function () {

  // 1. ENLACE ACTIVO: compara el nombre del archivo actual con cada enlace.
  var archivo = location.pathname.split('/').pop() || 'index.html';
  $('.cabecera nav a, .menu-lateral a').each(function () {
    if ($(this).attr('href') === archivo) {
      $(this).attr('aria-current', 'page');
    }
  });

  // 2. MENÚ LATERAL DE INICIO: el botón × lo cierra y "Menú" lo vuelve a abrir.
  var $inicio = $('.inicio');
  $('.menu-cerrar').on('click', function () {
    $inicio.addClass('sin-menu');
    $('.menu-abrir').prop('hidden', false);
  });
  $('.menu-abrir').on('click', function () {
    $inicio.removeClass('sin-menu');
    $(this).prop('hidden', true);
  });

  // 3. AVISO DE COOKIES: si ya se eligió algo, no se vuelve a mostrar.
  //    La elección es común a los 5 sitios (mismo dominio).
  var $aviso = $('.aviso-cookies');
  if (DIW.leer('diw-cookies', null)) { $aviso.prop('hidden', true); }
  $aviso.on('click', '[data-cookies]', function () {
    DIW.guardar('diw-cookies', $(this).data('cookies'));   // "aceptar" o "rechazar"
    $aviso.prop('hidden', true);
  });
});