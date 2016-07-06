import React, {Component} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {connect} from 'react-redux';
import {createSearchAction, setChannels, addChannel, loadTags} from '../../actions/discover';
import {addFeedChannel, removeFeedChannel} from '../../actions/feed';
import {Grid, GridCell, Loader, EmptyState, FlatButton} from '../ui';
import Channel from './discover-channel';
import SearchInput from './discover-input';
import {curried} from '../../utils';
import cn from 'classnames';
import styles from './discover.scss';

const SEARCH_DEBOUNCE = 300;
const SEARCH_MINLENGTH = 3;

export class DiscoverContainer extends Component {
  state = {
    searchQuery: '',
    source: null,
    url: null,
  }

  constructor(...args) {
    super(...args);
    this._searchAction = createSearchAction(SEARCH_DEBOUNCE);
  }

  render() {
    return <div className={styles.discover}>

      <SearchInput
        value={this.state.searchQuery}
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
    if (this.props.channels.length || this.props.isLoading) {
      return null;
    }

    return <div><EmptyState
      glyph="search"
      primaryText="Type a genre or whatever you want"
      secondaryText="or paste vk.com group, youtube channel or subreddit url" />

      <div className={styles.discoverTags}>
          {this.props.tags.map((tag) => (
            <FlatButton
              key={tag}
              small primary
              onClick={curried(this._search, tag)}
              label={`#${tag}`} />
          ))}
      </div>
    </div>;
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

  componentWillMount() {
    this.props.dispatch(loadTags());
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  _search = (searchQuery) => {
    this.setState({source: null, url: null, searchQuery});

    if (searchQuery.trim().length < SEARCH_MINLENGTH) {
      this.props.dispatch(setChannels([]));
      return;
    }

    this.props.dispatch(this._searchAction(searchQuery));
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
