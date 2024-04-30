const SET_LABELS = "SET_LABELS";
const SET_ACTIVE_LABEL = "SET_ACTIVE_LABEL";

const state = {
  labels: [],
  gradientColor: [],
  activeLabel: null,
};

const mutations = {
  [SET_LABELS](state, labels) {
    state.labels = labels;
    const colors = state.labels.sort(() => Math.random() - 0.5);
    state.gradientColor = colors.map((e, i) => {
      return `#${e.color} ${(100 / colors.length) * i}%`;
    });
  },
  [SET_ACTIVE_LABEL](state, label) {
    if (
      (state.activeLabel && label && label.name === state.activeLabel.name) ||
      (!state.activeLabel && !label)
    ) {
      return;
    }

    state.activeLabel = label;
  },
};

const actions = {
  setLabels: ({ commit }, ...args) => {
    commit(SET_LABELS, ...args);
  },
  updateActiveLabel: ({ commit }, ...args) => {
    commit(SET_ACTIVE_LABEL, ...args);
  },
};

const getters = {
  labels(state) {
    return state.labels;
  },
  gradientColor(state) {
    return state.gradientColor;
  },
  activeLabel(state) {
    return state.activeLabel;
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
