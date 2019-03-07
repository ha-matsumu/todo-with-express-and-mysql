import axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";

import { addTodo } from "../../../client/actions/index";
import * as actionTypes from "../../../client/actions/actionTypes";

const axiosMock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const todo = {
  title: "demo title",
  body: "demo body",
  completed: false
};

describe("actions", () => {
  afterEach(() => {
    axiosMock.reset();
  });

  describe("addTodo", () => {
    it("todoの送信が完了したらADD_TODO_SUCCESSを作成する", () => {
      const path = "/api/todos";
      axiosMock.onPost(path).reply(200, {
        todo: todo
      });

      const expectedActions = [
        { type: actionTypes.ADD_TODO_START },
        {
          type: actionTypes.ADD_TODO_SUCCESS,
          todo: todo
        }
      ];

      const store = mockStore({ todo: {} });

      store.dispatch(addTodo(todo)).then(() => {
        const result = store.getActions();

        expect(result).toEqual(expectedActions);
      });
    });
  });
});
