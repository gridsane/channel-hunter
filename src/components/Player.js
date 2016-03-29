import React, {PropTypes, Component} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {curried} from '../utils/common';

export default class Player extends Component {

  static propTypes = {
    src: PropTypes.string,
    isPlaying: PropTypes.bool,
    onEnd: PropTypes.func,
    onError: PropTypes.func,
    onLoadingChange: PropTypes.func,
    onTimeUpdate: PropTypes.func,
  };

  static defaultProps = {
    src: null,
    isPlaying: false,
    position: 0,
    onEnd: () => null,
    onError: () => null,
    onLoadingChange: () => null,
    onTimeUpdate: () => null,
  };

  state = {
    lastSeekedPosition: 0,
    timeUpdateInterval: null,
  };

  render() {
    return <audio
      src={this.props.src}
      preload="none"
      ref="audio" />;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillReceiveProps(nextProps) {
    const {audio} = this.refs;

    if (nextProps.isPlaying !== this.props.isPlaying) {
      this._togglePlay(nextProps.isPlaying);
    }

    if (nextProps.position !== this.state.lastSeekedPosition) {
      audio.currentTime = nextProps.position;
      this.setState({lastSeekedPosition: nextProps.position});
    }
  }

  componentDidMount() {
    const audio = this.refs.audio;
    const {onLoadingChange, onEnd, onError, isPlaying, position} = this.props;
    const loadingTrueCb = curried(onLoadingChange, true);
    const loadingFalseCb = curried(onLoadingChange, false);

    audio.currentTime = position;
    this.setState({lastSeekedPosition: this.props.position});

    audio.addEventListener('loadstart', curried(::this._togglePlay, isPlaying));
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
  }

  _togglePlay(isPlaying) {
    const {audio} = this.refs;
    const {onTimeUpdate} = this.props;

    if (this.state.timeUpdateInterval && typeof window !== 'undefined') {
      window.clearInterval(this.state.timeUpdateInterval);
    }

    if (!isPlaying) {
      audio.pause();
      return;
    }

    audio.play();

    if (typeof window !== 'undefined') {
      this.setState({timeUpdateInterval: window.setInterval(() => {
        onTimeUpdate(Math.round(audio.currentTime));
      }, 1000)});
    }
  }
}
