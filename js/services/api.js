/**
 * api.js — Servicio de obtención de datos de países.
 *
 * Demuestra el consumo de una API REST mediante fetch() con manejo
 * de errores (try/catch) y estrategia de respaldo (fallback).
 *
 * ESTRATEGIA:
 *  1. Se intenta la API oficial de REST Countries v5 (la indicada en la consigna).
 *     La llave demo "rc_live_demo" sólo devuelve un país de ejemplo, por lo que
 *     si la respuesta contiene menos de 10 países se considera datos de demostración.
 *  2. Si la petición falla o devuelve datos insuficientes, se usa como respaldo
 *     el archivo local data/countries.json (229 países), también mediante fetch().
 *
 * De esta forma la aplicación SIEMPRE funciona en GitHub Pages y se cumple con
 * el requisito de usar fetch() + try/catch.
 */

// Endpoint oficial indicado en la consigna del proyecto.
const API_V5_URL =
  "https://api.restcountries.com/countries/v5?q=all&api-key=rc_live_demo&pretty=1";

// Archivo de respaldo incluido en el proyecto (se consume también con fetch).
const LOCAL_DATA_URL = "./data/countries.json";

/**
 * Normaliza un país proveniente de la API v5 al formato interno.
 * (Mejor esfuerzo; la llave demo sólo devuelve un país de ejemplo.)
 */
function normalizarPaisV5(obj) {
  return {
    name: obj?.names?.common || "Desconocido",
    capital: Array.isArray(obj?.capital) ? obj.capital[0] : obj?.capital || "—",
    region: obj?.region || "Otros",
    subregion: obj?.subregion || "—",
    population: obj?.population || 0,
    cca2: obj?.cca2 || obj?.codes?.cca2 || "",
    flag: obj?.flags?.png || `https://flagcdn.com/w320/${(obj?.cca2 || "").toLowerCase()}.png`,
    flagEmoji: obj?.flag || "",
  };
}

/**
 * Intenta obtener los países desde la API v5 en vivo.
 * Devuelve null si falla o si los datos son insuficientes (demo).
 */
async function obtenerDesdeApiViva() {
  // Timeout de 6s: si la API en vivo tarda demasiado, se pasa al respaldo.
  const controlador = new AbortController();
  const temporizador = setTimeout(() => controlador.abort(), 6000);
  try {
    const respuesta = await fetch(API_V5_URL, { signal: controlador.signal });
    if (!respuesta.ok) {
      throw new Error(`HTTP ${respuesta.status}`);
    }
    const json = await respuesta.json();
    const objetos = json?.data?.objects || [];
    // La llave demo devuelve 1 solo país; con menos de 10 no es útil para la app.
    if (objetos.length < 10) {
      return null;
    }
    return objetos.map(normalizarPaisV5);
  } finally {
    clearTimeout(temporizador);
  }
}

/**
 * Obtiene los países desde el archivo local incluido en el proyecto.
 */
async function obtenerDesdeDatosLocales() {
  const respuesta = await fetch(LOCAL_DATA_URL);
  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar el archivo local (HTTP ${respuesta.status})`);
  }
  return await respuesta.json();
}

/**
 * Función principal pública: obtiene la lista de países.
 * - Usa fetch() de forma asíncrona.
 * - Usa try/catch para el manejo de errores.
 * - Devuelve { paises, origen } para informar de dónde vinieron los datos.
 */
export async function fetchPaises() {
  try {
    const paisesVivos = await obtenerDesdeApiViva();
    if (paisesVivos) {
      return { paises: paisesVivos, origen: "api-viva" };
    }
  } catch (error) {
    console.warn("[api] Falló la API en vivo, se usará el respaldo local:", error);
  }

  // Fallback: datos locales (también vía fetch).
  const paisesLocales = await obtenerDesdeDatosLocales();
  return { paises: paisesLocales, origen: "local" };
}
