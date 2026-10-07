import ReactDOM from 'react-dom/client'

// Tipografías autoalojadas (sin depender de Google Fonts y embebibles en la imagen del afiche)
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "boxicons/css/boxicons.min.css";
import App from './App.jsx'
import "./assets/CSS/style.css"

// Si el navegador tiene transiciones de vista, el cambio de pantalla se desvanece solo (ver style.css).
if (typeof document.startViewTransition === 'function') document.documentElement.dataset.vt = ''

ReactDOM.createRoot(document.getElementById('root')).render(
    <App/>
)
