import {compose, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers/app';

const devTools = getWindowProp('devToolsExtension', () => x => x);
const initialState = getWindowProp('INITIAL_STATE');

const store = compose(
  applyMiddleware(thunkMiddleware),
  devTools()
)(createStore)(reducer, initialState);

export default store;

function getWindowProp(prop, defaultValue = null) {
  return typeof window === 'object' && typeof(window[prop]) !== 'undefined'
    ? window[prop]
    : defaultValue;
}
