import React from 'react';
import Channels from '../../src/components/Channels';
import {ListItem, Icon, Loader} from '../../src/components/common';
import {findAllWithType} from 'react-shallow-testutils';
import {shallowRender} from '../utils';

describe('Channels component', () => {

  const list = [
    {id: 1, name: 'foo', image: 'foo.jpg', isEnabled: false, isLoading: false},
    {id: 2, name: 'bar', image: 'bar.jpg', isEnabled: true, isLoading: false},
    {id: 3, name: 'baz', image: 'baz.jpg', isEnabled: true, isLoading: true},
  ];

  const result = shallowRender(
    <Channels list={list} onToggle={() => null} />
  );

  const items = findAllWithType(result, ListItem);

  it('renders channels', () => {

    expect(items.length).toBe(3);

    const {primaryText, leftElement} = items[0].props;
    expect(primaryText).toBe('foo');
    expect(leftElement.props.url).toBe('foo.jpg');

  });

  it('does not show check icon on disabled channels', () => {

     expect(items[0].props.rightElement).toBe(null);

  });

  it('shows check icon on enabled channels', () => {

    expect(items[1].props.rightElement.type).toBe(Icon);
    expect(items[1].props.rightElement.props.children).toBe('check');
    expect(items[2].props.rightElementHeight).toBe(24);

  });

  it('shows loader on loading channels', () => {

    expect(items[2].props.rightElement.type).toBe(Loader);
    expect(items[2].props.rightElement.props.size).toBe(24);
    expect(items[2].props.rightElementHeight).toBe(24);

  });

  it('toggles channels', () => {

    const toggle = expect.createSpy();
    const result = shallowRender(
      <Channels list={list} onToggle={toggle} />
    );
    const items = findAllWithType(result, ListItem);

    items[0].props.onClick();
    items[1].props.onClick();

    expect(toggle.calls[0].arguments).toEqual([list[0]]);
    expect(toggle.calls[1].arguments).toEqual([list[1]]);

  });

});
