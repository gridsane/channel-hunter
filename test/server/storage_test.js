import mongo from 'mongodb';
import Storage from '../../src/server/storage';
import {MONGO_URI_TEST} from '../../src/config.js';

describe('Storage @database', () => {

  afterEach((done) => {
    mongo.connect(MONGO_URI_TEST, (err, db) => {
      db.collection('channels').deleteMany({}, done);
    });
  });

  it('adds channel and gets channels', async () => {

    const storage = new Storage(MONGO_URI_TEST);
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

    const storage = new Storage(MONGO_URI_TEST);
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

    const storage = new Storage(MONGO_URI_TEST);
    await storage.addOrUpdateChannel({source: 'vk', id: 'vk-10', originalId: '10'});
    await storage.addOrUpdateChannel({source: 'vk', id: 'vk-20', originalId: '20'});
    await storage.addOrUpdateChannel({source: 'youtube', id: 'youtube-10', originalId: '10'});

    const channels = await storage.getChannels();
    expect(channels.length).toBe(3);

  });

});
