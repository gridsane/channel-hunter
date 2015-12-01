import {
  CHANNELS_ADD,
  CHANNELS_REMOVE,
  CHANNELS_TOGGLE,
  CHANNELS_LOADING,
  CHANNELS_ITEM_LOADING,
} from './actionsTypes';

export function addChannel(channel) {
  return {type: CHANNELS_ADD, channel};
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

export function toggleChannelsItemLoading(channelId, isLoading) {
  return {type: CHANNELS_ITEM_LOADING, isLoading, channelId};
}
