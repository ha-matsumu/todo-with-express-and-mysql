import reducer from "../../../client/reducers/todos";
import * as actionTypes from "../../../client/actions/actionTypes";

describe("ADD_TODO", () => {
  it("ADD_TODOが処理されるはず", () => {
    expect(
      reducer(
        { todos: [], loading: false, error: null },
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
      loading: false,
      error: null
    });
  });
});
