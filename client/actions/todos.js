import * as actionTypes from "./actionTypes";
import axios from "axios";

// action creators
const fetchTodosStart = () => {
  return {
    type: actionTypes.FETCH_TODOS_START
  };
};

const fetchTodosSuccess = todos => {
  return {
    type: actionTypes.FETCH_TODOS_SUCCESS,
    todos: todos
  };
};

const fetchTodosFail = error => {
  return {
    type: actionTypes.FETCH_TODOS_FAIL,
    error: error
  };
};

export const fetchTodos = () => async dispatch => {
  try {
    dispatch(fetchTodosStart());
    const response = await axios.get("/api/todos");
    dispatch(fetchTodosSuccess(response.data));
  } catch (error) {
    dispatch(fetchTodosFail(error));
  }
};
