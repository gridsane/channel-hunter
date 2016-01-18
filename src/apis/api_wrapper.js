export default class APIWrapper {

  constructor(apis) {
    this.apis = apis;
  }

  getChannelByUrl(url) {

    const suitableKeys = Object.keys(this.apis).filter((key) => {
      return this.apis[key].hasChannel(url);
    });

    if (suitableKeys.length === 0) {
      throw new Error(`unknown channel url '${url}'`);
    }

    return this.apis[suitableKeys[0]].getChannelByUrl(url);

  }

  getTracks(source, channelId) {

    if (!this.apis.hasOwnProperty(source)) {
      throw new Error(`tracks source '${source}' is unknown`);
    }

    return this.apis[source].getTracks(channelId);

  }

}
