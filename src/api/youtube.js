import superagent from 'superagent';
import parseTags from '../utils/parse-tags';

export default class YoutubeAPI {

  constructor(key) {
    this.key = key;
  }

  async getChannelByUrl(url) {
    const urlParts = url.split('/');
    const [kind, channelId] = urlParts.slice(Math.max(urlParts.length - 2, 1));
    const params = kind === 'channel' ? {id: channelId} : {forUsername: channelId};
    return await getChannel(this.key, params, url);
  }

  async getUpdatedChannel(channel) {
    const [updatedChannel, videos] = await Promise.all([
      getChannel(this.key, {id: channel.originalId}),
      getVideos(this.key, channel.originalId, null, 50),
    ]);

    const tags = videos.items.reduce((acc, video) => {
      parseTags(video.snippet.description).forEach((tag) => {
        if (acc.indexOf(tag) === -1) {
          acc.push(tag);
        }
      });
      return acc;
    }, updatedChannel.tags);

    return {...updatedChannel, tags};
  }

  async getChannelLastUpdated(channelId) {
    const videos = await getVideos(this.key, channelId, null, 1);
    return videos.items.length > 0
      ? formatDate(videos.items[0].snippet.publishedAt)
      : 0;
  }

  async getTracks(channelId, pageData = {}) {
    const {nextPageToken, maxResults} = {nextPageToken: null, maxResults: 50, ...pageData};
    const videosRes = await getVideos(this.key, channelId, nextPageToken, maxResults);
    const videos = videosRes.items;

    if (!videos || videos.length === 0)  {
      return {list: [], isLastPage: true, nextPage: {}};
    }

    const detailsResponse = await apiRequest(this.key, 'videos', {
      part: 'contentDetails',
      id: videos.map(video => video.id.videoId).join(','),
      maxResults: videos.length,
    });

    return {
      list: videos.map((video, index) => convertVideo(video, detailsResponse.items[index])),
      isLastPage: !videosRes.nextPageToken,
      nextPage: {nextPageToken: videosRes.nextPageToken},
    };
  }

  async findTracks(query) {
    const snippetResponse = await apiRequest(this.key, 'search', {
      part: 'snippet',
      type: 'video',
      order: 'relevance',
      maxResults: 5,
      q: query,
    });

    if (!snippetResponse.items || snippetResponse.items.length === 0) {
      return [];
    }

    return snippetResponse.items.map(video => convertVideo(video));
  }

  hasChannel(url) {
    return /^https?:\/\/(www\.)?youtube.com\/(channel|user)\/.+/.test(url);
  }
}

async function getChannel(key, params, url = null) {
  const response = await apiRequest(key, 'channels', {
    part: 'snippet',
    ...params,
  });

  if (!response.items || response.items.length === 0) {
    return null;
  }

  return convertChannel(response.items[0], url);
}

async function getVideos(key, channelId, pageToken = null, maxResults = 50) {
  const params = {
    part: 'snippet',
    type: 'video',
    order: 'date',
    channelId,
    maxResults,
  };

  if (pageToken) {
    params.pageToken = pageToken;
  }

  const snippetResponse = await apiRequest(key, 'search', params);

  if (!snippetResponse.items || snippetResponse.items.length === 0) {
    return [];
  }

  return snippetResponse;
}

function convertChannel(res, url = null) {
  return {
    source: 'youtube',
    id: 'youtube-' + res.id,
    originalId: res.id,
    name: res.snippet.title,
    description: res.snippet.description,
    image: res.snippet.thumbnails.medium.url,
    imageLarge: res.snippet.thumbnails.high.url,
    createdAt: formatDate(res.snippet.publishedAt),
    url: url || `https://youtube.com/channel/${res.id}`,
    tags: parseTags(res.snippet.description),
  };
}

function convertVideo(snippetRes, detailsRes = null) {
  const duration = detailsRes
    ? durationToSeconds(detailsRes.contentDetails.duration)
    : null;

  return {
    source: 'youtube',
    id: 'youtube-' + snippetRes.id.videoId,
    originalId: snippetRes.id.videoId,
    date: formatDate(snippetRes.snippet.publishedAt),
    artist: null,
    title: snippetRes.snippet.title,
    url: `https://www.youtube.com/watch?v=${snippetRes.id.videoId}`,
    duration,
    channelId: 'youtube-' + snippetRes.snippet.channelId,
    cover: snippetRes.snippet.thumbnails.high.url,
  };
}

function durationToSeconds(duration) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = (parseInt(match[1], 10) || 0);
  const minutes = (parseInt(match[2], 10) || 0);
  const seconds = (parseInt(match[3], 10) || 0);

  return hours * 3600 + minutes * 60 + seconds;
}

function formatDate(date) {
  return Math.floor((new Date(date)).getTime() / 1000);
}

function apiRequest(key, resource, params) {
  return new Promise((resolve, reject) => {
    superagent
      .get('https://www.googleapis.com/youtube/v3/' + resource)
      .query({key})
      .query(params)
      .end((err, res) => {
        if (err || !res || !res.body) {
          reject(err || 'Invalid response');
        }

        resolve(res.body);
      });
  });
}
