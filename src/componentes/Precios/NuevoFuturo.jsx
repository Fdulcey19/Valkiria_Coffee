import { useForm } from "react-hook-form";
import { usePrecios } from "../../context/PreciosContex";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPreciosNuevo();
        if (!data) {
          navigate("/dash/configuracion/nuevofuturo");
          return;
        }
        setPrecios(data);
        setFormData(data); // Inicializar formData con los precios
        console.log("Precios Nuevo Futuro", data);
      } catch (error) {
        console.error("Error al obtener precios:", error);
      }
    };

    fetchData();
  }, []);

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

  return (
    <div className="centrar">
      <div className="precios">
        <div className="container-valkiria container-nuevo-futuro">
          <div className="text-center fs-3 fw-bold mb-4">
            <span>Precios Nuevo Futuro</span>
          </div>
          <form onSubmit={onSubmit}>
            <div className="container_pry">
              <div className="container mt-4">
                <span>Precio Diferencia</span>
                <input
                  type="text"
                  {...register("diferencia")}
                  name="diferencia"
                  autoFocus
                  value={formData.diferencia || ""}
                  onChange={handleInputChange}
                />
                {errors.diferencia && (
                  <p className="text-danger">Organico es requerido</p>
                )}
              </div>
            </div>
            <div className="container_pry">
              <div className="container mt-4">
                <span>Organico 92</span>
                <input
                  type="text"
                  {...register("organico")}
                  name="organico"
                  autoFocus
                  value={formData.organico || ""}
                  onChange={handleInputChange}
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
                  value={formData.organicoBonificacion || ""}
                  onChange={handleInputChange}
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
                  value={formData.convencional || ""}
                  onChange={handleInputChange}
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
                  value={formData.convencionalBonificacion || ""}
                  onChange={handleInputChange}
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
                  value={formData.estandar || ""}
                  onChange={handleInputChange}
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
                  value={formData.estandarBonificacion || ""}
                  onChange={handleInputChange}
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
                  value={formData.taza || ""}
                  onChange={handleInputChange}
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
                  value={formData.tazaBonificacion || ""}
                  onChange={handleInputChange}
                />
                {errors.tazaBonificacion && (
                  <p className="text-danger">TazaBonificacion es requerido</p>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="button"
                onClick={handleUpdate}
                className="btn btn-success btn-actualizar"
              >
                 Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NuevoFuturo;
