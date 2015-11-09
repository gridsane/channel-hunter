import {
  PLAYLIST_SELECT,
  PLAYLIST_SELECT_NEXT,
  PLAYLIST_TOGGLE_PLAYING,
  PLAYLIST_TOGGLE_LOADING,
  PLAYLIST_ITEMS_ADD,
  PLAYLIST_ITEMS_REMOVE,
} from './actionsTypes';

export function selectItem(item) {
  return {type: PLAYLIST_SELECT, item};
}

export function selectNextItem() {
  return {type: PLAYLIST_SELECT_NEXT};
}

export function addItems(items) {
  return {type: PLAYLIST_ITEMS_ADD, items};
}

export function togglePlaying(isPlaying) {
  return {type: PLAYLIST_TOGGLE_PLAYING, isPlaying};
}

export function toggleLoading(isLoading) {
  return {type: PLAYLIST_TOGGLE_LOADING, isLoading};
}

export function removeItemsByChannelId(channelId) {
  return {type: PLAYLIST_ITEMS_REMOVE, channelId};
}
