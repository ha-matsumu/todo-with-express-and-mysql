import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchTodosStart = () => {
  return {
    type: actionTypes.FETCH_TODOS_START
  };
};

export const fetchTodosSuccess = todos => {
  return {
    type: actionTypes.FETCH_TODOS_SUCCESS,
    todos: todos
  };
};

export const fetchTodosFail = error => {
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

  // export const fetchTodos = () => {
  //   return dispatch => {
  //     dispatch(fetchTodosStart());
  //     axios
  //       .get("/api/todos")
  //       .then(response => {
  //         // const fetchTodos = [];
  //         // response.data.map(todo => {
  //         //   fetchTodos.push(todo);
  //         // });
  //         dispatch(fetchTodosSuccess(response.data));
  //       })
  //       .catch(error => {
  //         dispatch(fetchTodosFail(error));
  //       });
  //   };
};
