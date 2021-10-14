import { createStore } from "framework7/lite";

const store = createStore({
  state: {
    token: null,
    user: null
  },
  actions: {
    setUser({ state }, { user }) {
      state.user = user;
    },
    setToken({ state }, token) {
      state.token = token;
    }
  },
  getters: {
    users({ state }) {
      return state.users;
    },
    token({ state }) {
      return state.token;
    }
  }
});

// export store
export default store;
