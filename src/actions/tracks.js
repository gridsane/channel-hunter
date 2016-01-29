import * as types from './actionsTypes';
import * as api from '../../src/utils/api';

export function addTracks(tracks) {
  return {type: types.TRACKS_ITEMS_ADD, tracks};
}

export function togglePlaying(isPlaying) {
  return {type: types.TRACKS_TOGGLE_PLAYING, isPlaying};
}

export function setTracksLoading(isLoading) {
  return {type: types.TRACKS_TOGGLE_LOADING, isLoading};
}

export function setTracksSort(attr = null, dir = null) {
  return {type: types.TRACKS_SORT, attr, dir};
}

export function selectTrack(track) {
  return {type: types.TRACKS_SELECT, track};
}

export function setTrackError(trackId, error = null) {
  return {type: types.TRACKS_ERROR, trackId, error};
}

export function loadTrack(track) {
  return async (dispatch) => {
    dispatch(setTracksLoading(true));
    const tracks = await api.getTrack(track);
    dispatch(addTracks(tracks));
    dispatch(setTracksLoading(false));
  };
}
