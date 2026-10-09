import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mark from "../assets/images/valkiria5.png";
import watermark from "../assets/images/logo4.png";
import {
  getPosts,
  refreshPosts,
  getPrecioMedLote,
  getPrecioMercado,
  getPrecioMicLote,
  getPrecioOrigen,
  getValorTaza,
} from "../domain/services";
import { refreshNotice } from "../lib/refreshNotice";
import { notifyRefresh } from "../lib/notifyRefresh";
import { formatRemaining } from "../lib/formatRemaining";
import { useCooldown } from "../hooks/useCooldown";
import { usePrecios } from "../context/usePrecios";
import Clock from "../componentes/ui/Clock";
import IndicatorPanel from "../componentes/ui/IndicatorPanel";
import MoneyField from "../componentes/ui/MoneyField";
import ResultField from "../componentes/ui/ResultField";
import { ErrorScreen } from "../componentes/ui/StatusScreen";
import { HomeSkeleton, PageHold } from "../componentes/ui/Skeletons";
import { useSkeletonGate } from "../hooks/useSkeletonGate";

// Solo lee lo guardado en la BD (no consulta fuentes externas): sirve para ver lo que otro usuario recargó.
const POLL_MS = 30000;
const money = (n) => `$ ${Math.round(n).toLocaleString()}`;

function Home() {
  const { getPrecios } = usePrecios();
  const navigate = useNavigate();

  const [valorPrecioMercado, setValorPrecioMercado] = useState(0);
  const [valorOrigenSumado, setValorOrigenSumado] = useState(0);
  const [valorTazaSumado, setValorTazaSumado] = useState(0);
  const [valorMicLoteSumado, setValorMicLoteSumado] = useState(0);
  const [valorMedLoteSumado, setValorMedLoteSumado] = useState(0);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const gate = useSkeletonGate(loading);
  const [refreshing, setRefreshing] = useState(false);
  const cooldown = useCooldown(data);
  const [error, setError] = useState(null);

  const [precios, setPrecios] = useState({
    diferencia: 0,
    origen: 0,
    taza: 0,
    microLote: 0,
    medianoLote: 0,
  });

  const setPrecio = (campo) => (e) =>
    setPrecios((prev) => ({ ...prev, [campo]: e.target.value }));

  useEffect(() => {
    const loadSavedPrices = async () => {
      try {
        const saved = await getPrecios();
        setPrecios((prev) => (!saved ? prev : saved));
      } catch (err) {
        console.error("Error al obtener precios:", err);
      }
    };
    loadSavedPrices();
  }, [getPrecios]);

  const fetchData = useCallback(async (refresh = false) => {
    let fetched = null;
    try {
      const response = refresh ? await refreshPosts() : await getPosts();
      // Si /api no llega al backend, el servidor puede devolver HTML (index.html): eso no es un precio.
      if (typeof response.data?.libra !== "number") throw new Error("Respuesta de precios no válida");
      setData(response.data);
      setError(null);
      fetched = response.data;

      const precioMercado =
        Math.floor(getPrecioMercado(response, precios.diferencia) / 100) * 100;

      setValorPrecioMercado(precioMercado);
      setValorOrigenSumado(getPrecioOrigen(precioMercado, precios.origen));
      setValorTazaSumado(getValorTaza(precioMercado, precios.taza));
      setValorMicLoteSumado(getPrecioMicLote(precioMercado, precios.microLote));
      setValorMedLoteSumado(getPrecioMedLote(precioMercado, precios.medianoLote));
    } catch (err) {
      setError(err);
      fetched = { error: err };
    } finally {
      setLoading(false);
    }
    return fetched;
  }, [precios.diferencia, precios.origen, precios.taza, precios.microLote, precios.medianoLote]);

  useEffect(() => {
    fetchData();
    // Solo se sondea con la pestaña a la vista: una pestaña olvidada en segundo plano no mantiene viva la consulta.
    const id = setInterval(() => { if (!document.hidden) fetchData(); }, POLL_MS);
    const onVisible = () => { if (!document.hidden) fetchData(); };
    document.addEventListener("visibilitychange", onVisible);
    return () => { clearInterval(id); document.removeEventListener("visibilitychange", onVisible); };
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
  if (gate.skeleton) return <HomeSkeleton />;
  if (!data) return <ErrorScreen onRetry={handleReload} />;

  const goShare = () =>
    navigate("/dash/share", {
      state: {
        origenSumado: valorOrigenSumado,
        tazaSumado: valorTazaSumado,
        micLoteSumado: valorMicLoteSumado,
        medLoteSumado: valorMedLoteSumado,
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

  const extras = [
    { key: "origen", name: "Origen", total: valorOrigenSumado },
    { key: "taza", name: "Taza", total: valorTazaSumado },
    { key: "microLote", name: "Mic-Lote", total: valorMicLoteSumado },
    { key: "medianoLote", name: "Med-Lote", total: valorMedLoteSumado },
  ];

  return (
    <div className={`page ${gate.settled ? "page--settled" : ""}`}>
      <header className="page-header">
        <div>
          <h1>Valkiria</h1>
          <p>Precios del pergamino calculados con el mercado en vivo.</p>
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

      {refreshNotice(data) && (
        <p className="market-source__note" role="status" style={{ marginBottom: 16 }}>{refreshNotice(data)}</p>
      )}

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
              <MoneyField
                label="Punto diferencia"
                value={precios.diferencia}
                onChange={setPrecio("diferencia")}
              />
              <MoneyField
                label="Precio mercado"
                value={valorPrecioMercado.toLocaleString()}
                onChange={(e) => setValorPrecioMercado(e.target.value)}
              />
            </div>
          </section>

          <section className="panel panel--compact" aria-labelledby="t-extras">
            <h2 className="panel__title" id="t-extras">
              <i className="bx bx-coffee" aria-hidden="true"></i> Precios extras
            </h2>
            <div className="extras">
              <div className="extras__head" aria-hidden="true">
                <span></span>
                <span>Adicional</span>
                <span>Precio</span>
              </div>
              {extras.map(({ key, name, total }) => (
                <div className="extras__row" key={key}>
                  <span className="extras__name">{name}</span>
                  <div className="extras__cell">
                    <span className="extras__cap" aria-hidden="true">Adicional</span>
                    <MoneyField label={`${name}: adicional`} value={precios[key]} onChange={setPrecio(key)} />
                  </div>
                  <div className="extras__cell">
                    <span className="extras__cap" aria-hidden="true">Precio</span>
                    <ResultField label={`${name}: precio`} value={money(total)} />
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

export default Home;
