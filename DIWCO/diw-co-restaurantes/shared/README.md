# Carpeta `shared`: código común a los 5 restaurantes

Esta carpeta contiene todo lo que comparten los cinco sitios. **Un cambio aquí se
aplica a los cinco a la vez.** Cada restaurante solo aporta lo suyo: su color
(`css/theme.css`), sus platos (`js/carta-data.js`), sus imágenes y sus textos.

```
shared/
├── css/
│   ├── base.css            variables, tipografías, cabecera, pie, botones, formularios
│   └── components.css      componentes de cada página (carta, pedido, galería...)
├── js/
│   ├── vendor/             aquí va jQuery (ver LEEME.txt)
│   ├── main.js             TODAS las páginas: funciones de ayuda, menú, cookies, enlace activo
│   ├── carta.js            La carta
│   ├── pedido.js           Pedido online
│   ├── formularios.js      Reservas y Contacto
│   ├── galeria.js          Galería
│   └── legal.js            Sobre nosotros y legal
└── plantilla-pagina.html   página de partida para copiar
```

## 1. Cómo se monta una página

Orden de carga (importa):

```html
<link rel="stylesheet" href="../shared/css/base.css">
<link rel="stylesheet" href="../shared/css/components.css">
<link rel="stylesheet" href="css/theme.css">      <!-- el último: pisa el color de acento -->
...
<script src="../shared/js/vendor/jquery-4.1.0.min.js"></script>
<script src="../shared/js/main.js"></script>
<script src="js/carta-data.js"></script>          <!-- solo La carta y Pedido online -->
<script src="../shared/js/carta.js"></script>     <!-- el script de esa página -->
```

Y en `<body>` siempre: `<body data-sitio="oro-viejo">` (nombre de la carpeta del restaurante).

## 2. Lo que cada restaurante tiene que escribir

**`css/theme.css`** (es todo el CSS propio del restaurante):

```css
:root {
  --acento: #8A6A2F;                       /* color de acento del restaurante */
  --acento-texto: #FFFFFF;                 /* color del texto sobre el acento */
  --imagen-inicio: url('../img/inicio.jpg'); /* foto del panel izquierdo de Inicio */
}
```

**`js/carta-data.js`** (los platos; lo leen la carta y el pedido):

```js
var CARTA = [
  { id: 'croquetas', categoria: 'Entrantes', nombre: 'Croquetas de jamón',
    descripcion: 'Cremosas por dentro, crujientes por fuera.', precio: 12,
    imagen: 'img/croquetas.jpg' },
  // ...un objeto por plato
];
```

Reglas: `id` sin espacios ni tildes y único; `categoria` solo `Entrantes`, `Principales`,
`Postres` o `Bebidas` (tienen que coincidir con los botones de filtro); `precio` es un número
(usa punto: `4.5`).

## 3. Lo que espera cada script en el HTML

Los scripts buscan elementos por su `id`, su clase o su atributo `data-...`. Si los cambias,
el script deja de encontrarlos. Estos son los que necesita cada página:

| Página | Scripts | Elementos imprescindibles |
|---|---|---|
| Todas las interiores | `main.js` | `<body data-sitio>`, menú dentro de `.cabecera nav` |
| Inicio | `main.js` | `.inicio`, `.menu-cerrar`, `.menu-abrir` (con `hidden`), `.aviso-cookies` con botones `data-cookies="aceptar"` y `data-cookies="rechazar"` |
| La carta | `carta-data.js`, `carta.js` | `#filtros-carta` (botones `data-filtro="Entrantes"`...), `#lista-platos` (vacío) |
| Pedido online | `carta-data.js`, `pedido.js` | `<form id="form-pedido" novalidate>`, `#filtros-pedido`, `#lista-pedido`, botones `data-modo="recoger"` / `data-modo="domicilio"`, resumen con `#lineas-pedido #unidades #modo-actual #subtotal #envio #total`, campos con clase `solo-domicilio`, `<select name="hora" required>`, `#mensaje-pedido` |
| Reservas | `formularios.js` | `<form id="form-reserva" class="formulario-demo">`, campos con `name="fecha"`, `hora`, `zona`, `nombre`, `telefono`; contador con botones `data-paso="-1"` / `data-paso="1"` y `<output id="comensales">`; resumen con `#res-fecha #res-hora #res-comensales #res-zona #res-pendiente`; un `.aviso` con `hidden` |
| Contacto | `formularios.js` | `<form class="formulario-demo">` con `required` en los obligatorios y un `.aviso` con `hidden` |
| Galería | `galeria.js` | `#filtros-galeria` (incluye `data-filtro="todo"`), `.galeria` con botones `.foto data-categoria="local"` que contienen un `<img>`, y el bloque `.visor` con `.visor-cerrar`, `.visor-anterior`, `.visor-img`, `.visor-siguiente` (empieza con `hidden`) |
| Sobre nosotros y legal | `legal.js` | `#btn-cookies`, `#panel-cookies` (con `hidden`), `#guardar-cookies`, `#cookies-ok` (con `hidden`) |

Convenciones de estados: un botón seleccionado lleva la clase `activo`; lo que empieza
oculto lleva el atributo `hidden`; los mensajes de confirmación usan la clase `aviso`
(y `aviso-error` si es un error).

## 4. Cómo se conectan las páginas

- En **La carta**, cada botón «Pedir» enlaza a `pedido-online.html?add=ID_DEL_PLATO`.
  `pedido.js` lee ese `?add=` y suma 1 al plato.
- El pedido se guarda en el navegador (`localStorage`) con la clave `diw-pedido-<sitio>`. Como los
  cinco sitios están en el mismo dominio, cada uno guarda el suyo sin mezclarse.
- La elección de cookies (`diw-cookies`) sí es común a los cinco sitios.

## 5. Cómo probar

- Se puede abrir cualquier `.html` con doble clic y funciona.
- Para ver los cambios en cada página, recarga con **Ctrl + F5** (así no usa la copia guardada
  de los CSS y JS).
- Si algo no responde, abre las herramientas del navegador (**F12 → Consola**): los errores de
  JavaScript aparecen ahí con el nombre del archivo y la línea.
