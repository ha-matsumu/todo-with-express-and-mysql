import * as actionTypes from "./actionTypes";
import axios from "axios";

// action creators
const addTodoStart = () => {
  return {
    type: actionTypes.ADD_TODO_START
  };
};

const addTodoSuccess = todo => {
  return {
    type: actionTypes.ADD_TODO_SUCCESS,
    todo: todo
  };
};

const addTodoFail = error => {
  return {
    type: actionTypes.ADD_TODO_FAIL,
    error: error
  };
};

export const addTodo = todo => async dispatch => {
  try {
    dispatch(addTodoStart());
    const response = await axios.post("/api/todos", todo);
    dispatch(addTodoSuccess(response.data));
  } catch (error) {
    dispatch(addTodoFail(error));
  }
};
