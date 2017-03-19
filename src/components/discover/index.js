import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import cn from 'classnames';
import IconButton from 'components/ui/icon-button';
import Loader from 'components/ui/loader';
import Channels from 'components/channels';
import {searchChannels} from '../../actions/discover';
import {addFeedChannel} from '../../actions/feed';
import styles from './discover.scss';

class Discover extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    channels: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    const {channels, visible} = this.props;
    if (nextProps.visible && !visible && channels.length === 0) {
      this._loadChannels();
    }
  }

  render() {
    const {onClose} = this.props;

    return (
      <div className={cn(styles.root, {[styles.rootVisible]: this.props.visible})}>
        <input
          placeholder="Search or add"
          type="text"
          onChange={this._searchChannels}
          className={cn(styles.search)}/>
        <IconButton
          glyph="close"
          onClick={onClose}
          className={cn(styles.close)}/>
        <div className={styles.listWrapper}>
          {this._renderChannels()}
        </div>
      </div>
    );
  }

  _renderChannels() {
    const {isLoading, channels} = this.props;

    if (isLoading) {
      return <Loader className={styles.loader} size="l"/>;
    }

    if (channels.length === 0) {
      return <div className={styles.empty}>No channels</div>;
    }

    return <Channels
      channels={channels}
      onToggleChannel={this._selectChannel}/>;
  }

  _searchChannels = e => {
    this.props.dispatch(searchChannels(e.target.value));
  }

  _loadChannels = () => {
    this.props.dispatch(searchChannels(''));
  }

  _selectChannel = channel => {
    this.props.dispatch(addFeedChannel(channel));
  }
}

function mapStateToProps(state) {
  const {channels, isLoading} = state.discover;
  const feedChannelsIds = state.feed.channels.map(c => c.id);

  return {
    channels: channels.filter(c => !feedChannelsIds.includes(c.id)),
    isLoading,
  };
}

export default connect(mapStateToProps)(Discover);
