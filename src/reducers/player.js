import {
  PLAYER_TRACK,
  PLAYER_TOGGLE_PLAYING,
  PLAYER_TOGGLE_LOADING,
} from '../actions/actionsTypes';

let initialState = {
  track: null,
  position: 0,
  isPlaying: false,
  isLoading: false,
};

export default function player(state = initialState, action) {
  switch(action.type) {
    case PLAYER_TRACK:
      return Object.assign({}, state, {
        track: action.track,
        position: 0,
      });
    case PLAYER_TOGGLE_PLAYING:
      return Object.assign({}, state, {isPlaying: action.isPlaying});
    case PLAYER_TOGGLE_LOADING:
      return Object.assign({}, state, {isLoading: action.isLoading});
    default:
      return state;
  }
}
