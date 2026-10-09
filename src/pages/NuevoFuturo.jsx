import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mark from "../assets/images/valkiria5.png";
import watermark from "../assets/images/logo4.png";
import {
  getPosts,
  refreshPosts,
  getPrecioMercadoNuevo,
  getPrecioOrganico,
  getPrecioTaza,
  getPrecioEstandar,
  getPrecioConvencional,
  getPrecioOrganico88,
  getPrecioEstandar88,
  getPrecioConvencional88,
  getPrecioTaza88,
} from "../domain/services";
import { notifyRefresh } from "../lib/notifyRefresh";
import { formatRemaining } from "../lib/formatRemaining";
import { useCooldown } from "../hooks/useCooldown";
import { usePrecios } from "../context/usePrecios";
import Clock from "../componentes/ui/Clock";
import IndicatorPanel from "../componentes/ui/IndicatorPanel";
import MoneyField from "../componentes/ui/MoneyField";
import ResultField from "../componentes/ui/ResultField";
import { ErrorScreen } from "../componentes/ui/StatusScreen";
import { NuevoFuturoSkeleton, PageHold } from "../componentes/ui/Skeletons";
import { useSkeletonGate } from "../hooks/useSkeletonGate";

// Solo lee lo guardado en la BD (no consulta fuentes externas): sirve para ver lo que otro usuario recargó.
const POLL_MS = 30000;
const money = (n) => `$ ${Math.round(n).toLocaleString()}`;

// Cada grupo: campo base, campo de bonificación y clave del resultado (92 y +88).
const GRUPOS = [
  { nombre: "Orgánico", base: "organico", bono: "organicoBonificacion", key: "organico" },
  { nombre: "Convencional", base: "convencional", bono: "convencionalBonificacion", key: "convencional" },
  { nombre: "Estándar", base: "estandar", bono: "estandarBonificacion", key: "estandar" },
  { nombre: "Taza", base: "taza", bono: "tazaBonificacion", key: "taza" },
];

const VALORES_INICIALES = {
  organico92: 0, organico88: 0,
  convencional92: 0, convencional88: 0,
  estandar92: 0, estandar88: 0,
  taza92: 0, taza88: 0,
};

