import {combineReducers} from 'redux';
import channels from './channels';
import playlist from './playlist';

export default combineReducers({
  channels,
  playlist,
});
