export const helloWorldAction2 = (query, preguntas) => {
  preguntas = preguntas.filter(pregunta => {
    let index = pregunta.pregunta.indexOf(query);

    if (index !== -1) {
      return true;
    }

    return preguntas;
  });

  return {
    type: "HELLO_2",
    preguntas
  };
};
