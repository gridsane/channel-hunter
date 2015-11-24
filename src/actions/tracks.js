import {
  TRACKS_ITEMS_ADD,
  TRACKS_TOGGLE_PLAYING,
  TRACKS_TOGGLE_LOADING,
  TRACKS_SELECT,
} from './actionsTypes';

export function addItems(items) {
  return {type: TRACKS_ITEMS_ADD, items};
}

export function togglePlaying(isPlaying) {
  return {type: TRACKS_TOGGLE_PLAYING, isPlaying};
}

export function toggleTracksLoading(isLoading) {
  return {type: TRACKS_TOGGLE_LOADING, isLoading};
}

export function selectItem(item) {
  return {type: TRACKS_SELECT, item};
}
