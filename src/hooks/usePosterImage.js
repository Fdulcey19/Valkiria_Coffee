import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { notify } from "../lib/notify";

const pad = (n) => String(n).padStart(2, "0");

const fileName = (prefix) => {
  const d = new Date();
  return `${prefix}-${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(d.getMinutes())}.png`;
};

const formatSize = (bytes) => (bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`);

/**
 * Genera la imagen (PNG) de un afiche y ofrece tres acciones: descargar, compartir
 * (hoja de compartir del dispositivo: WhatsApp, etc.) y copiar al portapapeles.
 *
 *  - La imagen se prepara en segundo plano al abrir la pantalla; así las acciones son
 *    inmediatas y conservan el "gesto del usuario" que exigen compartir y copiar.
 *  - Cada acción avisa con un toast y deja un estado breve de "listo".
 *  - Compartir y copiar solo se ofrecen en navegadores que las soportan.
 */
export default function usePosterImage(prefix = "Oferta-Valkiria") {
  const ref = useRef(null);
  const cache = useRef(null); // Promise<Blob> de la imagen ya preparada
  const [busy, setBusy] = useState(null); // "download" | "share" | "copy" | null
  const [done, setDone] = useState(null); // última acción terminada (check de 2 s)
  const [info, setInfo] = useState(null); // { width, height, size } o null mientras se prepara
  const [failed, setFailed] = useState(false);

  const supports = useMemo(
    () => ({
      share: typeof navigator !== "undefined" && typeof navigator.canShare === "function",
      copy: typeof ClipboardItem !== "undefined" && Boolean(navigator.clipboard?.write),
    }),
    []
  );

  /** Renderiza el afiche a PNG (una sola vez; después se reutiliza). */
  const prepare = useCallback(() => {
    if (!cache.current) {
      cache.current = (async () => {
        // Se importa bajo demanda: solo se necesita en esta pantalla.
        const { toBlob } = await import("html-to-image");
        await document.fonts?.ready; // tipografías web ya cargadas
        const node = ref.current;
        // En móvil la captura puede ir antes que la decodificación de las imágenes (p. ej. la marca de agua).
        await Promise.all([...node.querySelectorAll("img")].map((img) => img.decode?.().catch(() => {})));
        const options = {
          pixelRatio: 2,
          backgroundColor: "#f4f3f3",
          cacheBust: true,
          // El afiche está centrado con margin:auto; sin esto la imagen sale corrida.
          style: { margin: "0" },
        };
        // En móvil (Safari/iOS y algunos Android) la primera captura sale sin las <img> (marca de agua incluida):
        // se descarta una pasada de calentamiento para que html-to-image ya tenga las imágenes incrustadas.
        if (window.matchMedia?.("(pointer: coarse)").matches) await toBlob(node, options).catch(() => {});
        const blob = await toBlob(node, options);
        if (!blob) throw new Error("No se pudo generar la imagen");
        setInfo({ width: node.offsetWidth * 2, height: node.offsetHeight * 2, size: formatSize(blob.size) });
        return blob;
      })().catch((error) => {
        cache.current = null; // permite reintentar
        setFailed(true);
        throw error;
      });
    }
    return cache.current;
  }, []);

  // Prepara la imagen apenas el afiche está en pantalla.
  useEffect(() => {
    const id = setTimeout(() => prepare().catch(() => {}), 500);
    return () => clearTimeout(id);
  }, [prepare]);

  // Solo en desarrollo: tras un cambio en caliente (HMR) el afiche en pantalla ya no coincide
  // con la imagen guardada, así que se descarta y se vuelve a generar.
  // (Vite 4 no tiene `hot.off`: al desmontar el aviso se desactiva con una bandera.)
  useEffect(() => {
    const hot = import.meta.hot;
    if (!hot) return undefined;
    let active = true;
    let id;
    hot.on("vite:afterUpdate", () => {
      if (!active) return;
      clearTimeout(id);
      cache.current = null;
      setInfo(null);
      id = setTimeout(() => prepare().catch(() => {}), 600);
    });
    return () => {
      active = false;
      clearTimeout(id);
    };
  }, [prepare]);

  const run = useCallback(
    (action, task) => async () => {
      if (busy) return;
      setBusy(action);
      setFailed(false);
      try {
        const blob = await prepare();
        const name = fileName(prefix);
        await task(blob, name);
        setDone(action);
        setTimeout(() => setDone(null), 2200);
      } catch (error) {
        if (error?.name === "AbortError") return; // el usuario cerró la hoja de compartir
        console.error(error);
        notify.error("No se pudo completar la acción", "Inténtalo de nuevo en unos segundos.");
      } finally {
        setBusy(null);
      }
    },
    [busy, prefix, prepare]
  );

  const download = run("download", (blob, name) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
    notify.success("Imagen descargada", name);
  });

  const share = run("share", async (blob, name) => {
    const file = new File([blob], name, { type: "image/png" });
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: "Oferta Valkiria" });
    } else {
      // El dispositivo no puede compartir archivos: se descarga para adjuntarla manualmente.
      const url = URL.createObjectURL(blob);
      Object.assign(document.createElement("a"), { href: url, download: name }).click();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      notify.info("Imagen descargada", "Adjúntala en WhatsApp desde tu galería o descargas.");
    }
  });

  const copy = run("copy", async (blob) => {
    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
    notify.success("Imagen copiada", "Pégala directamente en WhatsApp Web o en otra aplicación.");
  });

  return { ref, supports, busy, done, info, failed, download, share, copy };
}
