import axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";

import { fetchTodoById } from "../../../client/actions/index";
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

  describe("fetchTodoById", () => {
    it("指定したIdのtodoの取得が完了したらFETCH_TODO_BY_ID_SUCCESSを作成する", () => {
      const path = "/api/todos/1";
      axiosMock.onGet(path).reply(200, {
        todo: todo
      });

      const expectedActions = [
        { type: actionTypes.REQUEST_START },
        {
          type: actionTypes.FETCH_TODO_BY_ID_SUCCESS,
          todo: { todo }
        }
      ];

      const store = mockStore();

      store.dispatch(fetchTodoById(todo.id)).then(() => {
        const result = store.getActions();

        expect(result).toEqual(expectedActions);
      });
    });
  });
});
