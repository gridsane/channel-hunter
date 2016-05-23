import React from 'react';
import Playlist from '../../../src/components/feed/feed-playlist';
import Track from '../../../src/components/feed/feed-playlist-track';
import {LazyList, ListLabel} from '../../../src/components/ui';
import {findWithType} from 'react-shallow-testutils';
import {shallowRender, renderDOM} from '../../utils';
import {Simulate} from 'react-addons-test-utils';

describe('Playlist component', () => {
  const defaultProps = {
    tracks: [
      {id: '1', title: 'foo_title', artist: 'foo_artist', duration: 65},
      {id: '2', title: 'bar_title', artist: 'bar_artist', duration: 125},
      {id: '3', title: 'baz_title', artist: null, duration: 185},
    ],
    currentTrackId: '2',
    onSelect: () => null,
    onToggleShuffle: () => null,
  };

  it('renders tracks', () => {
    const playlist = shallowRender(<Playlist {...defaultProps} />);
    const list = findWithType(playlist, LazyList);
    const track = list.props.renderItem(defaultProps.tracks[0]);

    expect(list.props.items).toEqual(defaultProps.tracks);
    expect(track.type).toBe(Track);
    expect(track.key).toBe('1');

    const currentTrack = list.props.renderItem(defaultProps.tracks[1]);
    expect(currentTrack.props.isCurrent).toBe(true);
  });

  it('selects track', () => {
    const spy = expect.createSpy();
    const playlist = shallowRender(<Playlist {...defaultProps} onSelect={spy} />);
    const list = findWithType(playlist, LazyList);
    const track = list.props.renderItem(defaultProps.tracks[2]);

    Simulate.click(renderDOM(track));

    expect(spy.calls.length).toBe(1);
    expect(spy.calls[0].arguments[0]).toBe('3');
  });

  it('calls onToggleShuffle callback', () => {
    const spy = expect.createSpy();
    const playlist = shallowRender(<Playlist {...defaultProps} onToggleShuffle={spy} />);
    const label = findWithType(playlist, ListLabel);

    label.props.rightElement.props.onClick();

    expect(spy.calls.length).toBe(1);
    expect(spy.calls[0].arguments).toEqual([]);
  });

  it('shows empty state', () => {
    const dom = renderDOM(<Playlist {...defaultProps} tracks={[]} />);

    expect(dom.textContent).toNotContain('shuffle');
    expect(dom.textContent).toNotContain('0');
    expect(dom.textContent).toContain('empty');
  });
});
