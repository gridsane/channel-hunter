import * as types from './actionsTypes';

export function addTracks(tracks) {
  return {type: types.TRACKS_ITEMS_ADD, tracks};
}

export function togglePlaying(isPlaying) {
  return {type: types.TRACKS_TOGGLE_PLAYING, isPlaying};
}

export function setTracksLoading(isLoading) {
  return {type: types.TRACKS_TOGGLE_LOADING, isLoading};
}

export function setTracksSort(attr, dir) {
  return {type: types.TRACKS_SORT, attr, dir};
}

export function selectTrack(track) {
  return {type: types.TRACKS_SELECT, track};
}
