import React from 'react';
import Playlist from '../../src/components/Playlist';
import {ListItem} from '../../src/components/common';
import TestUtils from 'react-addons-test-utils';
import ShallowTestUtils from 'react-shallow-testutils';
import {shallowRender, render, renderDOM} from '../utils';

describe('Playlist component', () => {

  const list = [
    {id: '1', title: 'foo_title', artist: 'foo_artist'},
    {id: '2', title: 'bar_title', artist: 'bar_artist'},
    {id: '3', title: 'baz_title', artist: 'baz_artist'},
  ];

  const result = shallowRender(
    <Playlist list={list} selectedId={'2'} onSelect={() => null} />
  );

  const items = ShallowTestUtils.findAllWithType(result, ListItem);

  it('should render tracks', () => {

    expect(items.length).toBe(3);
    const primaryText = render(items[0].props.primaryText).textContent;
    expect(primaryText).toContain('foo_title by foo_artist');

  });

  it('should mark current track', () => {

    expect(items[0].props.leftElement).toBe(null);
    expect(items[1].props.leftElement).toNotBe(null);

  });

  it('should select track', (done) => {

    const dom = renderDOM(
      <Playlist list={list} selectedId={'2'} onSelect={select} />
    );

    TestUtils.Simulate.click(dom.children[dom.children.length - 1]);

    function select(trackId) {
      expect(trackId).toEqual('3');
      done();
    }

  });

});
