import { useForm } from "react-hook-form";
import ConfigField from "../ui/ConfigField";
import { usePrecios } from "../../context/usePrecios";
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
    <div className="form-card">
      <h2>Crear precios Nuevo Futuro</h2>
      <p className="form-card__sub">Crea los precios base para llevar el control de Valkiria y Nuevo Futuro.</p>

      <form className="form-grid" onSubmit={onSubmit} noValidate>
        <ConfigField label="Precio diferencia" placeholder="0" autoFocus {...register("diferencia")} />
        <fieldset className="form-group" style={{ border: 0, margin: 0, minInlineSize: 0 }}>
          <legend className="form-group__title">Orgánico</legend>
          <div className="form-group__fields">
            <ConfigField
              label="Orgánico 92"
              placeholder="0"
              {...register("organico")}
              error={errors.organico?.message}
            />
            <ConfigField
              label="Orgánico +88"
              placeholder="0"
              {...register("organicoBonificacion")}
              error={errors.organicoBonificacion?.message}
            />
          </div>
        </fieldset>
        <fieldset className="form-group" style={{ border: 0, margin: 0, minInlineSize: 0 }}>
          <legend className="form-group__title">Convencional</legend>
          <div className="form-group__fields">
            <ConfigField
              label="Convencional 92"
              placeholder="0"
              {...register("convencional")}
              error={errors.convencional?.message}
            />
            <ConfigField
              label="Convencional +88"
              placeholder="0"
              {...register("convencionalBonificacion")}
              error={errors.convencionalBonificacion?.message}
            />
          </div>
        </fieldset>
        <fieldset className="form-group" style={{ border: 0, margin: 0, minInlineSize: 0 }}>
          <legend className="form-group__title">Estándar</legend>
          <div className="form-group__fields">
            <ConfigField
              label="Estándar 92"
              placeholder="0"
              {...register("estandar", { required: "Estándar 92 es requerido" })}
              error={errors.estandar?.message}
            />
            <ConfigField
              label="Estándar +88"
              placeholder="0"
              {...register("estandarBonificacion", { required: "Estándar +88 es requerido" })}
              error={errors.estandarBonificacion?.message}
            />
          </div>
        </fieldset>
        <fieldset className="form-group" style={{ border: 0, margin: 0, minInlineSize: 0 }}>
          <legend className="form-group__title">Taza</legend>
          <div className="form-group__fields">
            <ConfigField
              label="Taza 92"
              placeholder="0"
              {...register("taza", { required: "Taza 92 es requerido" })}
              error={errors.taza?.message}
            />
            <ConfigField
              label="Taza +88"
              placeholder="0"
              {...register("tazaBonificacion", { required: "Taza +88 es requerido" })}
              error={errors.tazaBonificacion?.message}
            />
          </div>
        </fieldset>

        <div className="form-actions" style={{ marginTop: 0 }}>
          <button type="submit" className="btn btn--primary text-[14px]" disabled={guardando}>
            {guardando ? "Guardando…" : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default NuevoCreate;
