import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "./utility";

const initialState = {
  todos: [],
  loading: false
};

const fetchTodosStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchTodosSuccess = (state, action) => {
  return updateObject(state, {
    todos: action.todos,
    loading: false
  });
};

const fetchTodosFail = (state, action) => {
  return updateObject(state, { loading: false });
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TODOS_START:
      return fetchTodosStart(state, action);
    case actionTypes.FETCH_TODOS_SUCCESS:
      return fetchTodosSuccess(state, action);
    case actionTypes.FETCH_TODOS_FAIL:
      return fetchTodosFail(state, action);
    default:
      return state;
  }
};

export default reducer;
