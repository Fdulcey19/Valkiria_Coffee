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

// 

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

// Nuevo Futuro
export const getPrecioMercadoNuevo = (res, valorPuntoDiferencia) => {
    return parseFloat(res.data.arroba) + parseFloat(valorPuntoDiferencia);
}


export const getPrecioOrganico = (res, valorOrganico) => {
    return parseFloat(res.data.arroba) + parseFloat(valorOrganico);
}

export const getPrecioOrganico88 = (res, valorFactorOrganicoBonificacion) => {
    return parseFloat(res.data.arroba) + parseFloat(valorFactorOrganicoBonificacion);
}


export const getPrecioCombencional = (res, valorCombencional) => {
    return parseFloat(res.data.arroba) + parseFloat(valorCombencional);
}

export const getPrecioCombencional88 = (res, valorCombencionalBonificacion) => {
    return parseFloat(res.data.arroba) + parseFloat(valorCombencionalBonificacion);
}

export const getPrecioEstandar = (res, valorEstandar) => {
    return parseFloat(res.data.arroba) + parseFloat(valorEstandar);
}

export const getPrecioEstandar88 = (res, valorEstandar88,) => {
    return parseFloat(res.data.arroba) + parseFloat(valorEstandar88);
}

export const getPrecioTaza = (res, ValorTazaN) => {
    return parseFloat(res.data.arroba) + parseFloat(ValorTazaN);
}

export const getPrecioTaza88 = (res, ValorTazaN88) => {
    return parseFloat(res.data.arroba) + parseFloat(ValorTazaN88);
}