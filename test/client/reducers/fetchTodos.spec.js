import reducer from "../../../client/reducers/todos";
import * as actionTypes from "../../../client/actions/actionTypes";

const todos = [
  {
    id: 1,
    title: "demo titile1",
    body: "I will show demo in meetup 1.",
    completed: false
  },
  {
    id: 2,
    title: "demo titile2",
    body: "I will show demo in meetup 2.",
    completed: false
  }
];

describe("FETCH_TODOS", () => {
  it("初期状態が返されるはず", () => {
    expect(reducer(undefined, {})).toEqual({
      todos: [],
      todo: null,
      loading: false,
      error: null
    });
  });

  it("FETCH_TODOS_SUCCESSが処理されるはず", () => {
    expect(
      reducer(
        { todos: [], todo: null, loading: false, error: null },
        {
          type: actionTypes.FETCH_TODOS_SUCCESS,
          todos: todos
        }
      )
    ).toEqual({
      todos: todos,
      todo: null,
      loading: false,
      error: null
    });
  });

  it("REQUEST_ERRORが処理されるはず", () => {
    expect(
      reducer(
        { loading: true },
        {
          type: actionTypes.REQUEST_ERROR,
          loading: false,
          error: {
            response: {
              statusText: "Internal Server Error",
              status: 500
            }
          }
        }
      )
    ).toEqual({
      loading: false,
      error: {
        message: "Internal Server Error",
        statusCode: 500
      }
    });
  });
});
