import axios from 'axios';

export const getPrecios = async () => {
    try {
        // const responseAllData = await axios.get("https://valkiria-backend-felipe-dulceys-projects.vercel.app/api/precios");
        const responseAllData = await axios.get("https://valkiria.onrender.com/api/precios");
        return responseAllData;
    } catch {
        console.log("Error al obtener los datos".error);
    }
    }