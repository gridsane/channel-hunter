import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import {colors} from '../../utils/styles';

@Radium
export default class HeaderCover extends Component {
  static propTypes = {
    url: PropTypes.string,
  };

  static defaultProps = {
    url: null,
  };

  render() {
    const styles = this.getStyles();

    return <div style={styles.container}>
        <div style={styles.cover} />
    </div>;
  }

  getStyles() {
    const {url} = this.props;

    return {
      container: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflow: 'hidden',
        zIndex: -1,
      },

      cover: {
        position: 'absolute',
        top: -12,
        right: -12,
        bottom: -12,
        left: -12,
        backgroundColor: colors.primary,
        backgroundImage: url ? `url(${url})` : 'none',
        backgroundPositionX: 'center',
        backgroundRepeatY: 'repeat',
        backgroundSize: 'cover',
        WebkitFilter: 'blur(8px)',
        animation: 'x 60s linear infinite alternate',
        animationName: coverSliding,
        opacity: .5,
        transition: 'background 2s ease-out',
      },
    };
  }
}

const coverSliding = Radium.keyframes({
  'from': {
    backgroundPositionY: '0%',
  },
  'to': {
    backgroundPositionY: '100%',
  },
});
