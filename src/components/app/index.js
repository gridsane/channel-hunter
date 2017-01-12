import React from 'react';
import {Provider} from 'react-redux';
import Sidebar from 'components/sidebar';
import Player from 'components/player';
import store from '../../store';
import styles from './app.scss';

export default class Application extends React.PureComponent {
  render() {
    return <Provider store={store}>
      <main className={styles.root}>
        <Sidebar/>
        <Player/>
      </main>
    </Provider>;
  }
}
