import superagent from 'superagent';

export default class YoutubeAPI {

  constructor(key) {
    this.key = key;
  }

  async getChannelByUrl(url) {

    const urlParts = url.split('/');
    const [kind, channelId] = urlParts.slice(Math.max(urlParts.length - 2, 1));
    const params = kind === 'channel' ? {id: channelId} : {forUsername: channelId};

    const response = await this._request('channels', {
      part: 'snippet',
      ...params,
    });

    if (!response.items || response.items.length === 0) {
      return null;
    }

    return this._convertChannel(response.items[0]);

  }

  async getTracks(channelId, maxResults = 50) {

    const snippetResponse = await this._request('search', {
      part: 'snippet',
      type: 'video',
      channelId,
      maxResults,
    });

    if (!snippetResponse.items || snippetResponse.items.length === 0) {
      return [];
    }

    const ids = snippetResponse.items.map((track) => {
      return track.id.videoId;
    });

    const detailsResponse = await this._request('videos', {
      part: 'contentDetails',
      id: ids.join(','),
      maxResults: snippetResponse.items.length,
    });

    return snippetResponse.items.map((snippetItem, index) => {
      return this._convertTrack(snippetItem, detailsResponse.items[index]);
    });
  }

  hasChannel(url) {
    return /^https?:\/\/(www\.)?youtube.com\/(channel|user)/.test(url);
  }

  _request(resource, params) {
    return new Promise((resolve, reject) => {
      superagent
        .get('https://www.googleapis.com/youtube/v3/' + resource)
        .query({key: this.key})
        .query(params)
        .end((err, res) => {
          if (err) {
            reject(err);
          }

          resolve(res.body);
        });
    });
  }

  _convertChannel(res) {
    return {
      source: 'youtube',
      id: 'youtube-' + res.id,
      originalId: res.id,
      name: res.snippet.title,
      description: res.snippet.description,
      image: res.snippet.thumbnails.medium.url,
      createdAt: res.snippet.publishedAt,
    };
  }

  _convertTrack(snippetRes, detailsRes) {
    const titleArr = snippetRes.snippet.title.split('-');
    const artistOrTitle = titleArr[0].trim();
    const title = titleArr.splice(1).join('-').trim();

    return {
      source: 'youtube',
      id: 'youtube-' + snippetRes.id.videoId,
      originalId: snippetRes.id.videoId,
      date: (new Date(snippetRes.snippet.publishedAt)).getTime(),
      artist: title ? artistOrTitle : null,
      title: title ? title : artistOrTitle,
      url: `https://www.youtube.com/watch?v=${snippetRes.id.videoId}`,
      duration: this._durationToSeconds(detailsRes.contentDetails.duration),
      channelId: 'youtube-' + snippetRes.snippet.channelId,
      cover: snippetRes.snippet.thumbnails.high.url,
    };
  }

  _durationToSeconds(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = (parseInt(match[1]) || 0);
    const minutes = (parseInt(match[2]) || 0);
    const seconds = (parseInt(match[3]) || 0);

    return hours * 3600 + minutes * 60 + seconds;
  }

}
