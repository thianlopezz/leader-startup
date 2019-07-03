import { combineReducers } from "redux";
import preguntaReducer from "./preguntaReducer";

export default combineReducers({
  preguntaState: preguntaReducer
});
