const state = {
  homescreen: {
    isAboveViewport: false,
    isBelowViewport: false,
    isFullyInViewport: false,
    isInViewport: false,
    animationStep: 0
  },
  whoWeAre: {
    isAboveViewport: false,
    isBelowViewport: false,
    isFullyInViewport: false,
    isInViewport: false,
    animationStep: 0
  },
  howWeWork: {
    isAboveViewport: false,
    isBelowViewport: false,
    isFullyInViewport: false,
    isInViewport: false,
    animationStep: 0
  },
  ourProjects: {
    isAboveViewport: false,
    isBelowViewport: false,
    isFullyInViewport: false,
    isInViewport: false,
    animationStep: 0
  },
  howToWorkWithUs: {
    isAboveViewport: false,
    isBelowViewport: false,
    isFullyInViewport: false,
    isInViewport: false,
    animationStep: 0
  },
  careers: {
    isAboveViewport: false,
    isBelowViewport: false,
    isFullyInViewport: false,
    isInViewport: false,
    animationStep: 0
  },
  contact: {
    isAboveViewport: false,
    isBelowViewport: false,
    isFullyInViewport: false,
    isInViewport: false,
    animationStep: 0
  }
};

const mutations = {
  setSectionsState(state, payload) {
    Object.keys(state).forEach(key => {
      state[key] = {
        ...state[key],
        ...payload[key]
      };
    });
  },
  nextStep(state, payload) {
    state[payload.key].animationStep++;
  }
};

export default {
  state,
  mutations
};
