import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "./utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const postInit = (state, action) => {
  return updateObject(state, { purchased: false });
};

const postTodoStart = (state, action) => {
  return updateObject(state, { loading: false });
};

const postTodoSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  });
};

const postTodoFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_INIT:
      return postInit(state, action);
    case actionTypes.POST_TODO_START:
      return postTodoStart(state, action);
    case actionTypes.POST_TODO_SUCCESS:
      return postTodoSuccess(state, action);
    case actionTypes.POST_TODO_FAIL:
      return postTodoFail(state, action);
    default:
      return state;
  }
};

export default reducer;
