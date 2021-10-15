import { createStore } from "framework7/lite";

const store = createStore({
  state: {
    token: null,
    user: null,
    dark: false
  },
  actions: {
    setUser({ state }, { user }) {
      state.user = user;
    },
    setToken({ state }, token) {
      state.token = token;
    },
    setDark({ state }, dark) {
      state.dark = dark;
    }
  },
  getters: {
    users({ state }) {
      return state.users;
    },
    token({ state }) {
      return state.token;
    },
    dark({ state }) {
      return state.dark;
    }
  }
});

// export store
export default store;