function NuevoFuturo() {
  const navigate = useNavigate();
  const { getPreciosNuevo } = usePrecios();

  const [valorPrecioMercado, setValorPrecioMercado] = useState(0);
  const [valores, setValores] = useState(VALORES_INICIALES);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const gate = useSkeletonGate(loading);
  const [refreshing, setRefreshing] = useState(false);
  const cooldown = useCooldown(data);
  const [error, setError] = useState(null);

  const [precios, setPrecios] = useState({
    diferencia: 0,
    organico: 0,
    organicoBonificacion: 0,
    convencional: 0,
    convencionalBonificacion: 0,
    estandar: 0,
    estandarBonificacion: 0,
    taza: 0,
    tazaBonificacion: 0,
  });

  const setPrecio = (campo) => (e) =>
    setPrecios((prev) => ({ ...prev, [campo]: e.target.value }));

  useEffect(() => {
    const loadSavedPrices = async () => {
      try {
        const saved = await getPreciosNuevo();
        setPrecios((prev) => (!saved ? prev : saved));
      } catch (err) {
        console.error("Error al obtener precios:", err);
      }
    };
    loadSavedPrices();
  }, [getPreciosNuevo]);

  const fetchData = useCallback(async (refresh = false) => {
    let fetched = null;
    try {
      const response = refresh ? await refreshPosts() : await getPosts();
      setData(response.data);
      setError(null);
      fetched = response.data;

      const pm = Math.floor(getPrecioMercadoNuevo(response, precios.diferencia) / 100) * 100;

      setValorPrecioMercado(pm);
      setValores({
        organico92: getPrecioOrganico(pm, precios.organico),
        organico88: getPrecioOrganico88(pm, precios.organicoBonificacion, precios.organico),
        convencional92: getPrecioConvencional(pm, precios.convencional),
        convencional88: getPrecioConvencional88(pm, precios.convencional, precios.convencionalBonificacion),
        estandar92: getPrecioEstandar(pm, precios.estandar),
        estandar88: getPrecioEstandar88(pm, precios.estandarBonificacion, precios.estandar),
        taza92: getPrecioTaza(pm, precios.taza),
        taza88: getPrecioTaza88(pm, precios.tazaBonificacion, precios.taza),
      });
    } catch (err) {
      console.error("Error al obtener datos:", err);
      setError(err);
      fetched = { error: err };
    } finally {
      setLoading(false);
    }
    return fetched;
  }, [precios]);

  useEffect(() => {
    fetchData();
    const id = setInterval(() => fetchData(), POLL_MS);
    return () => clearInterval(id);
  }, [fetchData]);

  // Si el servidor aún está actualizando el dato, se vuelve a leer en unos segundos (sin esperar al sondeo).
  useEffect(() => {
    if (data?.meta?.refresco?.estado !== "actualizando") return undefined;
    const id = setTimeout(() => fetchData(), 4000);
    return () => clearTimeout(id);
  }, [data, fetchData]);

  const handleReload = async () => {
    setRefreshing(true);
    const refresh = await fetchData(true);
    setRefreshing(false);
    notifyRefresh(refresh);
  };

  if (gate.waiting) return <PageHold />;
  if (gate.skeleton) return <NuevoFuturoSkeleton />;
  if (!data) return <ErrorScreen onRetry={handleReload} />;

  const goShare = () =>
    navigate("/dash/nuevoshare", {
      state: {
        ...valores,
        dolar: data.dolar,
        lastCoffe: data.lastCoffe,
        dolarchange: data.indicadorDolar.dollarPriceChange,
        dolarPorChange: data.indicadorDolar.dollarPricePorChange,
        dolarstate: data.indicadorDolar.resultStateDollar,
        coffechange: data.indicador.cambioValorVar,
        coffePorChange: data.indicador.cambioValorPorcentaje,
        coffestate: data.indicador.resultState,
        coffeClock: data.indicador.clock,
      },
    });

  return (
    <div className={`page ${gate.settled ? "page--settled" : ""}`}>
      <header className="page-header">
        <div>
          <h1>Nuevo Futuro</h1>
          <p>Factores 92 y +88 por tipo de café, con bonificación.</p>
        </div>
        <div className="page-header__actions">
          <button type="button" className="btn btn--ghost text-[14px]" onClick={handleReload} disabled={refreshing || cooldown > 0}
            title={cooldown > 0 ? `Podrás actualizar de nuevo en ${formatRemaining(cooldown)}` : undefined}>
            <i className={`bx bx-refresh ${refreshing ? "bx-spin" : ""}`} aria-hidden="true"></i>
            {refreshing ? "Actualizando…" : cooldown > 0 ? `Recargar · ${formatRemaining(cooldown)}` : "Recargar"}
          </button>
          <button type="button" className="btn btn--primary text-[14px]" onClick={goShare}>
            <i className="bx bx-share-alt" aria-hidden="true"></i> Compartir oferta
          </button>
        </div>
      </header>

      {error && (
        <p className="field__error" role="status" style={{ marginBottom: 16 }}>
          No se pudo actualizar el mercado; mostrando los últimos datos.
        </p>
      )}

      <div className="dash-grid">
        <div className="dash-main">
          <img className="dash-watermark" src={watermark} alt="" aria-hidden="true" />
          <section className="hero-price" aria-label="Precio pergamino">
            <img className="hero-price__mark" src={mark} alt="" aria-hidden="true" />
            <span className="hero-price__label">Precio pergamino </span>
            <span key={data.arroba} className="hero-price__value">{`$ ${data.arroba.toLocaleString()}`}</span>
            <div className="hero-price__meta hidden">
              <span className="hero-price__time">
                <i className="bx bx-time-five" aria-hidden="true"></i>
                <Clock withDate />
              </span>
            </div>
          </section>

          <section className="panel panel--compact" aria-labelledby="t-mercado">
            <h2 className="panel__title" id="t-mercado">
              <i className="bx bx-line-chart" aria-hidden="true"></i> Precio de mercado
            </h2>
            <div className="price-grid">
              <MoneyField label="Punto diferencia" value={precios.diferencia} onChange={setPrecio("diferencia")} />
              <MoneyField
                label="Precio mercado"
                value={valorPrecioMercado.toLocaleString()}
                onChange={(e) => setValorPrecioMercado(e.target.value)}
              />
            </div>
          </section>

          <section className="panel panel--compact" aria-labelledby="t-factores">
            <h2 className="panel__title " id="t-factores">
              <i className="bx bx-leaf" aria-hidden="true"></i> Factores por tipo de café
            </h2>
            <div className="factor-list">
              {GRUPOS.map(({ nombre, base, bono, key }) => (
                <div className="factor-card factor-card--row" key={key}>
                  <span className="price-card__name">{nombre}</span>
                  <div className="factor-card__grid">
                    <MoneyField label="Base" value={precios[base]} onChange={setPrecio(base)} />
                    <ResultField label="Factor 92" value={money(valores[`${key}92`])} />
                    <MoneyField label="Bonificación" value={precios[bono]} onChange={setPrecio(bono)} />
                    <ResultField label="Factor +88" value={money(valores[`${key}88`])} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="dash-aside">
          <IndicatorPanel data={data} />
        </aside>
      </div>
    </div>
  );
}

export default NuevoFuturo;
