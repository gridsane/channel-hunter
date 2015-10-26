import React, {Component} from 'react';
import {colors} from '../utils/styles';
import {FlatButton} from './common';

export default class Playlist extends Component {
  render() {
    let styles = this.getStyles();
    styles.container = Object.assign({}, styles.container, this.props.style);

    return <div style={styles.container}>
      Playlist
    </div>
  }

  getStyles() {
    return {

      container: {
      },

    }
  }
}
