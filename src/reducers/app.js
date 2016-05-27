import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import feed from './feed';

export default combineReducers({
  feed,
  routing: routerReducer,
});
