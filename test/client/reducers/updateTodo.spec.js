import reducer from "../../../client/reducers/todos";
import * as actionTypes from "../../../client/actions/actionTypes";

describe("UPDATE_TODO", () => {
  it("UPDATE_TODOが処理されるはず", () => {
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
          loading: false,
          error: null
        },
        {
          type: actionTypes.UPDATE_TODO_SUCCESS,
          todo: {
            id: 2,
            title: "updated demo title2",
            body: "updated demo body2",
            completed: true
          }
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
          id: 2,
          title: "updated demo title2",
          body: "updated demo body2",
          completed: true
        },
        {
          id: 3,
          title: "demo title3",
          body: "demo body3",
          completed: false
        }
      ],
      loading: false,
      error: null
    });
  });
});
