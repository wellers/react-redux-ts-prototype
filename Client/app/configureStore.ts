import { AppState, rootReducer } from "./stores";
import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";

const loggerMiddleware = createLogger();

export default function configureStore(preloadedState?: AppState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );
}