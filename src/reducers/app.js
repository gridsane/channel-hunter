import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import feed from './feed';
import discover from './discover';

export default combineReducers({
  feed,
  discover,
  routing: routerReducer,
});
