/**
 * ErrorMessage.js — Muestra mensajes de estado con v-if:
 *  - Error de la API (no fue posible obtener los datos).
 *  - Sin resultados cuando el filtro no coincide con ningún país.
 */
export default {
  name: "ErrorMessage",
  props: {
    tipo: { type: String, default: "sin-resultados" }, // "error" | "sin-resultados"
    mensaje: { type: String, default: "" },
  },
  computed: {
    texto() {
      if (this.mensaje) return this.mensaje;
      return this.tipo === "error"
        ? "No fue posible obtener los datos de la API."
        : "No se encontraron países con ese criterio de búsqueda.";
    },
    icono() {
      return this.tipo === "error" ? "⚠️" : "🔍";
    },
  },
  template: `
    <div class="message-box" :class="tipo">
      <span class="message-icon" aria-hidden="true">{{ icono }}</span>
      <p class="message-text">{{ texto }}</p>
    </div>
  `,
};
