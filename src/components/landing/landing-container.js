import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Landing extends Component {
  render() {
    return <div>
      <Link to="/app">app</Link>
    </div>;
  }
}
