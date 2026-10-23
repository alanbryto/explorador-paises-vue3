/**
 * app.js — Componente raíz de la aplicación "Explorador de Países".
 *
 * Demuestra:
 *  - onMounted(): primera llamada a la API al montar el componente.
 *  - ref(): variables reactivas (paises, cargando, error, busqueda...).
 *  - computed(): lista filtrada y lista de regiones.
 *  - fetch(): consumo asíncrono de la API (ver services/api.js).
 *  - v-for: renderizado de la lista/tarjetas de países.
 *  - v-if: estados de carga, error y sin resultados.
 *  - v-model: filtro de búsqueda por nombre y región.
 */
import { createApp, ref, computed, onMounted } from "vue";
import { fetchPaises } from "./services/api.js";
import SearchBar from "./components/SearchBar.js";
import CountryCard from "./components/CountryCard.js";
import LoadingSpinner from "./components/LoadingSpinner.js";
import ErrorMessage from "./components/ErrorMessage.js";

const App = {
  name: "App",
  components: { SearchBar, CountryCard, LoadingSpinner, ErrorMessage },
  setup() {
    // --- Estado reactivo con ref() ---
    const paises = ref([]); // lista completa de países obtenida de la API
    const cargando = ref(true); // indicador de carga (v-if)
    const error = ref(null); // mensaje de error (v-if)
    const origenDatos = ref(""); // de dónde vinieron los datos (api-viva | local)
    const busqueda = ref(""); // texto de búsqueda (v-model)
    const regionSeleccionada = ref("Todas"); // filtro por región (v-model)

    // --- Datos derivados con computed() ---
    // Regiones únicas para el selector, ordenadas alfabéticamente.
    const regiones = computed(() => {
      const unicas = [...new Set(paises.value.map((p) => p.region))];
      unicas.sort((a, b) => a.localeCompare(b, "es"));
      return ["Todas", ...unicas];
    });

    // Lista filtrada por nombre (búsqueda) y por región.
    const paisesFiltrados = computed(() => {
      const texto = busqueda.value.trim().toLowerCase();
      return paises.value.filter((p) => {
        const coincideNombre = p.name.toLowerCase().includes(texto);
        const coincideRegion =
          regionSeleccionada.value === "Todas" ||
          p.region === regionSeleccionada.value;
        return coincideNombre && coincideRegion;
      });
    });

    // --- Carga de datos: se ejecuta en onMounted() ---
    async function cargarPaises() {
      cargando.value = true;
      error.value = null;
      try {
        // fetch() asíncrono con try/catch (ver services/api.js)
        const { paises: datos, origen } = await fetchPaises();
        paises.value = datos;
        origenDatos.value = origen;
      } catch (err) {
        console.error("[App] Error al cargar países:", err);
        error.value = err.message || "Error desconocido";
      } finally {
        cargando.value = false;
      }
    }

    // La primer llamada a la API se ejecuta dentro de onMounted().
    onMounted(() => {
      cargarPaises();
    });

    return {
      paises,
      cargando,
      error,
      origenDatos,
      busqueda,
      regionSeleccionada,
      regiones,
      paisesFiltrados,
      cargarPaises,
    };
  },
  template: `
    <div class="app">
      <header class="app-header">
        <h1 class="app-title">🌍 Explorador de Países</h1>
        <p class="app-subtitle">
          Consumo de API REST con Vue 3 + fetch() — Programación Web
        </p>
        <p v-if="origenDatos" class="data-source">
          Datos cargados desde:
          <strong>{{ origenDatos === 'api-viva' ? 'API REST Countries en vivo' : 'repositorio local (fallback)' }}</strong>
        </p>
      </header>

      <main class="app-main">
        <!-- Barra de búsqueda con v-model (por nombre y por región) -->
        <SearchBar
          v-if="!cargando && !error"
          v-model="busqueda"
          v-model:region="regionSeleccionada"
          :regiones="regiones"
          :total="paisesFiltrados.length"
        />

        <!-- v-if: indicador de carga mientras se obtienen los datos -->
        <LoadingSpinner v-if="cargando" />

        <!-- v-if: mensaje de error si la API falla -->
        <ErrorMessage
          v-else-if="error"
          tipo="error"
          :mensaje="'No fue posible obtener los datos de la API: ' + error"
        />

        <!-- v-if: mensaje cuando no hay resultados tras filtrar -->
        <ErrorMessage
          v-else-if="paisesFiltrados.length === 0"
          tipo="sin-resultados"
        />

        <!-- v-for: lista/tarjetas de países obtenidos de la API -->
        <section v-else class="countries-grid">
          <CountryCard
            v-for="pais in paisesFiltrados"
            :key="pais.cca2 || pais.name"
            :pais="pais"
          />
        </section>
      </main>

      <footer class="app-footer">
        <p>
          Proyecto Unidad 3 — Consumo de API con Vue 3 y fetch() ·
          Tecnológico Nacional de México
        </p>
      </footer>
    </div>
  `,
};

createApp(App).mount("#app");
