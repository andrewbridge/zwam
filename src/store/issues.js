import moment from 'moment';
import getApi from '../api';

const state = {
  issues: [],
  rules: [
    {
      name: "Docs",
      rules: [
        {
          label: ['docs'],
        }
      ]
    },
    {
      name: 'To do',
      rules: [
        {
          label: ['todo', ['backlog', 'up next']],
          open: true,
          isAssigned: false,
        }
      ],
    },
    {
      name: 'In progress',
      rules: [
        {
          label: ['todo', 'in progress'],
          '!label': ['backlog'],
          open: true,
          isAssigned: true,
          hasPr: false,
        }
      ],
    },
    {
      name: 'Ready to merge',
      rules: [
        {
          title: /^(?!\[DNM]).+$/gm,
          label: ['in progress', 'ready to merge'],
          open: true,
          hasPr: true,
        }
      ]
    },
    {
      name: 'Ready for testing',
      rules: [
        {
          '!label': ['tested'],
          hasPr: true,
          open: false,
        }
      ]
    },
    {
      name: 'Done',
      rules: [
        {
          issues: ['tested'],
          open: false,
          closedWithin: '3 days',
        }
      ]
    }
  ],
};

const getters = {
  lanes() {
    return state.rules
      .map(({name, rules}) => state.issues
        .reduce((acc, issue) => {
          if (!rules.some(rule => {
            if ('label' in rule &&
              !rule.label.some(labels => {
                if (Array.isArray(labels)) {
                  return labels.every(label => issue.labels.find(({ name }) => name === label));
                }
                return issue.labels.find(({ name }) => name === labels);
              })) {
              return false;
            }
            if ('!label' in rule &&
              !rule['!label'].some(labels => {
                if (Array.isArray(labels)) {
                  return !labels.every(label => issue.labels.find(({ name }) => name === label));
                }
                return issue.labels.find(({ name }) => name === labels);
              })) {
              return false;
            }
            if ('open' in rule && (issue.state === 'open') !== rule.open) {
              return false;
            }
            if ('hasPr' in rule && (issue.pull_request !== null) !== rule.hasPr) {
              return false;
            }
            if ('isAssigned' in rule && (issue.assignees.length !== 0) !== rule.isAssigned) {
              return false;
            }
            if ('closedWithin' in rule) {
              const period = rule.closedWithin.split(' ');
              const isClosedWithin = moment(issue.closed_at).isBetween(moment().subtract(...period), undefined, period[1]);
              if (!isClosedWithin) {
                return false;
              }
            }
            return true;
          })) return acc;
          acc.issues.push(issue);
          return acc;
        }, { name, issues: []})
      );
  }
};

const mutations = {
  setIssues(issues) {
    state.issues = issues;
  }
};

const actions = {
  async getIssues() {
    const { getIssues } = getApi();
    if (getIssues) {
      mutations.setIssues(await getIssues());
    }
  }
};

export {
  state,
  getters,
  mutations,
  actions,
}
