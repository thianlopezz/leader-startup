export const filtrarPreguntas = (query, preguntas) => {
  preguntas = preguntas.filter(pregunta => {
    if (!query) {
      return true;
    }

    let index = pregunta.pregunta.toUpperCase().indexOf(query.toUpperCase());

    if (index !== -1) {
      return true;
    }

    return false;
  });

  return {
    type: "SET_FILTERED",
    preguntas
  };
};
