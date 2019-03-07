import axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";

import { fetchTodos } from "../../../client/actions/index";
import * as actionTypes from "../../../client/actions/actionTypes";

const axiosMock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("actions", () => {
  afterEach(() => {
    axiosMock.reset();
  });

  describe("fetchTodos", () => {
    it("todosの取得が完了したらFETCH_TODOS_SUCCESSを作成する", () => {
      const path = "/api/todos";
      axiosMock.onGet(path).reply(200, {
        todos: ["do something"]
      });

      const expectedActions = [
        { type: actionTypes.FETCH_TODOS_START },
        {
          type: actionTypes.FETCH_TODOS_SUCCESS,
          todos: { todos: ["do something"] }
        }
      ];

      const store = mockStore({ todos: [] });

      store.dispatch(fetchTodos(path)).then(() => {
        const result = store.getActions();

        expect(result).toEqual(expectedActions);
      });
    });
  });
});
