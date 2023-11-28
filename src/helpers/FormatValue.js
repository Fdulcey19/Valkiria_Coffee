export const formatValue=(num)=>{

    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(
      num)

  }