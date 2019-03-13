import reducer from "../../../client/reducers/todos";
import * as actionTypes from "../../../client/actions/actionTypes";

describe("ADD_TODO", () => {
  it("ADD_TODOが処理されるはず(errorオブジェクトがない状態)", () => {
    expect(
      reducer(
        { todos: [], todo: null, loading: false, error: null },
        {
          type: actionTypes.ADD_TODO_SUCCESS,
          todo: { title: "demo title", body: "demo body", completed: false }
        }
      )
    ).toEqual({
      todos: [
        {
          title: "demo title",
          body: "demo body",
          completed: false
        }
      ],
      todo: null,
      loading: false,
      error: null
    });
  });

  it("ADD_TODOが処理されるはず(errorオブジェクトがある状態)", () => {
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
          type: actionTypes.ADD_TODO_SUCCESS,
          todo: { title: "demo title", body: "demo body", completed: false }
        }
      )
    ).toEqual({
      todos: [
        {
          title: "demo title",
          body: "demo body",
          completed: false
        }
      ],
      todo: null,
      loading: false,
      error: null
    });
  });
});
