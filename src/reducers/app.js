import {combineReducers} from 'redux';
import player from './player';
import channels from './channels';

export default combineReducers({
  player,
  channels
});
