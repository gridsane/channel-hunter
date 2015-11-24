import {
  CHANNELS_ADD,
  CHANNELS_REMOVE,
  CHANNELS_TOGGLE,
  CHANNELS_LOADING,
} from './actionsTypes';

export function addChannel(channel, isPicked) {
  return {type: CHANNELS_ADD, channel, isPicked};
}

export function removeChannel(channelId) {
  return {type: CHANNELS_REMOVE, channelId};
}

export function toggleChannel(channelId) {
  return {type: CHANNELS_TOGGLE, channelId};
}

export function toggleChannelsLoading(isLoading) {
  return {type: CHANNELS_LOADING, isLoading};
}
