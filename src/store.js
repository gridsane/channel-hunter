import {compose, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers/app';
import DevTools from './devtools';

const initialState = window.INITIAL_STATE || null;

const store = compose(
  applyMiddleware(thunkMiddleware),
  DevTools.instrument()
)(createStore)(reducer, initialState);

export default store;
