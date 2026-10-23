/**
 * SearchBar.js — Barra de búsqueda con v-model.
 * Demuestra el uso de v-model (enlace de datos bidireccional) para filtrar
 * países por nombre y por región.
 *
 * Usa v-model en el componente padre:
 *   <SearchBar v-model="busqueda" v-model:region="regionSeleccionada" :regiones="regiones" />
 */
export default {
  name: "SearchBar",
  props: {
    modelValue: { type: String, default: "" }, // texto de búsqueda (v-model)
    region: { type: String, default: "Todas" }, // región seleccionada (v-model:region)
    regiones: { type: Array, default: () => [] },
    total: { type: Number, default: 0 }, // total de países cargados
  },
  emits: ["update:modelValue", "update:region", "limpiar"],
  computed: {
    // Patrón computed get/set para v-model interno del input.
    textoBusqueda: {
      get() {
        return this.modelValue;
      },
      set(valor) {
        this.$emit("update:modelValue", valor);
      },
    },
    regionSeleccionada: {
      get() {
        return this.region;
      },
      set(valor) {
        this.$emit("update:region", valor);
      },
    },
  },
  methods: {
    limpiarFiltros() {
      this.$emit("update:modelValue", "");
      this.$emit("update:region", "Todas");
      this.$emit("limpiar");
    },
  },
  template: `
    <div class="search-bar">
      <div class="search-field">
        <span class="search-icon" aria-hidden="true">🔎</span>
        <!-- v-model: enlace bidireccional con el texto de búsqueda -->
        <input
          v-model="textoBusqueda"
          type="text"
          class="search-input"
          placeholder="Buscar país por nombre..."
          aria-label="Buscar país por nombre"
        />
        <button
          v-if="textoBusqueda"
          type="button"
          class="clear-btn"
          @click="textoBusqueda = ''"
          aria-label="Limpiar búsqueda"
        >✕</button>
      </div>

      <div class="filter-field">
        <label for="region-select" class="filter-label">Región:</label>
        <!-- v-model también en el selector de región -->
        <select id="region-select" v-model="regionSeleccionada" class="region-select">
          <option v-for="r in regiones" :key="r" :value="r">{{ r }}</option>
        </select>
      </div>

      <button
        type="button"
        class="reset-btn"
        @click="limpiarFiltros"
        :disabled="!textoBusqueda && regionSeleccionada === 'Todas'"
      >
        Limpiar filtros
      </button>

      <p class="result-count" v-if="total > 0">
        Mostrando <strong>{{ total }}</strong> {{ total === 1 ? 'país' : 'países' }}
      </p>
    </div>
  `,
};
