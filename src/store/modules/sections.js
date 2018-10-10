const state = {
  homescreen: {
    isAboveViewport: false,
    isBelowViewport: false,
    isFullyInViewport: false,
    isInViewport: false,
    animationStep: 0,
    isSwiperReady: false
  },
  whoWeAre: {
    isAboveViewport: false,
    isBelowViewport: false,
    isFullyInViewport: false,
    isInViewport: false,
    animationStep: 0,
    isSwiperReady: false
  },
  howWeWork: {
    isAboveViewport: false,
    isBelowViewport: false,
    isFullyInViewport: false,
    isInViewport: false,
    animationStep: 0,
    isSwiperReady: false
  },
  ourProjects: {
    isAboveViewport: false,
    isBelowViewport: false,
    isFullyInViewport: false,
    isInViewport: false,
    animationStep: 0,
    isSwiperReady: false,
    currentProjectIndex: 0
  },
  howToWorkWithUs: {
    isAboveViewport: false,
    isBelowViewport: false,
    isFullyInViewport: false,
    isInViewport: false,
    animationStep: 0,
    isSwiperReady: false
  },
  careers: {
    isAboveViewport: false,
    isBelowViewport: false,
    isFullyInViewport: false,
    isInViewport: false,
    animationStep: 0,
    isSwiperReady: false
  },
  contact: {
    isAboveViewport: false,
    isBelowViewport: false,
    isFullyInViewport: false,
    isInViewport: false,
    animationStep: 0,
    isSwiperReady: false
  }
};

const getters = {
  getTransitionConfig: state => (order, final, sectionKey) => ({
    isVisible:
      state[sectionKey].animationStep >= final ||
      (state[sectionKey].animationStep >= order &&
        state[sectionKey].isInViewport),
    delay: 333,
    transitionName: "soar",
    sectionKey
  })
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
  },
  swiperReady(state, payload) {
    state[payload.key].isSwiperReady = true;
  },
  setCurrentProject(state, payload) {
    state.ourProjects.currentProjectIndex = payload.index;
  },
  resetTransitions(state) {
    Object.keys(state).forEach(key => {
      state[key].animationStep = -1;
      setTimeout(() => {
        state[key].animationStep = 0;
      }, 50);
    });
  }
};

export default {
  state,
  getters,
  mutations
};
