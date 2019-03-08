import axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";

import { deleteTodo } from "../../../client/actions/index";
import * as actionTypes from "../../../client/actions/actionTypes";

const axiosMock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const todo = {
  id: 1,
  title: "demo title",
  body: "demo body",
  completed: false
};

describe("actions", () => {
  afterEach(() => {
    axiosMock.reset();
  });

  describe("deleteTodo", () => {
    it("todoIdの送信が完了したらDELETE_TODO_SUCCESSを作成する", () => {
      const path = "/api/todos/1";
      axiosMock.onDelete(path).reply(200, {
        todo: todo
      });

      const expectedActions = [
        { type: actionTypes.REQUEST_START },
        {
          type: actionTypes.DELETE_TODO_SUCCESS,
          todoId: todo.id
        }
      ];

      const store = mockStore();

      store.dispatch(deleteTodo(todo.id)).then(() => {
        const result = store.getActions();

        expect(result).toEqual(expectedActions);
      });
    });
  });
});
