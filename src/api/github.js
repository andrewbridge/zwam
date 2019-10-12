import store from '../store';

const apiRoot = 'https://api.github.com';
const { state: { author, repo }} = store;

const getIssues = () => fetch(`${apiRoot}/repos/${author}/${repo}/issues`).then(r => r.json());

export default {
  getIssues,
};
