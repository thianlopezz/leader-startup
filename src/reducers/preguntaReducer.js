let defaultState = {
  loadingList: false,
  loading: false,
  preguntas: [],
  preguntasFiltradas: []
};

const preguntaReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_FILTERED":
      return { ...state, preguntasFiltradas: action.preguntas };
    case "PREGUNTA_LOAD":
      return { ...state, loadingList: true };
    case "PREGUNTA_LOAD_SUCCESS":
      return {
        ...state,
        loading: false,
        preguntas: action.preguntas,
        preguntasFiltradas: action.preguntas
      };
    case "PREGUNTA_LOAD_ERROR":
      return {
        ...state,
        loadingList: false,
        message: action.message,
        error: action.error
      };
    case "PREGUNTA_SAVE":
      return {
        ...state,
        loading: true
      };
    case "PREGUNTA_SAVE_SUCCESS":
      return {
        ...state,
        loading: false
      };
    case "PREGUNTA_SAVE_ERROR":
      return {
        ...state,
        loading: false,
        message: action.message,
        error: action.error
      };
    default:
      return state;
  }
};

export default preguntaReducer;
