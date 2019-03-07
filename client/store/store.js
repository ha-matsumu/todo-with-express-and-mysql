import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import todosReducer from "../reducers/todos";

function configureStore() {
  const rootReducer = combineReducers({
    todos: todosReducer
  });

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
}

export default configureStore;
