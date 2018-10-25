const state = {
  homescreen: {
    prev: null,
    next: "whoWeAre",
    isAboveViewport: false,
    isBelowViewport: false,
    isFullyInViewport: false,
    isInViewport: false,
    animationStep: 0,
    isSwiperReady: false,
    currentSlideIndex: 0
  },
  whoWeAre: {
    prev: "homescreen",
    next: "howWeWork",
    isAboveViewport: false,
    isBelowViewport: false,
    isFullyInViewport: false,
    isInViewport: false,
    animationStep: 0,
    isSwiperReady: false,
    currentSlideIndex: 0
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
    isSwiperReady: false,
    currentSlideIndex: 0
  },
  contact: {
    prev: "careers",
    next: null,
    isAboveViewport: false,
    isBelowViewport: false,
    isFullyInViewport: false,
    isInViewport: false,
    animationStep: 0,
    isSwiperReady: false,
    currentSlideIndex: 0
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
  setSwiperState(state, payload) {
    state[payload.key].isSwiperReady = payload.value;
  },
  setCurrentSlideIndex(state, payload) {
    state[payload.key].currentSlideIndex = payload.index;
  },
  resetPage(state, payload) {
    Object.keys(state).forEach(key => {
      state[key].animationStep = payload.step;
      state[key].isSwiperReady = false;
      state[key].currentSlideIndex = 0;
    });
  }
};

const actions = {
  resetPage({ commit }) {
    commit("resetPage", { step: -1 });
    setTimeout(() => {
      commit("resetPage", { step: 0 });
    }, 50);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
