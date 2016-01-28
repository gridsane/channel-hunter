import React from 'react';
import Playlist from '../../src/components/Playlist';
import {LazyList, ListLabel} from '../../src/components/common';
import ShallowTestUtils from 'react-shallow-testutils';
import {shallowRender, renderDOM} from '../utils';

describe('Playlist component', () => {

  const items = [
    {id: '1', title: 'foo_title', artist: 'foo_artist'},
    {id: '2', title: 'bar_title', artist: 'bar_artist'},
    {id: '3', title: 'baz_title', artist: 'baz_artist'},
  ];

  var result, lazyList, renderItem, renderItemDOM, selectSpy, toggleShuffleSpy;

  beforeEach(() => {
    selectSpy = expect.createSpy();
    toggleShuffleSpy = expect.createSpy();

    result = shallowRender(
      <Playlist
        list={items}
        selectedId={'2'}
        onSelect={selectSpy}
        onToggleShuffle={toggleShuffleSpy} />
    );
    lazyList = ShallowTestUtils.findWithType(result, LazyList);
    renderItem = lazyList.props.renderItem;
    renderItemDOM = (...args) => renderDOM(lazyList.props.renderItem(...args));
  });

  it('renders tracks', () => {

    expect(lazyList.props.items.length).toBe(3);
    expect(renderItemDOM(items[0]).textContent).toBe('foo_title by foo_artist');

  });

  it('marks current track', () => {

    expect(renderItem(items[0]).props.leftElement).toBe(null);
    expect(renderItem(items[1]).props.leftElement).toNotBe(null);

  });

  it('selects track', () => {

    renderItem({id: '99'}).props.onClick();
    expect(selectSpy.calls[0].arguments).toEqual(['99']);

  });

  it('shows error on track', () => {

    expect(renderItemDOM(items[0]).textContent).toNotContain('error');
    expect(renderItemDOM({...items[0], error: null}).textContent).toContain('error');
    expect(renderItemDOM({...items[0], error: 'message'}).textContent).toContain('error');

  });

  it('calls onToggleShuffle callback', () => {

    const label = ShallowTestUtils.findWithType(result, ListLabel);
    label.props.rightElement.props.onClick();

    expect(toggleShuffleSpy.calls[0].arguments).toEqual([]);

  });

  it('shows empty state', () => {

    const emptyResult = renderDOM(
      <Playlist
        list={[]}
        selectedId={null}
        onSelect={selectSpy}
        onToggleShuffle={toggleShuffleSpy} />
    );

    expect(emptyResult.textContent).toNotContain('shuffle');
    expect(emptyResult.textContent).toNotContain('0');
    expect(emptyResult.textContent).toContain('empty');

  });

});
