import { useForm } from "react-hook-form";
import { usePrecios } from "../../context/PreciosContex";
import { useState } from "react";

function ValkiriaCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createPrecios } = usePrecios();
  const [guardando, setGuardando] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setGuardando(true); // Actualizar el estado de guardando a true al enviar el formulario
      await createPrecios(data);
    } catch (error) {
      console.error("Error al crear precios:", error);
    } finally {
      setGuardando(false); // Restablecer el estado de guardando a false después de finalizar la operación
    }
  });

  return (
    <div className="centrar">
      <div className="precios">
        <div className="container-valkiria container-valkiria-create">
          <form onSubmit={onSubmit}>
            <div className="text-center fs-3 fw-bold mb-5">
              <span>Crear Precios Valkiria</span>
              <br />
            </div>

            <div className="container my-5">
              <span>Precio Diferencia $</span>
              <input
                type="text"
                {...register("diferencia")}
                name="diferencia"
                autoFocus
                placeholder="$ 0"
              />
            </div>
            <div className="container">
              <span>Precio Origen</span>
              <input
                type="text"
                {...register("origen")}
                name="origen"
                placeholder="$ 0"
              />
            </div>
            <div className="container">
              <span>Precio Taza</span>
              <input
                type="text"
                {...register("taza", { required: true })}
                name="taza"
                placeholder="$ 0"
              />
              {errors.taza && <p className="text-danger">Taza es requerido</p>}
            </div>
            <div className="container">
              <span>Precio Mic-Lote</span>
              <input
                type="text"
                {...register("microLote", { required: true })}
                name="microLote"
                placeholder="$ 0"
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
                placeholder="$ 0"
              />
              {errors.medianoLote && (
                <p className="text-danger">MedianoLote es requerido</p>
              )}
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-success btn-guardar"
              disabled={guardando}
              >
              {guardando ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </form>
          <div className="d-flex justify-content-center mt-2">
            <span className="text-span mt-2">
              Crea nuevos precios para llevar el control de valkiria
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ValkiriaCreate;
