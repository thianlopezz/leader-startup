import { takeLatest } from "redux-saga/effects";
import { savePreguntaSagas } from "./preguntaSagas";

export default function* watcherSaga() {
  yield takeLatest("PREGUNTA_SAVE", savePreguntaSagas);
}
