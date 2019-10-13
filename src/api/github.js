import store from '../store';

const apiRoot = 'https://api.github.com';

const getIssues = () => {
  const { state: { author, repo }} = store;
  return fetch(`${apiRoot}/repos/${author}/${repo}/issues`).then(r => r.json());
};

export default {
  getIssues,
};
