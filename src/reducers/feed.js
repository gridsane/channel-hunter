import {
  FEED_ADD_CHANNELS,
  FEED_REMOVE_CHANNELS,
  FEED_SET_PROPS_CHANNEL,
  FEED_ADD_TRACKS,
  FEED_SET_CURRENT_TRACK,
  FEED_SELECT_NEXT_TRACK,
  FEED_SET_SORT_TRACKS,
  FEED_SET_ERROR_TRACK,
} from '../actions/actionsTypes';
import {REHYDRATE} from 'redux-persist/constants';
import update from 'react-addons-update';

const initialState = {
  id: null,
  currentTrackId: null,
  channels: [],
  tracks: [],
  tracksSort: {
    prop: 'date',
    dir: 'desc',
  },
};

const handlers = {

  [FEED_ADD_CHANNELS]: (state, action) => {
      return update(state, {
        channels: {$push: action.channels},
      });
  },

  [FEED_REMOVE_CHANNELS]: (state, action) => {
    return update(state, {
      channels: {$splice: state.channels.reduce((spliceArgs, channel, index) => {
        if (action.channelsIds.indexOf(channel.id) !== -1) {
          spliceArgs.push([index - spliceArgs.length, 1]);
        }

        return spliceArgs;
      }, [])},
    });
  },

  [FEED_SET_PROPS_CHANNEL]: (state, action) => {
    return update(state, {
      channels: {$set: state.channels.map((item) => {
        if (item.id === action.channelId) {
          item = {...item, ...action.props};
        }

        return item;
      })},
    });
  },

  [FEED_ADD_TRACKS]: (state, action) => {
    const newIds = action.tracks.map((track) => track.id);
    const tracks = state.tracks.filter((t) => -1 === newIds.indexOf(t.id));

    return update(state, {
      tracks: {$set: [...tracks, ...seedTracks(action.tracks).map((track) => {
        track.lastFetchedAt = Math.floor(Date.now() / 1000);
        return track;
      })]},
    });
  },

  [FEED_SET_CURRENT_TRACK]: (state, action) => {
    const track = getTrackById(state, action.trackId);

    return update(state, {
      currentTrackId: {$set: track ? track.id : null},
    });
  },

  [FEED_SET_SORT_TRACKS]: (state, action) => {
    return update(state, {
      tracksSort: {$set: {prop: action.prop, dir: action.dir}},
      tracks: {$apply: action.prop === '_seed' ? seedTracks : (x) => x },
    });
  },

  [FEED_SET_ERROR_TRACK]: (state, action) => {
    return update(state, {
      tracks: {$apply: (tracks) => {
        return tracks.map((track) => {
          return track.id === action.trackId
            ? {...track, error: action.error}
            : track;
        });
      }},
    });
  },

  [FEED_SELECT_NEXT_TRACK]: (state) => {
    const playlist = getSortedPlaylist(state);
    const currentTrackIndex = playlist.map(t => t.id).indexOf(state.currentTrackId);
    const nextIndex = Math.min(playlist.length - 1, currentTrackIndex + 1);
    return update(state, {
      currentTrackId: {$set: nextIndex > -1 ? playlist[nextIndex].id : null},
    });
  },

  [REHYDRATE]: (state, action) => {
    let restoredChannels = action.payload.feed.channels.map((c) => {
      return {...c, isLoading: false, isLoaded: false};
    });
    const restoredChannelsIds = restoredChannels.map(c => c.id);

    return update(state, {
      channels: {$set: state.channels.reduce((acc, channel) => {
        if (restoredChannelsIds.indexOf(channel.id) === -1) {
          acc.push(channel);
        }

        return acc;
      }, restoredChannels)},
    });
  },
};

function seedTracks(tracks) {
  return tracks.map((track) => {
    track._seed = Math.random();
    return track;
  });
}

export function getTrackById(state, trackId) {
  return state.tracks.find((t) => t.id === trackId) || null;
}

export function getSortedPlaylist(state) {
  const channelsIds = state.channels.reduce((acc, c) => c.isEnabled ? [c.id, ...acc] : acc, []);
  let playlist = state.tracks.filter((t) => channelsIds.indexOf(t.channelId) !== -1);

  const {prop, dir} = state.tracksSort;
  playlist.sort((a, b) => {
    return dir === 'asc' ? a[prop] - b[prop] : b[prop] - a[prop];
  });

  return playlist;
}

export default function feed(state = initialState, action) {
  return handlers[action.type] && handlers[action.type](state, action) || state;
}
