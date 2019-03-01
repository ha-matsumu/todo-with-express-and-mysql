import * as actionTypes from "./actionTypes";
import axios from "axios";

export const postTodoStart = () => {
  return {
    type: actionTypes.POST_TODO_START
  };
};

export const postTodoSuccess = postData => {
  return {
    type: actionTypes.POST_TODO_SUCCESS,
    postData: postData
  };
};

export const postTodoFail = error => {
  return {
    type: actionTypes.POST_TODO_FAIL,
    error: error
  };
};

export const postTodo = postTodoData => {
  return dispatch => {
    dispatch(postTodoStart());
    axios
      .post("/api/todos", postTodoData)
      .then(response => {
        console.log(response.data);
        dispatch(postTodoSuccess(postTodoData));
      })
      .catch(error => {
        dispatch(postTodoFail(error));
      });
  };
};
