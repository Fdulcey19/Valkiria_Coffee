import { useForm } from "react-hook-form";
import { usePrecios } from "../../context/PreciosContex";
import { useEffect, useState } from "react";

function Valkiria() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { precios, createPrecios, getPrecios, updatePrecio } = usePrecios();
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPrecios();
        setFormData(data); // Inicializar formData con los precios
      } catch (error) {
        console.error("Error al obtener precios:", error);
      }
    };

    fetchData();
  }, []);

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
      if (precios && precios._id) {
        await updatePrecio(precios._id, formData); // Utiliza formData para enviar los datos actualizados
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

  return (
    <div className="container precios">
      <div className="container-valkiria">
        <form onSubmit={onSubmit}>
          <div className="text-center fs-3 fw-bold mb-5">
            <span>Precios Valkiria</span>
          </div>

          <div className="container mt-2">
            <span>Precio Origen</span>
            <input
              type="text"
              {...register("origen")}
              name="origen"
              autoFocus
              value={formData.origen || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="container">
            <span>Precio Taza</span>
            <input
              type="text"
              {...register("taza", { required: true })}
              name="taza"
              value={formData.taza || ""}
              onChange={handleInputChange}
            />
            {errors.taza && <p className="text-danger">Taza es requerido</p>}
          </div>
          <div className="container">
            <span>Precio Mic-Lote</span>
            <input
              type="text"
              {...register("microLote", { required: true })}
              name="microLote"
              value={formData.microLote || ""}
              onChange={handleInputChange}
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
              value={formData.medianoLote || ""}
              onChange={handleInputChange}
            />
            {errors.medianoLote && (
              <p className="text-danger">MedianoLote es requerido</p>
            )}
          </div>

          <div className="d-flex justify-content-center">
            {precios ? (
              <button
                type="button"
                className="btn btn-primary btn-actualizar"
                onClick={handleUpdate}
                disabled={updating}
              >
                {updating ? "Actualizando..." : "Actualizar"}
              </button>
            ) : (
              <button type="submit" className="btn btn-success btn-guardar">
                Guardar Cambios
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Valkiria;
