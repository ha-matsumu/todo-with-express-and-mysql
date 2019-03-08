import * as actionTypes from "./actionTypes";
import axios from "axios";

// action creators
const requestStart = () => {
  return {
    type: actionTypes.REQUEST_START
  };
};

const requestError = error => {
  return {
    type: actionTypes.REQUEST_ERROR,
    error: error
  };
};

const fetchTodosSuccess = todos => {
  return {
    type: actionTypes.FETCH_TODOS_SUCCESS,
    todos: todos
  };
};

const addTodoSuccess = todo => {
  return {
    type: actionTypes.ADD_TODO_SUCCESS,
    todo: todo
  };
};

const updateTodoSuccess = todo => {
  return {
    type: actionTypes.UPDATE_TODO_SUCCESS,
    todo: todo
  };
};

export const fetchTodos = () => async dispatch => {
  try {
    dispatch(requestStart());
    const response = await axios.get("/api/todos");
    dispatch(fetchTodosSuccess(response.data));
  } catch (error) {
    dispatch(requestError(error));
  }
};

export const addTodo = todo => async dispatch => {
  try {
    dispatch(requestStart());
    const response = await axios.post("/api/todos", todo);
    dispatch(addTodoSuccess(response.data));
  } catch (error) {
    dispatch(requestError(error));
  }
};

export const updateTodo = todo => async dispatch => {
  try {
    dispatch(requestStart());
    const response = await axios.put(`/api/todos/${todo.id}`, todo);
    dispatch(updateTodoSuccess(response.data));
  } catch (error) {
    dispatch(requestError(error));
  }
};
