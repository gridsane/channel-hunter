import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import cn from 'classnames';
import Header from 'components/header';
import Channels from 'components/channels';
import Discover from 'components/discover';
import {setChannelEnabled} from '../../actions/feed';
import {setDiscoverVisible} from '../../actions/discover';
import styles from './sidebar.scss';

export class Sidebar extends React.PureComponent {
  static propTypes = {
    channels: PropTypes.array.isRequired,
    isChannelsLoading: PropTypes.bool.isRequired,
    isDiscoverVisible: PropTypes.bool.isRequired,
  }

  render() {
    const {channels, isDiscoverVisible} = this.props;

    return <aside className={cn(styles.root, {[styles.rootWithDiscover]: isDiscoverVisible})}>
      <Header
        channelsCount={channels.length}
        isDiscoverVisible={isDiscoverVisible}
        onToggleDiscover={this._toggleDiscover} />
      <Channels channels={channels} onToggleChannel={this._toggleChannel} />
      <Discover visible={isDiscoverVisible} onClose={this._toggleDiscover} />
    </aside>;
  }

  _toggleChannel = channel => {
    this.props.dispatch(setChannelEnabled(channel, !channel.isEnabled));
  }

  _toggleDiscover = () => {
    this.props.dispatch(setDiscoverVisible(!this.props.isDiscoverVisible));
  }
}

export function mapStateToProps(state) {
  return {
    channels: state.feed.channels,
    isChannelsLoading: Boolean(state.feed.isChannelsLoading),
    isDiscoverVisible: state.discover.visible,
  };
}

export default connect(mapStateToProps)(Sidebar);
