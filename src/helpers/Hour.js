// Puedes guardar este componente en un archivo llamado DateTimeFormatter.js

export const DateTimeFormatter = () => {
  const getFormattedDateTime = () => {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);

    return `${year}-${month}-${day}-${hours}:${minutes}`;
  };

  return <>{getFormattedDateTime()}</>;
};

