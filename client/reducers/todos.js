import * as actionTypes from "../actions/actionTypes";

const initialState = {
  todos: [],
  loading: false,
  error: null
};

const requestStart = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

const requestError = (state, action) => {
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

const fetchTodosSuccess = (state, action) => {
  return {
    ...state,
    todos: action.todos,
    loading: false,
    error: null
  };
};

const addTodoSuccess = (state, action) => {
  return {
    ...state,
    todos: [...state.todos, action.todo],
    loading: false,
    error: null
  };
};

const updateTodoSuccess = (state, action) => {
  return {
    ...state,
    todos: [
      ...state.todos.map(todo => {
        return todo.id === action.todo.id ? action.todo : todo;
      })
    ],
    loading: false,
    error: null
  };
};

const deleteTodoSuccess = (state, action) => {
  return {
    ...state,
    todos: [
      ...state.todos.filter(todo => {
        return todo.id !== action.todoId;
      })
    ],
    loading: false,
    error: null
  };
};

// handling actions
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_START:
      return requestStart(state, action);
    case actionTypes.REQUEST_ERROR:
      return requestError(state, action);
    case actionTypes.FETCH_TODOS_SUCCESS:
      return fetchTodosSuccess(state, action);
    case actionTypes.ADD_TODO_SUCCESS:
      return addTodoSuccess(state, action);
    case actionTypes.UPDATE_TODO_SUCCESS:
      return updateTodoSuccess(state, action);
    case actionTypes.DELETE_TODO_SUCCESS:
      return deleteTodoSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
