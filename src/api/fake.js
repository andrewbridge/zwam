const getIssues = () => [
  {
    title: 'This is a test issue',
    author: 'andrewbridge',
    labels: ['todo'],
    assignees: [],
    state: 'open',
    pull_request: null,
    closed_at: null,
  },
  {
    title: 'Found a bug',
    author: 'andrewbridge',
    labels: ['in progress'],
    assignees: ['andrewbridge'],
    state: 'open',
    pull_request: null,
    closed_at: null,
  },
  {
    title: 'New feature',
    author: 'andrewbridge',
    labels: ['in progress'],
    assignees: ['andrewbridge'],
    state: 'open',
    pull_request: { id: 1234 },
    closed_at: null,
  },
  {
    title: 'Bugfix',
    author: 'andrewbridge',
    labels: ['ready to merge'],
    assignees: ['andrewbridge'],
    state: 'closed',
    pull_request: { id: 5678 },
    closed_at: '2019-10-06T10:00:00Z',
  },
  {
    title: 'Feature request',
    author: 'andrewbridge',
    labels: ['tested'],
    assignees: ['andrewbridge'],
    state: 'closed',
    pull_request: { id: 9101 },
    closed_at: '2019-10-10T09:00:00Z',
  }
];

export {
  getIssues,
}
