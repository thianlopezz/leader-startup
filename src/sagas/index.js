import { takeLatest } from "redux-saga/effects";
import {
  listenForPreguntasSagas,
  savePreguntaSagas,
  updatePreguntaSagas,
  deltePreguntaSagas
} from "./preguntaSagas";

export default function* watcherSaga() {
  yield takeLatest("PREGUNTAS_LISTEN", listenForPreguntasSagas);
  yield takeLatest("PREGUNTA_SAVE", savePreguntaSagas);
  yield takeLatest("PREGUNTA_UPDATE", updatePreguntaSagas);
  yield takeLatest("PREGUNTA_DELETE", deltePreguntaSagas);
}
