import mongo from 'mongodb';
import Storage from '../../src/server/storage';
import {MONGO_URI} from '../../config.js';

describe('Storage @database', () => {

  afterEach((done) => {
    mongo.connect(MONGO_URI, (err, db) => {
      db.collection('channels').deleteMany({}, done);
    });
  });

  it('adds channel and gets channels', async () => {

    const storage = new Storage(MONGO_URI);
    const channel = await storage.addOrUpdateChannel({
      source: 'testing',
      id: 'test_id',
      name: 'test channel name',
      image: 'path/to/image',
    });

    const channels = await storage.getChannels();
    expect(channels.length).toBe(1);
    expect(channel.id).toBe('test_id');
    expect(channels[0]).toEqual(channel);

  });

  it('updates channel by external id', async () => {

    const storage = new Storage(MONGO_URI);
    await storage.addOrUpdateChannel({
      name: 'foo',
      id: 'test_id',
    });

    const firstChannels = await storage.getChannels();
    expect(firstChannels.length).toBe(1);
    expect(firstChannels[0].name).toBe('foo');

    await storage.addOrUpdateChannel({
      name: 'bar',
      id: 'test_id',
    });

    const secondChannels = await storage.getChannels();
    expect(secondChannels.length).toBe(1);
    expect(secondChannels[0].name).toBe('bar');

  });

  it('inserts channels', async () => {

    const storage = new Storage(MONGO_URI);
    await storage.addOrUpdateChannel({name: 'foo', id: 'id1'});
    await storage.addOrUpdateChannel({name: 'bar', id: 'id2'});

    const channels = await storage.getChannels();
    expect(channels.length).toBe(2);

  });

});
