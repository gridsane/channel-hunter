import {combineReducers} from 'redux';
import player from './player';
import channels from './channels';
import tracks from './tracks';

export default combineReducers({
  player,
  channels,
  tracks
});
