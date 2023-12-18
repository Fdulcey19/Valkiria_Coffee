import axios from 'axios'

export const getPosts = async () => {
    try {
         const responseAllData = await axios.get("https://valkiria-backend-felipe-dulceys-projects.vercel.app");
        // const responseAllData = await axios.get("http://localhost:3000");
        return responseAllData
    } catch {
        console.log("Error al obtener los datos".error);
    }
}

export const getPrecioMercado = (res, valorPuntoDiferencia) => {
    return parseFloat(res.data.arroba) + parseFloat(valorPuntoDiferencia);
}

export const getPrecioOrigen = (res, valorOrigen) => {
    return parseFloat(res.data.arroba) + parseFloat(valorOrigen);
}

export const getValorTaza = (res, valorTaza) => {
    return parseFloat(res.data.arroba) + parseFloat(valorTaza);
}

export const getPrecioMicLote = (res, valorMicLote) => {
    return parseFloat(res.data.arroba) + parseFloat(valorMicLote);
}

export const getPrecioMedLote = (res, valorMedLote) => {
    return parseFloat(res.data.arroba) + parseFloat(valorMedLote);
}