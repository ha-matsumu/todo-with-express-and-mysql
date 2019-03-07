import * as actionTypes from "../actions/actionTypes";

const initialState = {
  todos: [],
  loading: false,
  error: null
};

const fetchTodosStart = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

const fetchTodosSuccess = (state, action) => {
  return {
    ...state,
    todos: action.todos,
    loading: false,
    error: null
  };
};

const fetchTodosFail = (state, action) => {
  const error = {
    message: action.error.response.statusText,
    statusCode: action.error.response.status
  };
  return {
    ...state,
    loading: false,
    error
  };
};

// handling actions
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
