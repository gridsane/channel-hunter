import React, {Component, PropTypes} from 'react';
import Channel from './channel-item';
import {List, ListLabel, IconButton, Loader, EmptyState, FlatButton} from '../ui';
import styles from './channel-list.scss';

export default class ChannelList extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    isRefreshing: PropTypes.bool,
    onToggle: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    onGotoDiscover: PropTypes.func.isRequired,
  }

  state = {
    isRefreshing: false,
  }

  render() {
    const {className, list} = this.props;

    return <div className={className}>
      <ListLabel
        text={`${list.length} channel${list.length !== 1 ? 's' : ''}`}
        rightElement={list.length > 0 ? this._renderRefresh() : null}/>
      {list.length === 0
        ? this._renderEmptyState()
        : this._renderList()}
    </div>;
  }

  _renderEmptyState() {
    const button = <FlatButton
      label="Let's try to discover"
      onClick={this.props.onGotoDiscover}
      primary
      small />;

    return <EmptyState
      glyph="search"
      primaryText="Oh-oh, you have no channels!"
      secondaryText={button}
      small />;
  }

  _renderList() {
    const {list, onToggle} = this.props;

    return <List>
      {list.map((channel) => {
        return <Channel
          isEnabled={false}
          {...channel}
          key={channel.id}
          onToggle={onToggle} />;
      })}
    </List>;
  }

  _renderRefresh() {
    const {isRefreshing, onRefresh} = this.props;

    if (isRefreshing) {
      return <Loader size={24} boxSize={24} multicolor={false} className={styles.refreshLoader} />;
    }

    return <IconButton
      glyph="refresh"
      onClick={onRefresh}
      size={24}
      boxSize={24}
      className={styles.refresh} />;
  }
}
