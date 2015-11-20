import superagent from 'superagent';

export default class YoutubeApi {

  constructor(key) {
    this.key = key;
  }

  async getChannelByUrl(url) {
    const username = url.split('/').splice(-1, 1)[0];
    const response = await this._request('channels', {
      part: 'snippet',
      forUsername: username,
    });

    return this._convertChannel(response.items[0]);
  }

  async getTracks(channelId, maxResults = 50) {
    const snippetResponse = await this._request('search', {
      part: 'snippet',
      type: 'video',
      channelId,
      maxResults,
    });

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
    return /^https?:\/\/(www\.)?youtube.com\/channel/.test(url);
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
      id: res.id,
      title: res.snippet.title,
      description: res.snippet.description,
      image: res.snippet.thumbnails.medium.url,
      createdAt: res.snippet.publishedAt,
    };
  }

  _convertTrack(snippetRes, detailsRes) {
    const titleArr = snippetRes.snippet.title.split('-');
    const artist = titleArr[0].trim();
    const title = titleArr.splice(1).join('-').trim();

    return {
      source: "youtube",
      id: snippetRes.id.videoId,
      date: (new Date(snippetRes.snippet.publishedAt)).getTime(),
      artist,
      title,
      url: null,
      duration: this._durationToSeconds(detailsRes.contentDetails.duration),
      channelId: snippetRes.snippet.channelId,
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
