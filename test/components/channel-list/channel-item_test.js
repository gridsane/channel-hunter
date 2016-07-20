import React from 'react';
import ChannelItem from '../../../src/components/channel-list/channel-item';
import {Icon, Loader} from '../../../src/components/ui';
import {shallowRender} from '../../utils';

describe('Channel list item component', () => {
  const defaultProps = {
    id: '1',
    name: 'foo',
    image: 'foo.jpg',
    isEnabled: false,
    isLoading: false,
    onToggle: () => null,
  };

  it('renders idle channel', () => {
    const result = shallowRender(<ChannelItem {...defaultProps} />);
    expect(result.props.primaryText).toBe('foo');
    expect(result.props.rightElement).toBe(null);
  });

  it('shows check icon on enabled channels', () => {
    const result = shallowRender(<ChannelItem {...defaultProps} isEnabled />);
    expect(result.props.rightElement.type).toBe(Icon);
    expect(result.props.rightElement.props.glyph).toBe('check');
  });

  it('shows loader loading component', () => {
    const result = shallowRender(<ChannelItem {...defaultProps} isEnabled isLoading />);
    expect(result.props.rightElement.type).toBe(Loader);
  });

  it('calls onToggle when clicked', () => {
    const spy = expect.createSpy();
    const result = shallowRender(<ChannelItem {...defaultProps} onToggle={spy} />);
    result.props.onClick();
    expect(spy.calls.length).toBe(1);
    expect(spy.calls[0].arguments[0].id).toBe('1');
    expect(spy.calls[0].arguments[0].name).toBe('foo');
  });
});
