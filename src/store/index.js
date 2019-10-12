import route from './route';

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

const store = {
  modules: {
    route
  },
  state: {
    repoUrl,
    api,
    author,
    repo,
  }
};

export default store;
