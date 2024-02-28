import { useForm } from "react-hook-form";
import { usePrecios } from "../../context/PreciosContex";
import { useState } from "react";

function NuevoCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createPreciosNuevo } = usePrecios();
  const [guardando, setGuardando] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setGuardando(true); // Actualizar el estado de guardando a true al enviar el formulario
      await createPreciosNuevo(data);
    } catch (error) {
      console.error("Error al crear precios:", error);
    } finally {
      setGuardando(false); // Restablecer el estado de guardando a false después de finalizar la operación
    }
  });

  return (
    <div className="centrar">
      <div className="precios">
        <div className="container-valkiria container-nuevo-futuro container-nuevo-futuro-create">
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
                placeholder="$ 0"
                autoFocus
              />
              {errors.diferencia && (
                <p className="text-danger">Organico es requerido</p>
              )}
            </div>
            <div className="container_pry">
              <div className="container mt-4">
                <span>Organico 92</span>
                <input
                  type="text"
                  {...register("organico")}
                  name="organico"
                  placeholder="$ 0"
                />
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
                  placeholder="$ 0"
                />
                {errors.organicoBonificacion && (
                  <p className="text-danger">
                    OrganicoBonificacion es requerido
                  </p>
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
                  placeholder="$ 0"
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
                  placeholder="$ 0"
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
                  placeholder="$ 0"
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
                  placeholder="$ 0"
                />
                {errors.estandarBonificacion && (
                  <p className="text-danger">
                    EstandarBonificacion es requerido
                  </p>
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
                  placeholder="$ 0"
                />
                {errors.taza && (
                  <p className="text-danger">Taza es requerido</p>
                )}
              </div>
              <div className="container">
                <span>Taza +88</span>
                <input
                  type="text"
                  {...register("tazaBonificacion", { required: true })}
                  name="tazaBonificacion"
                  placeholder="$ 0"
                />
                {errors.tazaBonificacion && (
                  <p className="text-danger">TazaBonificacion es requerido</p>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-success btn-guardar"disabled={guardando}
              >
              {guardando ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </form>
          <div className="d-flex justify-content-center mt-2">
            <span className="text-span mt-3">
              Crea nuevos precios para llevar el control de valkiria & Nuevo
              futuro
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NuevoCreate;
