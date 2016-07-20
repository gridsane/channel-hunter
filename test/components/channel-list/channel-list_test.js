import React from 'react';
import ChannelList from '../../../src/components/channel-list/channel-list';
import ChannelItem from '../../../src/components/channel-list/channel-item';
import {ListLabel} from '../../../src/components/ui';
import {findAllWithType, findWithType} from 'react-shallow-testutils';
import {shallowRender} from '../../utils';

describe('Channel list component', () => {

  it('renders channels', () => {
    const onToggle = () => null;
    const result = shallowRender(<ChannelList list={[
      {id: '1', name: 'foo', image: 'foo.jpg', isEnabled: false, isLoading: false},
      {id: '2', name: 'bar', image: 'bar.jpg', isEnabled: false, isLoading: false},
    ]} onToggle={onToggle} onRefresh={()=>null} onGotoDiscover={()=>null} />);

    const items = findAllWithType(result, ChannelItem);

    expect(items.length).toBe(2);
    expect(items[0].props.id).toBe('1');
    expect(items[0].props.onToggle).toBe(onToggle);
    expect(items[1].props.id).toBe('2');
    expect(items[1].props.onToggle).toBe(onToggle);
  });

  it('refreshes channels', () => {
    const refreshSpy = expect.createSpy();

    const result = shallowRender(<ChannelList list={[
      {id: '1', name: 'foo', image: 'foo.jpg', isEnabled: false, isLoading: false},
    ]} onToggle={()=>null} onRefresh={refreshSpy} onGotoDiscover={()=>null} />);

    const label = findWithType(result, ListLabel);
    label.props.rightElement.props.onClick();

    expect(refreshSpy.calls.length).toBe(1);
  });

});
