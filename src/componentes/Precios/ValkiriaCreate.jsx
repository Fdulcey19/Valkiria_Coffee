import { useForm } from "react-hook-form";
import { usePrecios } from "../../context/PreciosContex";

function ValkiriaCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createPrecios } = usePrecios();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createPrecios(data);
    } catch (error) {
      console.error("Error al crear precios:", error);
    }
  });

  return (
    <div className="container precios">
      <div className="container-valkiria">
        <form onSubmit={onSubmit}>
          <div className="text-center fs-3 fw-bold mb-5">
            <span>Crear Precios Valkiria</span><br />
          </div>

          <div className="container mt-1">
            <span>Precio Diferencia</span>
            <input
              type="text"
              {...register("diferencia")}
              name="diferencia"
              autoFocus
            />
          </div>
          <div className="container">
            <span>Precio Origen</span>
            <input
              type="text"
              {...register("origen")}
              name="origen"
            />
          </div>
          <div className="container">
            <span>Precio Taza</span>
            <input
              type="text"
              {...register("taza", { required: true })}
              name="taza"
            />
            {errors.taza && <p className="text-danger">Taza es requerido</p>}
          </div>
          <div className="container">
            <span>Precio Mic-Lote</span>
            <input
              type="text"
              {...register("microLote", { required: true })}
              name="microLote"
            />
            {errors.microLote && (
              <p className="text-danger">MicroLote es requerido</p>
            )}
          </div>
          <div className="container">
            <span>Precio Med-Lote</span>
            <input
              type="text"
              {...register("medianoLote", { required: true })}
              name="medianoLote"
            />
            {errors.medianoLote && (
              <p className="text-danger">MedianoLote es requerido</p>
            )}
          </div>

          <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-success btn-guardar">
                Guardar Cambios
              </button>
          </div>
        </form>
        <div className="d-flex justify-content-center mt-2">
        <span className="text-span">Crea nuevos precios para llevar el control de valkiria</span>
        </div>
      </div>
    </div>
  );
}

export default ValkiriaCreate;
