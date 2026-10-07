import { useForm } from "react-hook-form";
import ConfigField from "../ui/ConfigField";
import { usePrecios } from "../../context/usePrecios";
import { useEffect, useState } from "react";
import ValkiriaCreate from "./ValkiriaCreate";
import { ConfigFormSkeleton, PageHold } from "../ui/Skeletons";
import { useSkeletonGate } from "../../hooks/useSkeletonGate";

function Valkiria() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createPrecios, getPrecios, updatePrecio } = usePrecios();
  // Registro propio de esta pestaña. No se lee el `precios` compartido del contexto: Nuevo Futuro
  // también lo escribe, y ambas pestañas están cargadas a la vez (ver NavConfiguracion).
  const [saved, setSaved] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({});

  const [loading, setLoading] = useState(true);
  const gate = useSkeletonGate(loading);
  const [missing, setMissing] = useState(false); // aún no hay precios guardados: se muestra el formulario de creación

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPrecios();
        if (!data) {
          setMissing(true);
          return;
        }
        console.log("¿ Hay data ?", data);
        setSaved(data);
        setFormData(data); // Inicializar formData con los precios
      } catch (error) {
        console.error("Error al obtener precios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getPrecios]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createPrecios(data);
    } catch (error) {
      console.error("Error al crear precios:", error);
    }
  });

  const handleUpdate = async () => {
    try {
      setUpdating(true);
      if (saved?._id) {
        await updatePrecio(saved._id, formData); // Utiliza formData para enviar los datos actualizados
      } else {
        console.error("No se pudo obtener el ID de precios.");
      }
    } catch (error) {
      console.error("Error al actualizar precios:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (gate.waiting) return <PageHold />;
  if (gate.skeleton) return <ConfigFormSkeleton />;
  if (missing) return <ValkiriaCreate />;

  return (
    <div className="form-card">
      <h2>Precios Valkiria</h2>
      <p className="form-card__sub">Valores base para el cálculo de Origen, Taza y Lotes.</p>

      <form className="form-grid" onSubmit={onSubmit} noValidate>
        <ConfigField
          label="Precio diferencia"
          {...register("diferencia")}
          value={formData.diferencia || ""}
          onChange={handleInputChange}
        />
        <ConfigField
          label="Precio origen"
          {...register("origen")}
          value={formData.origen || ""}
          onChange={handleInputChange}
        />
        <ConfigField
          label="Precio taza"
          {...register("taza", { required: "La taza es requerida" })}
          value={formData.taza || ""}
          onChange={handleInputChange}
          error={errors.taza?.message}
        />
        <ConfigField
          label="Precio micro lote"
          {...register("microLote", { required: "El micro lote es requerido" })}
          value={formData.microLote || ""}
          onChange={handleInputChange}
          error={errors.microLote?.message}
        />
        <ConfigField
          label="Precio mediano lote"
          {...register("medianoLote", { required: "El mediano lote es requerido" })}
          value={formData.medianoLote || ""}
          onChange={handleInputChange}
          error={errors.medianoLote?.message}
        />

        <div className="form-actions" style={{ marginTop: 0 }}>
          {saved ? (
            <button type="button" className="btn btn--primary" onClick={handleUpdate} disabled={updating}>
              {updating ? "Actualizando…" : "Actualizar"}
            </button>
          ) : (
            <button type="submit" className="btn btn--primary text-[14px]">
              Guardar cambios
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Valkiria;
