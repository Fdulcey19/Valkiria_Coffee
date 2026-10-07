import { useForm } from "react-hook-form";
import ConfigField from "../ui/ConfigField";
import { usePrecios } from "../../context/usePrecios";
import { useEffect, useState } from "react";
import NuevoCreate from "./NuevoCreate";
import { ConfigFormSkeleton, PageHold } from "../ui/Skeletons";
import { useSkeletonGate } from "../../hooks/useSkeletonGate";

function NuevoFuturo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [precios, setPrecios] = useState({});
  const { createPreciosNuevo, getPreciosNuevo, updatePreciosNuevo } =
    usePrecios();
  const [formData, setFormData] = useState({});

  const [loading, setLoading] = useState(true);
  const gate = useSkeletonGate(loading);
  const [missing, setMissing] = useState(false); // aún no hay precios guardados: se muestra el formulario de creación

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPreciosNuevo();
        if (!data) {
          setMissing(true);
          return;
        }
        setPrecios(data);
        setFormData(data); // Inicializar formData con los precios
        console.log("Precios Nuevo Futuro", data);
      } catch (error) {
        console.error("Error al obtener precios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getPreciosNuevo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = handleSubmit(async () => {
    try {
      const modifiedData = {};

      // Verificar campos modificados y agregar al objeto modifiedData
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== precios[key]) {
          modifiedData[key] = formData[key];
        }
      });

      console.log("Data modificada:", modifiedData);

      if (Object.keys(modifiedData).length > 0) {
        await createPreciosNuevo(modifiedData);
      } else {
        console.log("No hay cambios para enviar.");
      }
    } catch (error) {
      console.error("Error al crear precios:", error);
    }
  });

  const handleUpdate = async () => {
    try {
      console.log("Precios", precios._id);
      if (precios && precios._id) {
        await updatePreciosNuevo(precios._id, formData);
      } else {
        console.error("No se pudo obtener el ID de precios.");
      }
    } catch (error) {
      console.error("Error al actualizar precios:", error);
    }
  };

  if (gate.waiting) return <PageHold />;
  if (gate.skeleton) return <ConfigFormSkeleton />;
  if (missing) return <NuevoCreate />;

  return (
    <div className="form-card">
      <h2>Precios Nuevo Futuro</h2>
      <p className="form-card__sub">Valores base y bonificaciones por tipo de café.</p>

      <form className="form-grid" onSubmit={onSubmit} noValidate>
        <ConfigField
          label="Precio diferencia"
          {...register("diferencia")}
          value={formData.diferencia || ""}
          onChange={handleInputChange}
        />
        <fieldset className="form-group" style={{ border: 0, margin: 0, minInlineSize: 0 }}>
          <legend className="form-group__title">Orgánico</legend>
          <div className="form-group__fields">
            <ConfigField
              label="Orgánico 92"
              {...register("organico")}
              value={formData.organico || ""}
              onChange={handleInputChange}
              error={errors.organico?.message}
            />
            <ConfigField
              label="Orgánico +88"
              {...register("organicoBonificacion")}
              value={formData.organicoBonificacion || ""}
              onChange={handleInputChange}
              error={errors.organicoBonificacion?.message}
            />
          </div>
        </fieldset>
        <fieldset className="form-group" style={{ border: 0, margin: 0, minInlineSize: 0 }}>
          <legend className="form-group__title">Convencional</legend>
          <div className="form-group__fields">
            <ConfigField
              label="Convencional 92"
              {...register("convencional")}
              value={formData.convencional || ""}
              onChange={handleInputChange}
              error={errors.convencional?.message}
            />
            <ConfigField
              label="Convencional +88"
              {...register("convencionalBonificacion")}
              value={formData.convencionalBonificacion || ""}
              onChange={handleInputChange}
              error={errors.convencionalBonificacion?.message}
            />
          </div>
        </fieldset>
        <fieldset className="form-group" style={{ border: 0, margin: 0, minInlineSize: 0 }}>
          <legend className="form-group__title">Estándar</legend>
          <div className="form-group__fields">
            <ConfigField
              label="Estándar 92"
              {...register("estandar", { required: "Estándar 92 es requerido" })}
              value={formData.estandar || ""}
              onChange={handleInputChange}
              error={errors.estandar?.message}
            />
            <ConfigField
              label="Estándar +88"
              {...register("estandarBonificacion", { required: "Estándar +88 es requerido" })}
              value={formData.estandarBonificacion || ""}
              onChange={handleInputChange}
              error={errors.estandarBonificacion?.message}
            />
          </div>
        </fieldset>
        <fieldset className="form-group" style={{ border: 0, margin: 0, minInlineSize: 0 }}>
          <legend className="form-group__title">Taza</legend>
          <div className="form-group__fields">
            <ConfigField
              label="Taza 92"
              {...register("taza", { required: "Taza 92 es requerido" })}
              value={formData.taza || ""}
              onChange={handleInputChange}
              error={errors.taza?.message}
            />
            <ConfigField
              label="Taza +88"
              {...register("tazaBonificacion", { required: "Taza +88 es requerido" })}
              value={formData.tazaBonificacion || ""}
              onChange={handleInputChange}
              error={errors.tazaBonificacion?.message}
            />
          </div>
        </fieldset>

        <div className="form-actions" style={{ marginTop: 0 }}>
          <button type="button" onClick={handleUpdate} className="btn btn--primary">
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
}

export default NuevoFuturo;
