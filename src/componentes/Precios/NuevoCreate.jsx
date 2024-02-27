import { useForm } from "react-hook-form";
import { usePrecios } from "../../context/PreciosContex";

function NuevoCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createPreciosNuevo } = usePrecios();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createPreciosNuevo(data);
    } catch (error) {
      console.error("Error al crear precios:", error);
    }
  });

  return (
    <div className="container precios">
      <div className="container-valkiria container-nuevo-futuro">
        <div className="text-center fs-3 fw-bold mb-4">
          <span>Crear Precios Nuevo Futuro</span>
        </div>
        <form onSubmit={onSubmit}>
          <div className="container mt-5">
            <span>Precios diferencia</span>
            <input
              type="text"
              {...register("diferencia")}
              name="diferencia"
              autoFocus
            />
            {errors.diferencia && (
              <p className="text-danger">Organico es requerido</p>
            )}
          </div>
          <div className="container_pry">
            <div className="container mt-4">
              <span>Organico 92</span>
              <input type="text" {...register("organico")} name="organico" />
              {errors.organico && (
                <p className="text-danger">Organico es requerido</p>
              )}
            </div>
            <div className="container mt-4">
              <span>Organico +88</span>
              <input
                type="text"
                {...register("organicoBonificacion")}
                name="organicoBonificacion"
              />
              {errors.organicoBonificacion && (
                <p className="text-danger">OrganicoBonificacion es requerido</p>
              )}
            </div>
          </div>
          <div className="container_pry">
            <div className="container">
              <span>Convencional 92</span>
              <input
                type="text"
                {...register("convencional")}
                name="convencional"
              />
              {errors.convencional && (
                <p className="text-danger">Convencional es requerido</p>
              )}
            </div>
            <div className="container">
              <span>Convencional +88</span>
              <input
                type="text"
                {...register("convencionalBonificacion")}
                name="convencionalBonificacion"
              />
              {errors.convencionalBonificacion && (
                <p className="text-danger">
                  ConvencionalBonificacion es requerido
                </p>
              )}
            </div>
          </div>
          <div className="container_pry">
            <div className="container">
              <span>Estandar 92</span>
              <input
                type="text"
                {...register("estandar", { required: true })}
                name="estandar"
              />
              {errors.estandar && (
                <p className="text-danger">Estandar es requerido</p>
              )}
            </div>
            <div className="container">
              <span>Estandar +88</span>
              <input
                type="text"
                {...register("estandarBonificacion", { required: true })}
                name="estandarBonificacion"
              />
              {errors.estandarBonificacion && (
                <p className="text-danger">EstandarBonificacion es requerido</p>
              )}
            </div>
          </div>
          <div className="container_pry">
            <div className="container">
              <span>Taza 92</span>
              <input
                type="text"
                {...register("taza", { required: true })}
                name="taza"
              />
              {errors.taza && <p className="text-danger">Taza es requerido</p>}
            </div>
            <div className="container">
              <span>Taza +88</span>
              <input
                type="text"
                {...register("tazaBonificacion", { required: true })}
                name="tazaBonificacion"
              />
              {errors.tazaBonificacion && (
                <p className="text-danger">TazaBonificacion es requerido</p>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-success btn-guardar">
              Guardar Cambios
            </button>
          </div>
        </form>
        <div className="d-flex justify-content-center mt-2">
        <span className="text-span">Crea nuevos precios para llevar el control de valkiria & Nuevo futuro</span>
        </div>
      </div>
    </div>
  );
}

export default NuevoCreate;
