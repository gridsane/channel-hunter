import {combineReducers} from 'redux';
import channels from './channels';
import tracks from './tracks';

export default combineReducers({
  channels,
  tracks,
});
