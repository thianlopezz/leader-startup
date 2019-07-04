export const filtrarPreguntas = (query, preguntas) => {
  preguntas = preguntas.filter(pregunta => {
    let index = pregunta.pregunta.indexOf(query);

    if (query === undefined || index !== -1) {
      return true;
    }

    return false;
  });

  return {
    type: "SET_FILTERED",
    preguntas
  };
};
