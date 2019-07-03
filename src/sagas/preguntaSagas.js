import moment from "moment";
import { call, put } from "redux-saga/effects";

import fs from "../helpers/firestore";

const savePregunta = pregunta => {
  return fs
    .collection("preguntas")
    .add({ ...pregunta, feCreacion: moment().toDate() });
};

export function* savePreguntaSagas(action) {
  try {
    yield call(savePregunta, action.pregunta);

    if (action.success) {
      action.success();
    }

    yield put({ type: "PREGUNTA_SAVE_SUCCESS" });
  } catch (error) {
    yield put({ type: "PREGUNTA_SAVE_ERROR", message: error.message, error });
  }
}
