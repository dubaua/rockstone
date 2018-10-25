const state = {
  homescreen: {
    prev: null,
    next: "whoWeAre",
    isAboveViewport: false,
    isBelowViewport: false,
    isFullyInViewport: false,
    isInViewport: false,
    animationStep: 0,
    isSwiperReady: false
  },
  whoWeAre: {
    prev: "homescreen",
    next: "howWeWork",
    isAboveViewport: false,
    isBelowViewport: false,
    isFullyInViewport: false,
    isInViewport: false,
    animationStep: 0,
    isSwiperReady: false
  },
  howWeWork: {
    prev: "whoWeAre",
    next: "ourProjects",
    isAboveViewport: false,
    isBelowViewport: false,
    isFullyInViewport: false,
    isInViewport: false,
    animationStep: 0,
    isSwiperReady: false,
    currentSlideIndex: 0
  },
  ourProjects: {
    prev: "howWeWork",
    next: "howToWorkWithUs",
    isAboveViewport: false,
    isBelowViewport: false,
    isFullyInViewport: false,
    isInViewport: false,
    animationStep: 0,
    isSwiperReady: false,
    currentSlideIndex: 0
  },
  howToWorkWithUs: {
    prev: "ourProjects",
    next: "careers",
    isAboveViewport: false,
    isBelowViewport: false,
    isFullyInViewport: false,
    isInViewport: false,
    animationStep: 0,
    isSwiperReady: false,
    currentSlideIndex: 0
  },
  careers: {
    prev: "howToWorkWithUs",
    next: "contact",
    isAboveViewport: false,
    isBelowViewport: false,
    isFullyInViewport: false,
    isInViewport: false,
    animationStep: 0,
    isSwiperReady: false
  },
  contact: {
    prev: "careers",
    next: null,
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
  setCurrentSlideIndex(state, payload) {
    state[payload.key].currentSlideIndex = payload.index;
  },
  resetTransitions(state, payload) {
    Object.keys(state).forEach(key => {
      state[key].animationStep = payload.step;
    });
  }
};

const actions = {
  resetTransitions({ commit }) {
    commit("resetTransitions", { step: -1 });
    setTimeout(() => {
      commit("resetTransitions", { step: 0 });
    }, 50);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
