import { combineReducers } from "redux";
import { contacts } from "../reducers/reducers";

export const rootReducer = combineReducers({
  contacts
});

export type AppState = ReturnType<typeof rootReducer>;