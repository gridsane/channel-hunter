import {
  PLAYER_PROGRESS,
  PLAYER_TRACK,
  PLAYER_TOGGLE_PLAYING,
  PLAYER_TOGGLE_LOADING,
} from './actionsTypes';

export function setProgress(progress) {
  return {type: PLAYER_PROGRESS, progress}
}

export function setTrack(track) {
  return {type: PLAYER_TRACK, track}
}

export function togglePlaying(isPlaying) {
  return {type: PLAYER_TOGGLE_PLAYING, isPlaying}
}

export function toggleLoading(isLoading) {
  return {type: PLAYER_TOGGLE_LOADING, isLoading}
}
