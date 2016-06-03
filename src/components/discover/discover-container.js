import React, {Component} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {connect} from 'react-redux';
import {createSearchAction} from '../../actions/discover';
import {Loader} from '../ui';
import Channel from './discover-channel';
import Input from './discover-input';
import styles from './discover.scss';

const SEARCH_DEBOUNCE = 300;

export class DiscoverContainer extends Component {
  state = {
    source: null,
    url: null,
  }

  constructor(...args) {
    super(...args);
    this._searchAction = createSearchAction(SEARCH_DEBOUNCE);
  }

  render() {
    const {channels, isLoading} = this.props;
    const {source, url} = this.state;

    return <div className={styles.discover}>

      <Input
        onSearch={this._search}
        onAdd={this._add}
        onSubmit={this._submit} />

      <div className={styles.discoverContent}>

        {source && url ? `Hit Enter to add ${source} channel` : null}

        {isLoading
          ? <Loader size={40} className={styles.discoverLoading} />
          : <div className={styles.discoverChannels}>
              {channels.map((channel) => (
                <Channel key={channel.id} {...channel} />
              ))}
            </div>}

      </div>

    </div>;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  _search = (searchQuery) => {
    this.props.dispatch(this._searchAction(searchQuery));
    this.setState({source: null, url: null});
  }

  _add = (source, url) => {
    this.setState({source, url});
    console.log('add', source, url);
  }

  _submit = () => {
    console.log('submit');
  }

}

export function mapToProps(state) {
  return state.discover;
}

export default connect(mapToProps)(DiscoverContainer);
