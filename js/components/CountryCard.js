/**
 * CountryCard.js — Tarjeta individual de país.
 * Se renderiza una por cada país mediante v-for en el componente padre.
 * Muestra: bandera, nombre, capital, región y población.
 */
export default {
  name: "CountryCard",
  props: {
    pais: { type: Object, required: true },
  },
  computed: {
    poblacionFormateada() {
      return this.pais.population.toLocaleString("es-MX");
    },
  },
  template: `
    <article class="country-card">
      <div class="flag-container">
        <img
          class="flag-img"
          :src="pais.flag"
          :alt="'Bandera de ' + pais.name"
          loading="lazy"
          width="320"
          height="213"
        />
        <span class="flag-emoji" aria-hidden="true">{{ pais.flagEmoji }}</span>
      </div>
      <div class="card-body">
        <h3 class="country-name">{{ pais.name }}</h3>
        <ul class="country-info">
          <li>
            <span class="info-label">Capital:</span>
            <span class="info-value">{{ pais.capital }}</span>
          </li>
          <li>
            <span class="info-label">Región:</span>
            <span class="info-value">{{ pais.region }}</span>
          </li>
          <li>
            <span class="info-label">Subregión:</span>
            <span class="info-value">{{ pais.subregion }}</span>
          </li>
          <li>
            <span class="info-label">Población:</span>
            <span class="info-value">{{ poblacionFormateada }} hab.</span>
          </li>
        </ul>
      </div>
    </article>
  `,
};
