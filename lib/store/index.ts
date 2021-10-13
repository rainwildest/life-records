// First import createStore function from Framework7 core
import { createStore } from "framework7/lite";

// create store
const store = createStore({
  // start with the state (store data)
  state: {
    token: null,
    users: []
  },
  // actions to operate with state and for async manipulations
  actions: {
    // context object containing store state will be passed as an argument
    getUsers({ state }) {
      // fetch users from API
      // fetch("some-url")
      //   .then((res) => res.json())
      //   .then((users) => {
      //     // assign new users to store state.users
      //     state.users = users;
      //   });
    },
    setToken({ state }, { token }) {
      state.token = token;
    }
  },

  // getters to retrieve the state
  getters: {
    // context object containing store state will be passed as an argument
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
