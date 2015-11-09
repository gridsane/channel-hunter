import React, {Component, PropTypes} from 'react';
import {colors, shadow} from '../utils/styles';
import {List, ListItem, ListLabel, Icon} from './common';
import {curried} from '../utils/common';

export default class Playlist extends Component {

  static propTypes = {
    compact: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired,
    selectedId: PropTypes.string,
  };

  static defaultProps = {
    compact: false,
    selectedId: null,
  };

  render() {
    const styles = this.getStyles();

    return <List style={styles.container}>
      <ListLabel
        text={`${this.props.list.length} tracks`}
        icon="shuffle" />
      {this.renderTracks(styles)}
    </List>;
  }

  renderTracks(styles) {
    return this.props.list.map((track) => {
      return <ListItem
        key={track.id}
        leftElement={
          this.props.selectedId === track.id
          ? <Icon style={styles.currentIcon} size={24}>play_arrow</Icon>
          : null
        }
        leftElementHeight={24}
        primaryText={this.renderTrackName(track, styles)}
        rightIcon="more_vert"
        onClick={curried(this.props.onSelect, track.id) } />;
    });
  }

  renderTrackName(track, styles) {
    return <span>
      {track.title}
      <span style={styles.artist}>
        {` by ${track.artist}`}
      </span>
    </span>;
  }

  getStyles() {
    const {compact} = this.props;
    const marginLeft = compact ? '16px' : '336px';

    return {

      container: {
        margin: `60px 16px 64px ${marginLeft}`,
        boxShadow: shadow(20),
      },

      artist: {
        color: colors.secondaryText,
      },

      currentIcon: {
        color: colors.secondaryText,
      },

    };
  }
}
