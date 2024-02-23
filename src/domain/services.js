import axios from 'axios'

export const getPosts = async () => {
    try {
         const responseAllData = await axios.get("https://valkiria-backend-felipe-dulceys-projects.vercel.app");
        return responseAllData
    } catch {
        console.log("Error al obtener los datos".error);
    }
}

// 

export const getPrecioMercado = (res, valorPuntoDiferencia) => {
    return parseFloat(res.data.arroba) + parseFloat(valorPuntoDiferencia);
}

export const getPrecioOrigen = (valorPuntoDiferencia, valorOrigen) => {
    console.log(valorOrigen,"valorOrigen Services");
    return parseFloat(valorPuntoDiferencia) + parseFloat(valorOrigen);
}

export const getValorTaza = (precioMercado, valorTaza) => {
    return parseFloat(precioMercado) + parseFloat(valorTaza);
}

export const getPrecioMicLote = (precioMercado, valorMicLote) => {
    return parseFloat(precioMercado) + parseFloat(valorMicLote);
}

export const getPrecioMedLote = (precioMercado, valorMedLote) => {
    return parseFloat(precioMercado) + parseFloat(valorMedLote);
}

// Nuevo Futuro
export const getPrecioMercadoNuevo = (res, valorPuntoDiferencia) => {
    return parseFloat(res.data.arroba) + parseFloat(valorPuntoDiferencia);
}


export const getPrecioOrganico = (res, valorOrganico) => {
    console.log(valorOrganico, "valorOrganico Services");
    return parseFloat(res) + parseFloat(valorOrganico);
}

export const getPrecioOrganico88 = (res, mercado, bonificacion) => {
    return parseFloat(res) + parseFloat(mercado) +  parseFloat(bonificacion);
}


export const getPrecioConvencional = (res, valorConvencional) => {
    return parseFloat(res) + parseFloat(valorConvencional);
}

export const getPrecioConvencional88 = (res, mercado, bonificacion) => {
    return parseFloat(res) + parseFloat(mercado) +  parseFloat(bonificacion);
}

export const getPrecioEstandar = (res, valorEstandar) => {
    return parseFloat(res) + parseFloat(valorEstandar);
}

export const getPrecioEstandar88 = (res, mercado, bonificacion) => {
    return parseFloat(res) + parseFloat(mercado) +  parseFloat(bonificacion);
}

export const getPrecioTaza = (res, ValorTazaN) => {
    return parseFloat(res) + parseFloat(ValorTazaN);
}

export const getPrecioTaza88 = (res, mercado, bonificacion) => {
    return parseFloat(res)  +  parseFloat(bonificacion) + parseFloat(mercado);
}