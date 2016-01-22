import React from 'react';
import Playlist from '../../src/components/Playlist';
import {ListItem, ListLabel} from '../../src/components/common';
import ShallowTestUtils from 'react-shallow-testutils';
import {shallowRender, render} from '../utils';

describe('Playlist component', () => {

  const list = [
    {id: '1', title: 'foo_title', artist: 'foo_artist'},
    {id: '2', title: 'bar_title', artist: 'bar_artist'},
    {id: '3', title: 'baz_title', artist: 'baz_artist'},
  ];

  const result = shallowRender(
    <Playlist list={list} selectedId={'2'} onSelect={() => null} onToggleShuffle={() => null} />
  );

  const items = ShallowTestUtils.findAllWithType(result, ListItem);

  it('renders tracks', () => {

    expect(items.length).toBe(3);
    const primaryText = render(items[0].props.primaryText).textContent;
    expect(primaryText).toContain('foo_title by foo_artist');

  });

  it('marks current track', () => {

    expect(items[0].props.leftElement).toBe(null);
    expect(items[1].props.leftElement).toNotBe(null);

  });

  it('selects track', () => {

    const select = expect.createSpy();
    const result = shallowRender(
      <Playlist list={list} selectedId={'2'} onSelect={select} onToggleShuffle={() => null} />
    );
    const items = ShallowTestUtils.findAllWithType(result, ListItem);

    items[2].props.onClick();

    expect(select.calls[0].arguments).toEqual(['3']);

  });

  it('calls onToggleShuffle callback', () => {

    const toggleShuffle = expect.createSpy();
    const result = shallowRender(
      <Playlist list={list} selectedId={'2'} onSelect={() => null} onToggleShuffle={toggleShuffle} />
    );

    const label = ShallowTestUtils.findAllWithType(result, ListLabel);
    label[0].props.rightElement.props.onClick();

    expect(toggleShuffle.calls[0].arguments).toEqual([]);

  });

  it('shows error on track', () => {

    const list = [
      {id: '1', title: 'foo_title', artist: 'foo_artist', error: null},
      {id: '2', title: 'bar_title', artist: 'bar_artist', error: 'Error message'},
      {id: '3', title: 'baz_title', artist: 'baz_artist'},
    ];

    const result = shallowRender(
      <Playlist list={list} selectedId={'1'} onSelect={() => null} />
    );

    const items = ShallowTestUtils.findAllWithType(result, ListItem);

    expect(items[0].props.leftElement).toNotBe(null);
    expect(items[0].props.leftElement.props.children).toBe('error');
    expect(items[1].props.leftElement).toNotBe(null);
    expect(items[1].props.leftElement.props.children).toBe('error');
    expect(items[2].props.leftElement).toBe(null);

  });

});
