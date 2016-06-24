import React, {Component} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {connect} from 'react-redux';
import {createSearchAction, addChannel} from '../../actions/discover';
import {addFeedChannel, removeFeedChannel} from '../../actions/feed';
import {Grid, GridCell, Loader, Icon, EmptyState} from '../ui';
import Channel from './discover-channel';
import Input from './discover-input';
import cn from 'classnames';
import styles from './discover.scss';

const SEARCH_DEBOUNCE = 300;

export class DiscoverContainer extends Component {
  state = {
    searchQuery: null,
    source: null,
    url: null,
  }

  constructor(...args) {
    super(...args);
    this._searchAction = createSearchAction(SEARCH_DEBOUNCE);
  }

  render() {
    return <div className={styles.discover}>

      <Input
        onSearch={this._search}
        onAdd={this._add}
        onSubmit={this._submit} />

      <div className={styles.discoverContent}>

        {this._renderGetStarted()}
        {this._renderLoader()}
        {this._renderFoundChannels()}

      </div>

    </div>;
  }

  _renderGetStarted() {
    if (this.state.searchQuery || this.props.channels.length || this.props.isLoading) {
      return null;
    }

    return <EmptyState
      glyph="search"
      primaryText="Type a genre or whatever you want"
      secondaryText="or, you can hunt with this awesome tags" />;
  }

  _renderLoader() {
    if (!this.props.isLoading) {
      return null;
    }

    return <Loader size={40} className={styles.discoverLoader} />;
  }

  _renderFoundChannels() {
    const {channels, isLoading, feedChannelsIds} = this.props;

    return <Grid className={cn(styles.discoverChannels, {
      [styles.discoverChannelsLoading]: isLoading,
    })}>
      {channels.map((channel) => (
        <GridCell key={channel.id} small="1of2" medium="1of3" large="1of4">
          <Channel
            {...channel}
            isFeedChannel={feedChannelsIds.indexOf(channel.id) !== -1}
            onToggle={this._toggleChannel} />
        </GridCell>
      ))}
    </Grid>;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  _search = (searchQuery) => {
    this.props.dispatch(this._searchAction(searchQuery));
    this.setState({source: null, url: null, searchQuery});
  }

  _add = (source, url) => {
    this.setState({source, url});
  }

  _toggleChannel = (channel) => {
    this.props.dispatch(
      this.props.feedChannelsIds.indexOf(channel.id) === -1
        ? addFeedChannel(channel)
        : removeFeedChannel(channel.id)
    );
  }

  _submit = () => {
    this.props.dispatch(addChannel(this.state.url));
  }

}

export function mapToProps(state) {
  return {
    ...state.discover,
    feedChannelsIds: state.feed.channels.map(ch => ch.id),
  };
}

export default connect(mapToProps)(DiscoverContainer);
