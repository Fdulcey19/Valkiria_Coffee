import { useForm } from "react-hook-form";
import ConfigField from "../ui/ConfigField";
import { usePrecios } from "../../context/usePrecios";
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
    <div className="form-card">
      <h2>Crear precios Valkiria</h2>
      <p className="form-card__sub">Crea los precios base para llevar el control de Valkiria.</p>

      <form className="form-grid" onSubmit={onSubmit} noValidate>
        <ConfigField label="Precio diferencia" placeholder="0" autoFocus {...register("diferencia")} />
        <ConfigField label="Precio origen" placeholder="0" {...register("origen")} />
        <ConfigField
          label="Precio taza"
          placeholder="0"
          {...register("taza", { required: "La taza es requerida" })}
          error={errors.taza?.message}
        />
        <ConfigField
          label="Precio micro lote"
          placeholder="0"
          {...register("microLote", { required: "El micro lote es requerido" })}
          error={errors.microLote?.message}
        />
        <ConfigField
          label="Precio mediano lote"
          placeholder="0"
          {...register("medianoLote", { required: "El mediano lote es requerido" })}
          error={errors.medianoLote?.message}
        />

        <div className="form-actions" style={{ marginTop: 0 }}>
          <button type="submit" className="btn btn--primary text-[14px]" disabled={guardando}>
            {guardando ? "Guardando…" : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ValkiriaCreate;
