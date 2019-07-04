import { takeLatest } from "redux-saga/effects";
import { listenForPreguntasSagas, savePreguntaSagas } from "./preguntaSagas";

export default function* watcherSaga() {
  yield takeLatest("PREGUNTAS_LISTEN", listenForPreguntasSagas);
  yield takeLatest("PREGUNTA_SAVE", savePreguntaSagas);
}
