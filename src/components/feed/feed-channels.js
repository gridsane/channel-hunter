import React, {Component, PropTypes} from 'react';
import Channel from './feed-channels-item';
import {List, ListLabel, IconButton, Loader} from '../ui';
import cn from 'classnames';
import styles from './feed.scss';

export default class FeedChannels extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    isRefreshing: PropTypes.bool,
    onToggle: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
  }

  state = {
    isRefreshing: false,
  }

  render() {
    const {className, list, onToggle} = this.props;

    return <div className={cn(styles.channels, className)}>
      <ListLabel
        text={`${list.length} channel${list.length !== 1 ? 's' : ''}`}
        rightElement={this._renderRefresh()}/>
      <List>
        {list.map((channel) => {
          return <Channel
            isEnabled={false}
            {...channel}
            key={channel.id}
            onToggle={onToggle} />;
        })}
      </List>
    </div>;
  }

  _renderRefresh() {
    const {isRefreshing, onRefresh} = this.props;

    if (isRefreshing) {
      return <Loader size={24} boxSize={24} multicolor={false} className={styles.channelsRefreshLoader} />;
    }

    return <IconButton
      glyph="refresh"
      onClick={onRefresh}
      size={24}
      boxSize={24}
      className={styles.channelsRefresh} />;
  }
}
