module.exports = {
  getLabels(vue) {
    return vue.$http.get(
      `https://api.github.com/repos/${vue.$store.getters.repo}/labels`
    );
  },
  getGitHubUser(vue) {
    return vue.$http.get(
      `https://api.github.com/users/${vue.$store.getters.gitHubUsername}`
    );
  },
  getUserInfo(vue) {
    return vue.$http.all([this.getGitHubUser(vue), this.getLabels(vue)]);
  },
  getIssues(vue, data) {
    let label = "";
    if (data.label && data.label.trim().length > 0) {
      label = `+label:"${data.label}"`;
    }

    return vue.$http.get(
      `https://api.github.com/search/issues?q=${data.keyword}+state:open+repo:${vue.$store.getters.repo}${label}&sort=created&order=desc&page=${data.currentPage}&per_page=${data.pageSize}`,
      {
        headers: {
          Accept: "application/vnd.github.v3.html",
        },
      }
    );
  },
  getIssue(vue, number) {
    return vue.$http.get(
      `https://api.github.com/repos/${vue.$store.getters.repo}/issues/${number}`,
      {
        headers: {
          Accept: "application/vnd.github.v3.html",
        },
      }
    );
  },
  getComments(vue, url) {
    return vue.$http.get(url, {
      headers: {
        Accept: "application/vnd.github.v3.html",
      },
    });
  },
  getReadme(vue) {
    return vue.$http.get(
      `https://raw.githubusercontent.com/${vue.$store.getters.repo}/master/README.md`,
      {
        headers: {
          Accept: "application/vnd.github.v3.html",
        },
      }
    );
  },
};
