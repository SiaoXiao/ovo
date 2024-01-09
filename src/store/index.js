import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      selected: [],
      isOpen: false,
      count: 0,
      remove: false
    };
  },
  mutations: {
    SET_SELECTED(state, payload) {
      state.selected = [...payload]
    },
    SET_COUNT(state, payload) {
      state.count = payload
    },
    SET_ISOPEN_STATE(state, payload) {
      state.isOpen = payload
    },
    SET_REMOVE_STATE(state, payload) {
      state.remove = payload
    },
  },
  actions: {
    updateSelected({ commit }, data) {
      commit('SET_SELECTED', data)
    },
    updateCount({ commit }, num) {
      commit('SET_COUNT', num)
    },
    handleOpenDialog({ commit }, state ) {
      commit('SET_ISOPEN_STATE', state)
    },
    updateRemove({ commit }, state) {
      commit('SET_REMOVE_STATE', state)
    },
  },

  getters: {
  }
});

export default store;
