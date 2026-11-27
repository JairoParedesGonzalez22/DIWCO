# DIW&CO Restaurantes

Reto 1 de **Diseño de Interfaces Web** · 2.º DAW · CIFP La Laboral · curso 2026/2027

Proyecto web de una cadena de restauración formado por **5 sitios web** con la misma estructura (pseudoplantilla) y distinto contenido, color y logo. Cada sitio tiene **8 páginas**, hechas en **HTML5 + CSS3 + jQuery**, sin frameworks ni plantillas.

## Equipo: Los del fondo

- Jairo Paredes
- Alejandro Alonso
- Joel Fernández
- Germán González
- Jose Miguel Rubio

## Los 5 restaurantes

| Carpeta | Restaurante | Cocina | Color de acento |
|---|---|---|---|
| `noble-brasa/` | Noble Brasa | Carnes y parrillas | `#6B1E2E` |
| `marea-alta/` | Marea Alta | Pescados y mariscos | `#14284B` |
| `oliva-real/` | Oliva Real | Mediterránea y arroces | `#0B4F3F` |
| `sumi/` | Sumi | Japonesa | `#4A2545` |
| `oro-viejo/` | Oro Viejo | Tradicional de autor | `#8A6A2F` |

## Páginas de cada sitio

`index.html` (Inicio) · `la-carta.html` · `pedido-online.html` · `reservas.html` · `nuestros-restaurantes.html` · `contacto-y-ubicacion.html` · `galeria.html` · `sobre-nosotros-y-legal.html`

## Estructura

```
diw-co-restaurantes/
├── README.md
├── shared/                  ← lo común a los 5 sitios
│   ├── css/                 base.css y components.css
│   ├── js/                  main.js, carta.js, pedido.js, formularios.js,
│   │                        galeria.js, legal.js y vendor/ (jQuery)
│   ├── img/iconos/          iconos SVG
│   ├── plantilla-pagina.html
│   └── README.md            explicación detallada del código común
├── noble-brasa/
├── marea-alta/
├── oliva-real/
├── sumi/
└── oro-viejo/               ← cada restaurante tiene:
    ├── *.html (8 páginas)
    ├── css/theme.css        color de acento e imagen de inicio
    ├── js/carta-data.js     platos y precios
    └── img/                 logo, inicio y fotos
```

Cada restaurante solo cambia `theme.css`, `carta-data.js`, sus imágenes y los textos. El resto del código es común.

## Cómo funciona

- **Orden de estilos:** `base.css` → `components.css` → `theme.css` (el último sobrescribe el color de acento).
- **Orden de scripts:** jQuery → `main.js` → `carta-data.js` (si la página lo usa) → script de la página.
- **Cabecera y pie:** escritos como HTML en cada página, no inyectados con JavaScript.
- **Iconos:** SVG pintados con el color del restaurante mediante CSS `mask`.
- **Pedido:** se guarda en `localStorage` por restaurante (`diw-pedido-<sitio>`). El botón «Pedir» de la carta abre `pedido-online.html?add=<id>`.
- **Funcionalidades jQuery:** filtros de carta y galería, selector de cantidades, cálculo del pedido con envío, resumen de reserva en directo, visor de galería, aviso y configuración de cookies, validación de formularios.

Más detalle en [`shared/README.md`](shared/README.md).

## Cómo probarlo

1. Descarga jQuery y guárdalo como `shared/js/vendor/jquery-4.1.0.min.js` (ver `shared/js/vendor/LEEME.txt`).
2. Abre la carpeta del proyecto con un servidor local, por ejemplo **Live Server** de VS Code, y entra en `oro-viejo/index.html`. Hace falta servidor, porque con doble clic (`file://`) los navegadores bloquean los iconos.
3. Para añadir un restaurante nuevo, copia `oro-viejo/`, cambia `theme.css`, `carta-data.js`, el `data-sitio` de cada página, el logo y los textos.

## Reglas del equipo

- No se toca `shared/` sin avisar al resto: afecta a los cinco sitios.
- Nombres de archivo en minúsculas, sin espacios ni tildes (GitHub Pages distingue mayúsculas).
- Imágenes propias o libres de derechos, siempre con `alt`, en JPG de unos 800 px y menos de 150 KB.
- Cada miembro trabaja en la carpeta de su restaurante.

## Estado

| Restaurante | Responsable | Estado |
|---|---|---|
| Oro Viejo | Jairo | Completado |
| Noble Brasa | Jose Miguel | Completado |
| Marea Alta | Joel | Completado |
| Oliva Real | Alex | Pendiente |
| Sumi | German | Pendiente |

## Documentación

La memoria del reto está en el documento `DIWCO_LOS_DEL_FONDO.pdf`: definición, guía de estilo, sketching y wireframing, CMS (WordPress y Wix), implementación en código y presupuesto.
