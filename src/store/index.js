import route from './route';

const state = {
  repoUrl: undefined,
  api: undefined,
  author: undefined,
  repo: undefined,
};

const actions = {
  parseRepo: () => {
    let repoUrl, api, author, repo;
    try {
      repoUrl = new URL(window.location.pathname.substr(1));
      const apiMatches = repoUrl.host.match(/(bitbucket|github)/);
      const repoMatches = repoUrl.pathname.match(/\/([^\/]+?)\/([^\/]+?)(\/|$)/);
      if (apiMatches !== null && repoMatches !== null) {
        let path;
        [api] = apiMatches;
        [path, author, repo] = repoMatches;
      }
    } catch {}
    Object.assign(state, { repoUrl, api, author, repo });
  }
};

const store = {
  modules: {
    route
  },
  state,
  actions,
};

store.actions.parseRepo();

export default store;
