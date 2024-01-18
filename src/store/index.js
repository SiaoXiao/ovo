import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      selected: [],
      memberData: {},
      isOpen: false,
      addDialog: false,
      count: 0,
      remove: false,
      add: false
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
    SET_ISOPEN_ADD_STATE(state, payload) {
      state.addDialog = payload
    },
    SET_REMOVE_STATE(state, payload) {
      state.remove = payload
    },
    SET_ADD_STATE(state, { state: newState, data }) {
      state.add = newState;
      state.memberData = {...data}
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
    handleOpenAddDialog({ commit }, state ) {
      commit('SET_ISOPEN_ADD_STATE', state)
    },
    updateRemove({ commit }, state) {
      commit('SET_REMOVE_STATE', state)
    },
    updateAdd({ commit }, { state, data }) {
      commit('SET_ADD_STATE', { state, data })
    },
  },
});

export default store;
