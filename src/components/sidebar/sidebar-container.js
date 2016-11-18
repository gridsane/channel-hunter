import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {
  setChannelEnabled,
  refreshFeedChannels,
} from '../../actions/feed';
import ChannelList from '../channel-list/channel-list';
import styles from './sidebar.scss';

export class Sidebar extends Component {
  render() {
    const {channels, isChannelsLoading} = this.props;

    return <aside className={styles.root}>
      <ChannelList
        className={styles.channelList}
        list={channels}
        isRefreshing={isChannelsLoading}
        onToggle={this._toggleChannel}
        onRefresh={this._refreshChannels}
        onGotoDiscover={this._gotoDiscover} />
    </aside>;
  }

  _toggleChannel = (channel) => {
    this.props.dispatch(setChannelEnabled(channel, !channel.isEnabled));
  }

  _refreshChannels = () => {
    this.props.dispatch(refreshFeedChannels(this.props.channels));
  }

  _gotoDiscover = () => {
    this.props.dispatch(push('/app/discover'));
  }
}

export function mapToProps(state) {
  return {
    channels: state.feed.channels,
    isChannelsLoading: state.feed.isChannelsLoading,
  };
}

export default connect(mapToProps)(Sidebar);
