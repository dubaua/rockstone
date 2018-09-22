/* eslint-disable no-shadow, no-console */

const state = {
  isMenuOpen: false,
  isFeedbackOpen: false,
  isProjectOpen: false,
  isPositionOpen: false,
  currentProject: 0,
  currentPosition: 0,
  isFrozen: false,
  nextAction: ""
};

const getters = {
  isOverlayed: state =>
    state.isMenuOpen ||
    state.isFeedbackOpen ||
    state.isProjectOpen ||
    state.isPositionOpen
};

const mutations = {
  setByKey(state, payload) {
    state[payload.key] = payload.value;
  },
  scheduleAction(state, payload) {
    state.nextAction = payload;
  }
};

const actions = {
  setByKey({ commit }, payload) {
    // todo accept array of objectsб and remove closeall
    commit("setByKey", payload);
  },
  toggleByKey({ state, commit }, payload) {
    commit("setByKey", { key: payload, value: !state[payload] });
  },
  closeAll({ commit }) {
    commit("setMenu", false);
    commit("setFeedback", false);
    commit("setProject", false);
    commit("setPosition", false);
  },
  scheduleAction({ state, commit, dispatch }, { next, blocking }) {
    if (state[`is${blocking}Open`]) {
      commit("scheduleAction", next);
      commit(`set${blocking}`, false);
    } else {
      dispatch(next);
    }
  },
  dispatchNext({ state, commit, dispatch }) {
    if (state.nextAction) {
      dispatch(state.nextAction);
      commit("scheduleAction", "");
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
