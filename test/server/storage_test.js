import mongo from 'mongodb';
import Storage from '../../src/server/storage';
import {MONGO_URI_TEST} from '../../src/config.js';

describe('Storage @database', () => {
  const storage = new Storage(MONGO_URI_TEST);

  beforeEach((done) => {
    mongo.connect(MONGO_URI_TEST, (err, db) => {
      db.collection('channels').deleteMany({}, done);
    });
  });

  it('adds channel and gets channels', async () => {
    const inputChannel = {
      source: 'vk',
      id: 'vk-10',
      originalId: '10',
      name: 'test channel name',
      image: 'path/to/image',
    };

    const outputChannel = await storage.addOrUpdateChannel(inputChannel);

    expect(outputChannel).toEqual(inputChannel);

    const channels = await storage.getChannels();
    expect(channels.length).toBe(1);
    expect(channels[0]).toEqual(inputChannel);
  });

  it('updates channel by source and originalId pair', async () => {
    await storage.addOrUpdateChannel({
      source: 'vk',
      id: 'vk-10',
      originalId: '10',
      name: 'foo',
    });
    await storage.addOrUpdateChannel({
      source: 'youtube',
      id: 'youtube-10',
      originalId: '10',
      name: 'bar',
    });

    const firstChannels = await storage.getChannels();
    expect(firstChannels.length).toBe(2);

    await storage.addOrUpdateChannel({
      source: 'vk',
      id: 'vk-10',
      originalId: '10',
      name: 'baz',
    });

    const secondChannels = await storage.getChannels();

    const vkChannel = secondChannels.find((c) => c.source == 'vk');
    const youtubeChannel = secondChannels.find((c) => c.source == 'youtube');

    expect(vkChannel.name).toBe('baz');
    expect(youtubeChannel.name).toBe('bar');
  });

  it('inserts channels', async () => {
    await storage.addOrUpdateChannel({source: 'vk', id: 'vk-10', originalId: '10'});
    await storage.addOrUpdateChannel({source: 'vk', id: 'vk-20', originalId: '20'});
    await storage.addOrUpdateChannel({source: 'youtube', id: 'youtube-10', originalId: '10'});

    const channels = await storage.getChannels();
    expect(channels.length).toBe(3);
  });

  it('searches channels', async () => {
    await storage.addOrUpdateChannel({
      source: 'vk',
      id: 'vk-10',
      originalId: '10',
      name: 'stOnEr rock',
      description: 'Lorem ipsum',
    });

    await storage.addOrUpdateChannel({
      source: 'vk',
      id: 'vk-20',
      originalId: '20',
      name: 'Channel fuzz',
      description: 'Best stoner channel ever',
    });

    const fuzzResult = await storage.searchChannels('fuzz');
    expect(fuzzResult.length).toBe(1);
    expect(fuzzResult[0].id).toBe('vk-20');

    const stonerResult = await storage.searchChannels('stoner');
    expect(stonerResult.length).toBe(2);
    expect(stonerResult[0].id).toBe('vk-10');
    expect(stonerResult[1].id).toBe('vk-20');
  });

  it('returns tags', async () => {
    await storage.addOrUpdateChannel({
      id: '10',
      tags: ['foo', 'bar'],
    });

    await storage.addOrUpdateChannel({
      id: '20',
      tags: ['foo', 'baz'],
    });

    const tagsMin1 = await storage.getChannelsTags(1);
    expect(tagsMin1).toEqual({foo: 2, bar: 1, baz: 1});

    const tagsMin2 = await storage.getChannelsTags(2);
    expect(tagsMin2).toEqual({foo: 2});
  });

});
