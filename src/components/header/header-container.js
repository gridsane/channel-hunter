import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectNextTrack, refetchTrackOrError} from '../../actions/feed';
import {getTrackById} from '../../reducers/feed';
import Navigation from './header-navigation';
import Player from './header-player';
import HeaderCover from './header-cover';
import styles from './header.scss';

const routeMap = {
  '/app/discover': 'Discover',
};

export class Header extends Component {
  state = {
    isPlaying: false,
  };

  render() {
    const {isPlaying} = this.state;
    const {currentTrack} = this.props;

    return <header className={styles.header}>
      <Navigation />
      {currentTrack
        ? <Player
            isPlaying={isPlaying}
            track={currentTrack}
            onTogglePlay={this._togglePlaying}
            onError={this._trackError}
            onNext={this._nextTrack} />
        : null}
      <HeaderCover url={currentTrack ? currentTrack.cover : null} />
    </header>;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentTrack === null && nextProps.currentTrack !== null) {
      this.setState({isPlaying: true});
    }
  }

  _getPageTitle() {
    return routeMap[this.props.route]
      ? routeMap[this.props.route]
      : null;
  }

  _nextTrack = () => {
    this.props.dispatch(selectNextTrack());
  }

  _togglePlaying = () => {
    this.setState({isPlaying: !this.state.isPlaying});
  }

  _trackError = (/*error*/) => {
    // error is inconsistent object, skip for now
    const {currentTrack, dispatch} = this.props;
    dispatch(refetchTrackOrError(currentTrack, 'error'));
  }
}

export function mapToProps(state) {
  return {
    currentTrack: getTrackById(state.feed, state.feed.currentTrackId),
  };
}

export default connect(mapToProps)(Header);
