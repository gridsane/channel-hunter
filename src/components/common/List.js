import React, {Component} from 'react';

export default class List extends Component {
  render() {
    return <ul>{this.props.children}</ul>
  }
}
