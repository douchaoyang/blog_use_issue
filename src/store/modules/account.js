const SET_GITHUB_USER = "SET_GITHUB_USER";
const SET_TOKEN_USER = "SET_TOKEN_USER";

const state = {
  // 这个不要修改
  gitHubUser: null,
  // 修改成你自己的 GitHub 账号
  gitHubUsername: "douchaoyang",
  // 记录 Issue 的仓库的全名「用户名/仓库名」
  repo: "douchaoyang/blog",
  // 博客列表每页显示多少条博客
  pageSize: 10,
};

const mutations = {
  [SET_GITHUB_USER](state, gitHubUser) {
    state.gitHubUser = gitHubUser;
  },
  [SET_TOKEN_USER](state, tokenUser) {
    state.tokenUser = tokenUser;
  },
};

const actions = {
  setGitHubUser: ({ commit }, ...args) => {
    commit(SET_GITHUB_USER, ...args);
  },
};

const getters = {
  gitHubUsername(state) {
    return state.gitHubUsername;
  },
  repo(state) {
    return state.repo;
  },
  gitHubUser(state) {
    return state.gitHubUser;
  },
  pageSize(state) {
    return state.pageSize;
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
