import reducer from "../../../client/reducers/todos";
import * as actionTypes from "../../../client/actions/actionTypes";

describe("DELETE_TODO", () => {
  it("DELETE_TODOが処理されるはず(errorオブジェクトがない状態)", () => {
    expect(
      reducer(
        {
          todos: [
            {
              id: 1,
              title: "demo title1",
              body: "demo body1",
              completed: false
            },
            {
              id: 2,
              title: "demo title2",
              body: "demo body2",
              completed: false
            },
            {
              id: 3,
              title: "demo title3",
              body: "demo body3",
              completed: false
            }
          ],
          todo: null,
          loading: false,
          error: null
        },
        {
          type: actionTypes.DELETE_TODO_SUCCESS,
          todoId: 2
        }
      )
    ).toEqual({
      todos: [
        {
          id: 1,
          title: "demo title1",
          body: "demo body1",
          completed: false
        },
        {
          id: 3,
          title: "demo title3",
          body: "demo body3",
          completed: false
        }
      ],
      todo: null,
      loading: false,
      error: null
    });
  });

  it("DELETE_TODOが処理されるはず(errorオブジェクトがある状態)", () => {
    expect(
      reducer(
        {
          todos: [
            {
              id: 1,
              title: "demo title1",
              body: "demo body1",
              completed: false
            },
            {
              id: 2,
              title: "demo title2",
              body: "demo body2",
              completed: false
            },
            {
              id: 3,
              title: "demo title3",
              body: "demo body3",
              completed: false
            }
          ],
          todo: null,
          loading: false,
          error: {
            message: "Internal Server Error",
            statusCode: 500
          }
        },
        {
          type: actionTypes.DELETE_TODO_SUCCESS,
          todoId: 2
        }
      )
    ).toEqual({
      todos: [
        {
          id: 1,
          title: "demo title1",
          body: "demo body1",
          completed: false
        },
        {
          id: 3,
          title: "demo title3",
          body: "demo body3",
          completed: false
        }
      ],
      todo: null,
      loading: false,
      error: null
    });
  });
});
