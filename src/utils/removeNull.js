// Função que remove campos nulos da busca

export default function removeKeyNull(array) {
  // Fazer um map no array de dados enviado no parâmetro
  const data = array.map(data => {
    // Converter para JSON
    const arrayData = data.toJSON();

    // Identificar as keys e verificar qual é null
    Object.keys(arrayData).forEach(key => {
      if (arrayData[key] === null) return delete arrayData[key];
    });

    return arrayData;
  })

  return data;
}
