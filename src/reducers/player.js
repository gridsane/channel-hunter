import {
  PLAYER_PROGRESS,
  PLAYER_TRACK,
  PLAYER_TOGGLE_PLAYING,
  PLAYER_TOGGLE_LOADING,
} from '../actions/actionsTypes';

let initialState = {
  track: null,
  progress: 0,
  isPlaying: false,
  isLoading: false,
};

export default function player(state = initialState, action) {
  switch(action.type) {
    case PLAYER_PROGRESS:
      return Object.assign({}, state, {progress: action.progress});
    case PLAYER_TRACK:
      return Object.assign({}, state, {
        track: action.track,
        progress: 0,
      });
    case PLAYER_TOGGLE_PLAYING:
      return Object.assign({}, state, {isPlaying: action.isPlaying});
    case PLAYER_TOGGLE_LOADING:
      return Object.assign({}, state, {isLoading: action.isLoading});
    default:
      return state;
  }
}
