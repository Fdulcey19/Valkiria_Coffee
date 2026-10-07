# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## Puesta en marcha

Requiere Node 20+ y [pnpm](https://pnpm.io) (`corepack enable` lo activa).

```bash
pnpm install
pnpm dev      # desarrollo: http://localhost:5173 (el proxy reenvía /api al backend en :4000)
pnpm build    # producción
pnpm lint
```

Variables (`.env.local`): `VITE_API_URL` (por defecto `/api`) y `VITE_PROXY_TARGET` (backend de desarrollo, por defecto `http://localhost:4000`).

## Textos legales

Los datos de contacto del responsable (razón social, NIT, domicilio, correo, teléfono) son opcionales en `src/config/legal.js`: los que se completen aparecen solos en los documentos y los vacíos se omiten.
