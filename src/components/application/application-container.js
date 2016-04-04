import React, {Component} from 'react';
import HeaderContainer from '../header/header-container';

export default class ApplicationContainer extends Component {
  render() {
    return <main>
      <HeaderContainer />
      {this.props.children}
    </main>;
  }
}
