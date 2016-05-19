import React, {Component} from 'react';
import HeaderContainer from '../header/header-container';
require('./application.scss');

export default class ApplicationContainer extends Component {
  render() {
    return <main>
      <HeaderContainer />
      {this.props.children}
    </main>;
  }
}
