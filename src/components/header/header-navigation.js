import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import Logo from './header-logo';
import {IconButton} from '../ui';
import styles from './header.scss';

const titles = {
  '/app/discover': 'Discover',
};

class HeaderNavigation extends Component {
  render() {
    if (this._isApp()) {
      return <nav>
        <Logo className={styles.navLogo} />
      </nav>;
    }

    return <nav>
      <IconButton
        glyph="arrow_back"
        onClick={this._back}
        size={24}
        boxSize={40}
        className={styles.navBack} />
      <div className={styles.navTitle}>
        {titles[this._getRoute()] || null}
      </div>
    </nav>;
  }

  _isApp() {
    return this._getRoute() === '/app';
  }

  _getRoute() {
    return this.props.routing.locationBeforeTransitions.pathname;
  }

  _back = () => {
    this.props.dispatch(push('/app'));
  }
}

export function mapToProps(state) {
  return {
    routing: state.routing,
  };
}

export default connect(mapToProps)(HeaderNavigation);
