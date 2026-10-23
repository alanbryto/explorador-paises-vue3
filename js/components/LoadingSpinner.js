/**
 * LoadingSpinner.js — Indicador de carga.
 * Se muestra con v-if mientras se obtienen los datos de la API.
 */
export default {
  name: "LoadingSpinner",
  template: `
    <div class="loading-box" role="status" aria-live="polite">
      <div class="spinner"></div>
      <p class="loading-text">Cargando países...</p>
    </div>
  `,
};
