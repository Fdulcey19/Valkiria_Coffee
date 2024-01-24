
function NuevoFuturo() {
  return (
    <div className="container precios">
      <div className="container-valkiria container-nuevo-futuro">
        <div className="text-center fs-3 fw-bold mb-4">
        <span >Precios Nuevo Futuro</span>
        </div>
        <div className="container_pry">
        <div className="container mt-4">
          <span>Organico 92</span>
          <input type="text" />
        </div>
        <div className="container mt-4">
          <span>Organico +88</span>
          <input type="text" />
        </div>
        </div>
        <div className="container_pry">
        <div className="container">
          <span>Convencional 92</span>
          <input type="text" />
        </div>
        <div className="container">
          <span>Convencional +88</span>
          <input type="text" />
        </div>
        </div>
        <div className="container_pry">
        <div className="container">
          <span>Estandar 92</span>
          <input type="text" />
        </div>
        <div className="container">
          <span>Estandar +88</span>
          <input type="text" />
        </div>
        </div>
        <div className="container_pry">
        <div className="container">
          <span>Taza 92</span>
          <input type="text" />
        </div>
        <div className="container">
          <span>Taza +88</span>
          <input type="text" />
        </div>
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-success btn-guardar">Guardar Cambios</button>
        </div>
      </div>
    </div>
  )
}

export default NuevoFuturo