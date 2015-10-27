import {
  TRACKS_ADD,
  TRACKS_REMOVE,
} from './actionsTypes';

export function addTracks(tracks) {
  return {type: TRACKS_ADD, tracks}
}

export function removeTracksByChannelId(channelId) {
  return {type: TRACKS_REMOVE, channelId}
}
