import * as actionTypes from "./actionTypes";
import axios from "axios";

// Actionには、実行されるアクションの種類を示すtypeプロパティが必要
export const fetchTodosStart = () => {
  return {
    type: actionTypes.FETCH_TODOS_START
  };
};

export const fetchTodosFail = error => {
  return {
    type: actionTypes.FETCH_TODOS_FAIL,
    error: error
  };
};

export const fetchTodosSuccess = todos => {
  return {
    type: actionTypes.FETCH_TODOS_SUCCESS,
    todos: todos
  };
};

// Action Creater
export const fetchTodos = () => {
  return dispatch => {
    dispatch(fetchTodosStart());
    axios
      .get("/api/todos")
      .then(response => {
        dispatch(fetchTodosSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchTodosFail(error));
      });
  };
};
