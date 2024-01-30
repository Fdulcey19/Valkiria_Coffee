import { useForm } from "react-hook-form";
import { usePrecios } from "../../context/PreciosContex";

function Valkiria() {
  const { register, handleSubmit } = useForm();

  const { createPrecios } = usePrecios();
  
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const res = await createPrecios(data);
    console.log(res);
  });

  return (
    <div className="container precios">
      <div className="container-valkiria">
        <form onSubmit={onSubmit}>
          <div className="text-center fs-3 fw-bold mb-5">
            <span>Precios Valkiria</span>
          </div>

          <div className="container mt-2">
            <span>Precio Origen</span>
            <input type="text" {...register("origen")} autoFocus/>
          </div>
          <div className="container">
            <span>Precio Taza</span>
            <input type="text" {...register("taza")} />
          </div>
          <div className="container">
            <span>Precio Mic-Lote</span>
            <input type="text" {...register("microLote")} />
          </div>
          <div className="container">
            <span>Precio Med-Lote</span>
            <input type="text" {...register("medianoLote")} />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-success btn-guardar">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Valkiria;
