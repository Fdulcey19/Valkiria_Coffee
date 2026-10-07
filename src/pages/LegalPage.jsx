/**
 * Visor genérico de documentos legales (Términos y Política de Privacidad).
 * Recibe una función que genera el documento a partir de los datos de config/legal.js.
 * Pública: se puede leer con o sin sesión.
 */
import PropTypes from "prop-types";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/valkiria3.png";
import LegalLinks from "../componentes/ui/LegalLinks";
import { LEGAL } from "../config/legal";
import { safePath } from "../lib/returnTo";

function LegalPage({ build }) {
  const doc = build(LEGAL);
  const navigate = useNavigate();
  const location = useLocation();

  // "Volver" regresa a la página desde la que se enlazó (landing, login…), no al historial
  // del navegador. Si se abrió la URL directamente, no hay origen y va al inicio.
  const goBack = () => navigate(safePath(location.state?.from) ?? "/", { replace: true });

  // El índice desplaza la página SIN modificar el historial: así "Volver" no recorre
  // las secciones visitadas, sino que sale del documento.
  const jumpTo = (id) => (event) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const previous = document.title;
    document.title = `${doc.title} · ${LEGAL.brand}`;
    window.scrollTo(0, 0);
    return () => {
      document.title = previous;
    };
  }, [doc.title]);

  return (
    <div className="legal">
      <header className="legal__bar">
        <Link to="/" aria-label="Valkiria, inicio">
          <img src={logo} alt="Valkiria" width="112" height="30" />
        </Link>
        <button type="button" className="btn btn--ghost btn--sm" onClick={goBack}>
          <i className="bx bx-arrow-back" aria-hidden="true"></i> Volver
        </button>
      </header>

      <div className="legal__wrap">
        <aside className="legal__toc" aria-label="Contenido del documento">
          <p className="legal__toc-title">Contenido</p>
          <ol>
            {doc.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} onClick={jumpTo(s.id)}>{s.title}</a>
              </li>
            ))}
          </ol>
        </aside>

        <main className="legal__doc">
          <h1>{doc.title}</h1>
          <p className="legal__updated">Última actualización: {LEGAL.updatedAt}</p>
          <p className="legal__intro">{doc.intro}</p>

          {doc.sections.map((s, index) => (
            <section key={s.id} id={s.id} className="legal__section" aria-labelledby={`${s.id}-t`}>
              <h2 id={`${s.id}-t`}>{index + 1}. {s.title}</h2>
              {s.blocks.map((block, i) =>
                block.p ? (
                  <p key={i}>{block.p}</p>
                ) : (
                  <ul key={i}>
                    {block.ul.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )
              )}
            </section>
          ))}
        </main>
      </div>

      <footer className="legal__foot">
        <LegalLinks replace />
        <p>Valkiria &copy; {new Date().getFullYear()}. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

LegalPage.propTypes = { build: PropTypes.func.isRequired };

export default LegalPage;
