import moment from "moment";
import { call, put, take, fork } from "redux-saga/effects";
import { eventChannel } from "redux-saga";

import fs from "../helpers/firestore";

function* listenForPreguntas() {
  const channel = new eventChannel(emiter => {
    const unsubscribe = fs
      .collection(`/preguntas`)
      .orderBy("feCreacion", "desc")
      .onSnapshot(querySnapshot => {
        emiter({
          data: querySnapshot.docs.map(item => {
            return {
              ...item.data(),
              _id: item.id,
              feCreacion: item.data().feCreacion.toDate()
            };
          })
        });
      });

    return () => {
      unsubscribe();
    };
  });

  while (true) {
    const { data } = yield take(channel);
    yield put({ type: "PREGUNTA_LOAD_SUCCESS", preguntas: data });
  }
}

const savePregunta = pregunta => {
  return fs
    .collection("preguntas")
    .add({ ...pregunta, feCreacion: moment().toDate() });
};

export function* listenForPreguntasSagas() {
  yield fork(listenForPreguntas);
}

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
