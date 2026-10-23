# Explorador de Países — Vue 3 + fetch()

Proyecto de la materia **Programación Web** (Unidad 3) del Tecnológico Nacional de México.
Aplicación web construida con **Vue 3** que consume datos de países mediante **fetch()**
y demuestra el uso de `onMounted()`, `ref()`, `computed()`, `v-for`, `v-if` y `v-model`.

> 📌 **Nota importante sobre la API:** La API REST Countries v3.1 (gratuita) fue
> **descontinuada** en 2025 y la nueva v5 requiere una llave de pago. La llave de
> demostración `rc_live_demo` sólo devuelve un país de ejemplo. Por eso este proyecto
> implementa una **estrategia de respaldo**: intenta la API v5 en vivo y, si falla o
> devuelve datos de demostración, consume un archivo local `data/countries.json`
> (229 países) **también mediante `fetch()`**. El requisito de usar `fetch()` +
> `try/catch` se cumple en ambos caminos. La app siempre funciona en GitHub Pages.

---

## Requisitos del proyecto y dónde se cumplen

| Requisito | ¿Dónde se cumple? |
|---|---|
| Uso de `fetch()` para consumir la API | `js/services/api.js` (funciones `obtenerDesdeApiViva`, `obtenerDesdeDatosLocales`, `fetchPaises`) |
| Primer llamada dentro de `onMounted()` | `js/app.js` → `onMounted(() => cargarPaises())` |
| Datos en variable reactiva `ref()` | `js/app.js` → `paises`, `cargando`, `error`, `busqueda`, `regionSeleccionada` |
| Uso de `v-for` (lista de países) | `js/app.js` template → `<CountryCard v-for="pais in paisesFiltrados">` |
| Uso de `v-if` (estados de carga / error / sin resultados) | `js/app.js` template → `v-if="cargando"`, `v-else-if="error"`, `v-else-if="paisesFiltrados.length === 0"` |
| Uso de `v-model` para filtrar | `js/components/SearchBar.js` (input y select) + `js/app.js` (`v-model="busqueda"`, `v-model:region`) |
| Indicador de carga "Cargando países..." | `js/components/LoadingSpinner.js` |
| Manejo de errores `try/catch` | `js/services/api.js` y `js/app.js` (`cargarPaises`) |
| Muestra: bandera, nombre, capital, región, población | `js/components/CountryCard.js` |
| Filtro por nombre y por región | `js/app.js` → `paisesFiltrados` (computed) |

---

## Estructura de carpetas

```
explorador-paises-vue3/
├── index.html                  # Punto de entrada (montaje de Vue + import map)
├── README.md                   # Este archivo
├── .gitignore
├── css/
│   └── styles.css              # Estilos responsive
├── js/
│   ├── app.js                  # Componente raíz: estado, onMounted, computed, template
│   ├── services/
│   │   └── api.js              # Lógica de fetch() + try/catch + fallback
│   └── components/
│       ├── SearchBar.js        # Búsqueda con v-model (nombre + región)
│       ├── CountryCard.js      # Tarjeta de un país (se usa con v-for)
│       ├── LoadingSpinner.js   # Indicador de carga (v-if)
│       └── ErrorMessage.js     # Mensajes de error / sin resultados (v-if)
├── data/
│   └── countries.json          # Respaldo local con 229 países (consumido con fetch)
└── docs/
    └── guia-evidencias-pdf.md  # Guía para armar el PDF de evidencias
```

Vue 3 se carga desde CDN (jsdelivr) mediante **import map**, por lo que **no se necesita
Node.js ni paso de compilación (`build`)**. El proyecto es 100% estático y funciona
directamente en GitHub Pages.

---

## 🧪 Prueba en local

Como se usan módulos ES y `fetch()` de un archivo JSON, no basta con abrir el
`index.html` con doble clic (el navegador bloquea los módulos por CORS). Usa un
servidor local sencillo:

```bash
python3 -m http.server 8000
# Luego abre en el navegador: http://localhost:8000
```

(O usa la extensión "Live Server" de VS Code.)

---

## 🛠️ Tecnologías

- Vue 3 (Composition API, vía CDN)
- fetch() (API nativa del navegador)
- HTML5 + CSS3 (Grid responsive, sin frameworks)
- Datos: REST Countries v5 (intento) + respaldo local
- Banderas: [flagcdn.com](https://flagcdn.com)
