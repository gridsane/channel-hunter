export default class APIWrapper {

  constructor(apis) {
    this.apis = apis;
  }

  getChannelByUrl(url) {

    for (let source in this.apis) {
      if (this.apis[source].hasChannel(url)) {
        return this.apis[source].getChannelByUrl(url);
      }
    }

    throw new Error(`unknown channel url '${url}'`);

  }

  getTracks(source, channelId) {
    return this._getApi(source).getTracks(channelId);
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
