import {
  CHANNELS_ADD,
  CHANNELS_REMOVE,
  CHANNELS_TOGGLE,
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
