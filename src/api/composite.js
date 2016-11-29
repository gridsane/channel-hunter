export default class CompositeAPI {

  constructor(apis) {
    this.apis = apis;
  }

  getChannelByUrl(url) {
    const source = this.getChannelUrlSource(url);

    if (!source) {
      throw new Error(`unknown channel url '${url}'`);
    }

    return this.apis[source].getChannelByUrl(url);
  }

  getUpdatedChannel(channel) {
    return this._getApi(channel.source).getUpdatedChannel(channel);
  }

  getChannelLastUpdated(source, channelId) {
    return this._getApi(source).getChannelLastUpdated(channelId);
  }

  getChannelUrlSource(url) {
    for (let source in this.apis) {
      if (this.apis[source].hasChannel(url)) {
        return source;
      }
    }

    return null;
  }

  getTracks(source, channelId, pageData = {}) {
    return this._getApi(source).getTracks(channelId, pageData);
  }

  getTrack(track) {
    return this._getApi(track.source).getTrack(track);
  }

  _getApi(source) {
    if (typeof(this.apis[source]) === 'undefined') {
      throw new Error(`source ${source} is unknown`);
    }

    return this.apis[source];
  }

}
