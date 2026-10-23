# 📄 Guía para el PDF de Evidencias de Cumplimiento

El PDF debe demostrar **cada especificación** solicitada. Cada evidencia ocupa
**una página** y contiene: **Título**, **Captura de la interfaz** (una por página),
**Captura del código fuente** (una por página) y **Explicación breve** (máximo dos
párrafos).

> 💡 **Sugerencia de orden:** haz funcionar la app primero, toma las capturas de
> interfaz, luego las capturas de código (abre los archivos en VS Code con
> resaltado de sintaxis). Arma el PDF en Google Docs / Word / Canva y exporta a PDF.

---

## Páginas sugeridas (una especificación por página)

### 1. Portada
- Título del proyecto, nombre, materia, fecha.

### 2. Consumo de API usando `fetch()`
- **Título:** Consumo de API usando `fetch()`
- **Captura de interfaz:** la cuadrícula de países cargada (se ve que los datos llegaron).
- **Captura de código:** archivo `js/services/api.js` (las funciones con `fetch`).
- **Explicación:** se usa `fetch()` de forma asíncrona dentro de `async/await`. Se
  intenta la API v5 de REST Countries y, como la llave demo sólo devuelve un país,
  se usa un respaldo local `data/countries.json` también obtenido con `fetch()`.

### 3. Primera llamada en `onMounted()`
- **Título:** Carga de datos al montar el componente con `onMounted()`
- **Captura de interfaz:** el indicador "Cargando países..." (recarga la página y
  captura rápido, o simula ralentizando la red en DevTools → Network → Slow 3G).
- **Captura de código:** `js/app.js` donde dice `onMounted(() => { cargarPaises(); })`.
- **Explicación:** la primera petición a la API se dispara automáticamente cuando el
  componente se monta en el DOM, sin intervención del usuario.

### 4. Estado reactivo con `ref()`
- **Título:** Variables reactivas con `ref()`
- **Captura de interfaz:** cualquier vista de la app funcionando.
- **Captura de código:** `js/app.js` bloque `setup()` con los `ref(...)`.
- **Explicación:** los datos de países, el estado de carga, el error y los filtros
  son variables reactivas: al cambiar su valor, la interfaz se actualiza sola.

### 5. Uso de `v-for`
- **Título:** Listado dinámico de países con `v-for`
- **Captura de interfaz:** la cuadrícula con varias tarjetas de países.
- **Captura de código:** `js/app.js` template: `<CountryCard v-for="pais in paisesFiltrados" :key="...">`.
- **Explicación:** `v-for` recorre el arreglo de países y renderiza una tarjeta por
  cada uno, mostrando bandera, nombre, capital, región y población.

### 6. Uso de `v-if` (estados de la app)
- **Título:** Estados de la aplicación con `v-if` (carga, error, sin resultados)
- **Captura de interfaz:** busca un texto que no exista (ej. "xyz123") y captura el
  mensaje "No se encontraron países...". (También puedes capturar el loading.)
- **Captura de código:** `js/app.js` template con `v-if="cargando"`, `v-else-if="error"`,
  `v-else-if="paisesFiltrados.length === 0"`.
- **Explicación:** `v-if` muestra u oculta elementos según el estado: indicador de
  carga mientras llegan los datos, mensaje de error si la API falla, y aviso si no
  hay resultados tras filtrar.

### 7. Uso de `v-model` (filtro de búsqueda)
- **Título:** Filtrado de información con `v-model`
- **Captura de interfaz:** escribe "mex" en el buscador y captura cómo se filtra en
  tiempo real (solo aparece México, o los que coinciden).
- **Captura de código:** `js/components/SearchBar.js` (input con `v-model`) y
  `js/app.js` (`<SearchBar v-model="busqueda" v-model:region="regionSeleccionada">`).
- **Explicación:** `v-model` crea un enlace bidireccional: lo que escribe el usuario
  actualiza la variable reactiva y, mediante un `computed`, se filtra la lista al
  instante. También se filtra por región con el selector.

### 8. Manejo de errores con `try/catch` (opcional)
- **Título:** Manejo de errores con `try/catch`
- **Captura de interfaz:** si quieres forzar el error, desconéctate de internet y
  recarga (aparece el mensaje de error). O muestra el código solamente.
- **Captura de código:** bloques `try/catch` en `api.js` y `app.js`.
- **Explicación:** si la petición falla, se captura el error y se muestra un mensaje
  amigable en lugar de romper la aplicación.

### 9. Repositorio y publicación
- **Título:** Repositorio en GitHub y publicación en GitHub Pages
- **Captura de interfaz:** captura del repositorio en GitHub y otra del sitio publicado.
- **Captura de código:** no aplica; muestra los commits realizados.
- **Explicación:** el código se versionó con Git (varios commits) y se publicó en
  GitHub Pages desde la rama `main`.

---

## ✅ Checklist final antes de entregar

- [ ] Link del repositorio GitHub con el código fuente Vue.
- [ ] Link del sitio publicado en GitHub Pages.
- [ ] Uso de `fetch()` para consumir la API.
- [ ] Uso de `onMounted()` para obtener los datos.
- [ ] Uso de `v-for`.
- [ ] Uso de `v-if` para mostrar estados de la aplicación.
- [ ] Uso de `v-model` para filtrar información.
- [ ] Indicador de carga mientras se obtienen datos.
- [ ] PDF de evidencias (una captura por página, título + explicación).
