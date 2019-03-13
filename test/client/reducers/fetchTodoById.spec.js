import reducer from "../../../client/reducers/todos";
import * as actionTypes from "../../../client/actions/actionTypes";

const todo = {
  id: 1,
  title: "demo titile1",
  body: "I will show demo in meetup 1.",
  completed: false
};

describe("FETCH_TODO_BY_ID", () => {
  it("FETCH_TODO_BY_ID_SUCCESSが処理されるはず(errorオブジェクトがない状態)", () => {
    expect(
      reducer(
        { todos: [], todo: null, loading: false, error: null },
        {
          type: actionTypes.FETCH_TODO_BY_ID_SUCCESS,
          todo: todo
        }
      )
    ).toEqual({
      todos: [],
      todo: todo,
      loading: false,
      error: null
    });
  });

  it("FETCH_TODO_BY_ID_SUCCESSが処理されるはず(errorオブジェクトがある状態)", () => {
    expect(
      reducer(
        {
          todos: [],
          todo: null,
          loading: false,
          error: {
            message: "Internal Server Error",
            statusCode: 500
          }
        },
        {
          type: actionTypes.FETCH_TODO_BY_ID_SUCCESS,
          todo: todo
        }
      )
    ).toEqual({
      todos: [],
      todo: todo,
      loading: false,
      error: null
    });
  });
});
