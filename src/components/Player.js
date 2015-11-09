import React, {PropTypes, Component} from 'react';
import {curried} from '../utils/common';

export default class Player extends Component {

  static propTypes = {
    src: PropTypes.string,
    paused: PropTypes.bool,
    onEnd: PropTypes.func,
    onError: PropTypes.func,
    onLoadingChange: PropTypes.func,
    onTimeUpdate: PropTypes.func,
  };

  static defaultProps = {
    src: null,
    paused: false,
    onEnd: () => null,
    onError: () => null,
    onLoadingChange: () => null,
    onTimeUpdate: () => null,
  };

  state = {
    lastSeekedPosition: 0,
  };

  render() {
    return <audio
      src={this.props.src}
      preload="none"
      ref="audio" />;
  }

  _togglePause(isPaused) {
    const audio = this.refs.audio;
    isPaused ? audio.pause() : audio.play();
  }

  componentWillReceiveProps(nextProps) {
    const {audio} = this.refs;

    if (nextProps.paused !== this.props.paused) {
      this._togglePause(nextProps.paused);
    }

    if (nextProps.position !== this.state.lastSeekedPosition) {
      audio.currentTime = nextProps.position;
      this.setState({lastSeekedPosition: nextProps.position});
    }
  }

  componentDidMount() {
    const audio = this.refs.audio;
    const {onTimeUpdate, onLoadingChange, onEnd, onError, paused, position} = this.props;
    const loadingTrueCb = curried(onLoadingChange, true);
    const loadingFalseCb = curried(onLoadingChange, false);

    audio.currentTime = position;
    this.setState({lastSeekedPosition: this.props.position});

    audio.addEventListener('loadstart', () => {
      paused ? audio.pause() : audio.play();
    });

    audio.addEventListener('timeupdate', () => onTimeUpdate(Math.round(audio.currentTime)));
    audio.addEventListener('ended', onEnd);
    audio.addEventListener('error', onError);

    [
      'seeking',
      'waiting',
    ].forEach((event) => {
      audio.addEventListener(event, loadingTrueCb);
    });

    [
      'loadeddata',
      'seeked',
      'canplay',
      'playing',
    ].forEach((event) => {
      audio.addEventListener(event, loadingFalseCb);
    });

    this._togglePause(paused);
  }
}
