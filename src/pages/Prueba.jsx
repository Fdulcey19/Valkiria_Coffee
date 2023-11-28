import { useRef } from 'react';
import html2canvas from 'html2canvas';

function Prueba() {
  const containerRef = useRef(null);

  const getFormattedDateTime = () => {
    const now = new Date();
    const month = ('0' + (now.getMonth() + 1)).slice(-2); // Agrega un cero al principio si es necesario
    const day = ('0' + now.getDate()).slice(-2); // Agrega un cero al principio si es necesario
    const hours = ('0' + now.getHours()).slice(-2); // Agrega un cero al principio si es necesario
    const minutes = ('0' + now.getMinutes()).slice(-2); // Agrega un cero al principio si es necesario

    return `${month}-${day}-${hours}:${minutes}`;
  };

  const handleGenerateImage = () => {
    if (containerRef.current) {
      html2canvas(containerRef.current)
        .then((canvas) => {
          const imageUrl = canvas.toDataURL('image/png');

          // Construye el nombre del archivo con "Valkiria" y la fecha actual
          const fileName = `Valkiria-${getFormattedDateTime()}.png`;

          // Crea un elemento <a> con un enlace a la imagen
          const link = document.createElement('a');
          link.href = imageUrl;
          link.download = fileName;

          // Simula un clic en el enlace para activar la descarga
          link.click();
        })
        .catch((error) => {
          console.error('Error al generar la imagen:', error);
        });
    }
  };

  return (
    <div className="home">
      <div>
        <div ref={containerRef}>
          {/* Contenido que quieres convertir en imagen */}
          <h1>Valkiria</h1>
          <p>Especiality Coffee</p>
        </div>
        <button className='btn btn-success' onClick={handleGenerateImage}>Descargar Imagen</button>
      </div>
    </div>
  );
}

export default Prueba;
