// Convierte los estados del backend ("positivo" | "negativo" | …) en estados visuales.
export const dollarTrend = (state) =>
  state === "positivo" ? "up" : state === "negativo" ? "down" : "flat";

export const coffeeTrend = (state) => (state === "positivo" ? "up" : "down");
