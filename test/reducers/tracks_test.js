import reducer from '../../src/reducers/tracks';

const {
  addItems,
  togglePlaying,
  toggleLoading,
  selectItem,
} = require('../../src/actions/tracks');

describe('Tracks reducer', () => {

  it('adds items', () => {

    const initialState = {
      items: {},
    };

    let state = reducer(initialState, addItems([{id: 10}, {id: 20}]));
    state = reducer(state, addItems([{id: 10}, {id: 30}]));

    expect(state).to.eql({
      items: {
        10: {id: 10},
        20: {id: 20},
        30: {id: 30},
      },
    });

    expect(state).not.to.be(initialState);

  });

  it('selects item', () => {

    const initialState = {
      selected: null,
    };

    let state = reducer(initialState, selectItem(10));
    expect(state).to.eql({selected: 10});

    state = reducer(state, selectItem(20));
    expect(state).to.eql({selected: 20});

    expect(state).not.to.be(initialState);

  });

  it('toggles playing', () => {

    const initialState = {isPlaying: false};

    let state = reducer(initialState, togglePlaying(true));
    expect(state).to.eql({isPlaying: true});

    state = reducer(initialState, togglePlaying(false));
    expect(state).to.eql({isPlaying: false});

    expect(state).to.not.be(initialState);

  });

  it('toggles loading', () => {

    const initialState = {isLoading: false};

    let state = reducer(initialState, toggleLoading(true));
    expect(state).to.eql({isLoading: true});

    state = reducer(initialState, toggleLoading(false));
    expect(state).to.eql({isLoading: false});

    expect(state).to.not.be(initialState);

  });

});
