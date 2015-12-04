import mongo from 'mongodb';

function removeIdKey(value) {
  delete value._id;

  return value;
}

export default class Storage {

  constructor(mongoUri) {
    this.mongoUri = mongoUri;
    this.db = null;
  }

  async getChannels() {
    const db = await this._init();
    return new Promise((resolve, reject) => {
      db.collection('channels').find({}).toArray(function (err, channels) {
        if (err) {
          reject(err);
        } else {
          resolve(channels.map(removeIdKey));
        }
      });
    });
  }

  async addOrUpdateChannel(channel) {
    const db = await this._init();

    return new Promise((resolve, reject) => {
      db.collection('channels').findAndModify(
        {id: channel.id},
        [],
        {$set: channel},
        {new: true, upsert: true},
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(removeIdKey(data.value));
          }
        }
      );
    });
  }

  async _init() {
    if (this.db) {
      return this.db;
    }

    this.db = await new Promise((resolve, reject) => {
      mongo.connect(this.mongoUri, (err, db) => {
        if (err) {
          reject(err);
        } else {
          resolve(db);
        }
      });
    });

    return this.db;
  }

}
