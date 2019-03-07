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
  console.log(JSON.stringify(todo));
  try {
    dispatch(addTodoStart());
    const response = await axios.post("/api/todos", JSON.stringify(todo));
    dispatch(addTodoSuccess(response.data));
  } catch (error) {
    dispatch(addTodoFail(error));
  }
};
