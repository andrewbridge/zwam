import store from '../store';
import * as fake from './fake';
import github from './github';

const { state: { api } } = store;

const apis = {
  fake,
  github,
};

const apiModule = apis[api];

export default apiModule;
