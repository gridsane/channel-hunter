export default async function updateSchema(storage) {
  const db = await storage.getDb();
  const collection = db.collection('channels');

  try {
    await collection.dropIndex('TextIndex');
  } catch (err) {
    await db.createCollection('channels');
  }

  return collection.createIndex(
    {name: 'text', description: 'text', tags: 'text'},
    {weights: {name: 5}, name: 'TextIndex'}
  );
}
