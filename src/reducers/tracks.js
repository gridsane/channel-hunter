import {
  TRACKS_ITEMS_ADD,
  TRACKS_TOGGLE_PLAYING,
  TRACKS_TOGGLE_LOADING,
  TRACKS_SELECT,
  TRACKS_SORT,
  TRACKS_ERROR,
} from '../actions/actionsTypes';
import update from 'react-addons-update';

let initialState = {
  selected: null,
  isPlaying: false,
  isLoading: false,
  sort: {attr: 'date', dir: 'desc'},
  items: [],
};

export default function tracks(state = initialState, action) {
  switch(action.type) {
    case TRACKS_ITEMS_ADD:
      const ids = state.items.map((item) => item.id);
      const items = action.tracks.filter((item) => -1 === ids.indexOf(item.id));

      return update(state, {
        items: {$push: seedItems(items)},
      });

    case TRACKS_SELECT:
      return update(state, {
        isPlaying: {$set: true},
        selected: {$set: action.track},
      });

    case TRACKS_TOGGLE_PLAYING:
      return update(state, {
        isPlaying: {$set: action.isPlaying},
      });

    case TRACKS_TOGGLE_LOADING:
      return update(state, {
        isLoading: {$set: action.isLoading},
      });

    case TRACKS_SORT:
      let updateSeed = {};
      if (action.attr === '_seed') {
        updateSeed.items = {
          $set: seedItems(state.items),
        };
      }

      return update(state, {
        sort: {$set: {attr: action.attr, dir: action.dir}},
        ...updateSeed,
      });

    case TRACKS_ERROR:
      return update(state, {
        items: {$set: state.items.map((item) => {
          if (action.trackId === item.id) {
            return {...item, ...{error: action.error}};
          }

          return item;
        }),
      }});

    default:
      return state;
  }
}

function seedItems(items) {
  return items.map((item) => {
    item._seed = Math.random();
    return item;
  });
}
