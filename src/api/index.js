import store from '../store';
import * as fake from './fake';
import github from './github';

const apis = {
  fake,
  github,
};

export default () => store.state.api ? apis[store.state.api] : {};
