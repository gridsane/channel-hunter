import React from 'react';
import Channels from '../../src/components/Channels';
import {ListItem, Icon, Loader} from '../../src/components/common';
import TestUtils from 'react-addons-test-utils';
import ShallowTestUtils from 'react-shallow-testutils';
import {shallowRender, renderDOM} from '../utils';

describe('Channels component', () => {

  const list = [
    {id: 1, name: 'foo', image: 'foo.jpg', tags: ['a', 'b'], isEnabled: false, isLoading: false},
    {id: 2, name: 'bar', image: 'bar.jpg', isEnabled: true, isLoading: false},
    {id: 3, name: 'baz', image: 'baz.jpg', tags: ['e', 'f'], isEnabled: true, isLoading: true},
  ];

  const result = shallowRender(
    <Channels list={list} onToggle={() => null} />
  );

  const items = ShallowTestUtils.findAllWithType(result, ListItem);

  it('renders channels', () => {

    expect(items.length).toBe(3);

    const {primaryText, secondaryText, leftElement} = items[0].props;
    expect(primaryText).toBe('foo');
    expect(secondaryText).toBe('a, b');
    expect(leftElement.props.url).toBe('foo.jpg');

  });

  it('skips empty tags', () => {

    expect(items[1].props.secondaryText).toBe(null);

  });

  it('does not show check icon on disabled channels', () => {

     expect(items[0].props.rightElement).toBe(null);

  });

  it('shows check icon on enabled channels', () => {

    expect(items[1].props.rightElement.type).toBe(Icon);
    expect(items[1].props.rightElement.props.children).toBe('check');

  });

  it('shows loader on loading channels', () => {

    expect(items[2].props.rightElement.type).toBe(Loader);
    expect(items[2].props.rightElement.props.size).toBe(24);

  });

  it('toggles channels', (done) => {

    const dom = renderDOM(
      <Channels list={list} onToggle={toggleFunc} />
    );

    TestUtils.Simulate.click(dom.children[dom.children.length - 1]);

    function toggleFunc(channel) {
      expect(channel).toEqual(list[2]);
      done();
    }

  });

});
