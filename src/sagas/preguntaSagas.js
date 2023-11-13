import moment from "moment";
import { call, put, take, fork } from "redux-saga/effects";
import { eventChannel } from "redux-saga";

import db from "../helpers/firestore";
import {
  doc,
  collection,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  addDoc
} from "firebase/firestore";

function* listenForPreguntas() {
  const channel = new eventChannel((emiter) => {
    const q = query(collection(db, "preguntas"), orderBy("feCreacion", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      emiter({
        data: querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            _id: doc.id,
            feCreacion: doc.data().feCreacion.toDate(),
          };
        }),
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

const savePregunta = (pregunta) => {
  debugger;
  return addDoc(collection(db, "preguntas"), {
    ...pregunta,
    feCreacion: moment().toDate(),
  });
};

const updatePregunta = (pregunta) => {
  debugger;
  const preguntaRef = doc(db, "preguntas", pregunta._id);
  return updateDoc(preguntaRef, {
    ...pregunta,
  });
};

const deletePregunta = (_idPregunta) => {
  const preguntaRef = doc(db, "preguntas", _idPregunta);
  return updateDoc(preguntaRef, { isDeleted: true });
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

export function* updatePreguntaSagas(action) {
  try {
    yield call(updatePregunta, action.pregunta);

    if (action.success) {
      action.success();
    }

    yield put({ type: "PREGUNTA_UPDATE_SUCCESS" });
  } catch (error) {
    yield put({
      type: "PREGUNTA_UPDATE_ERROR",
      message: error.message,
      error,
    });
  }
}

export function* deltePreguntaSagas(action) {
  try {
    yield call(deletePregunta, action._idPregunta);

    if (action.success) {
      action.success();
    }

    yield put({ type: "PREGUNTA_DELETE_SUCCESS" });
  } catch (error) {
    yield put({
      type: "PREGUNTA_DELETE_ERROR",
      message: error.message,
      error,
    });
  }
}
