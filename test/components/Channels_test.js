import React from 'react';
import Channels from '../../src/components/Channels';
import {ListItem} from '../../src/components/common';
import TestUtils from 'react-addons-test-utils';
import ShallowTestUtils from 'react-shallow-testutils';
import {shallowRender, renderDOM} from '../utils';

describe('Channels component', () => {

  const list = [
    {id: 1, name: 'foo', image: 'foo.jpg', tags: ['a', 'b']},
    {id: 2, name: 'bar', image: 'bar.jpg', tags: ['c', 'd']},
    {id: 3, name: 'baz', image: 'baz.jpg', tags: ['e', 'f']},
  ];

  const picked = [2, 3];

  const result = shallowRender(
    <Channels list={list} picked={picked} onToggle={() => null} />
  );

  const items = ShallowTestUtils.findAllWithType(result, ListItem);

  it('should render channels', () => {

    expect(items.length).toBe(3);

    const {primaryText, secondaryText, leftElement} = items[0].props;
    expect(primaryText).toBe('foo');
    expect(secondaryText).toBe('a, b');
    expect(leftElement.props.url).toBe('foo.jpg');

  });

  it('should mark picked channels', () => {

    expect(items[0].props.rightIcon).toBe(null);
    expect(items[1].props.rightIcon).toBe('check');
    expect(items[2].props.rightIcon).toBe('check');

  });

  it('should toggle channels', (done) => {

    const dom = renderDOM(
      <Channels list={list} picked={picked} onToggle={toggleFunc} />
    );

    TestUtils.Simulate.click(dom.children[dom.children.length - 1]);

    function toggleFunc(channel) {
      expect(channel).toEqual(list[2]);
      done();
    }

  });

});
