import axios from 'axios';

export const getPrecios = async () => {
    try {
        // const responseAllData = await axios.get("https://valkiria-backend-felipe-dulceys-projects.vercel.app/api/precios");
        const responseAllData = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:3000/api"}/precios`);
        return responseAllData;
    } catch {
        console.log("Error al obtener los datos".error);
    }
    }