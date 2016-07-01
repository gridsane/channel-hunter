export default async function updateChannels(storage, api, log) {
  const channels = await storage.getChannels();

  await Promise.all(channels.map((channel) => {
    return api.getUpdatedChannel(channel).then((updatedChannel) => {
      log(`got updates for ${channel.name}`);
      storage.addOrUpdateChannel({
        ...updatedChannel,
        // keep previous tags
        tags: channel.tags,
      }).then(() => {
        log(`updated channel ${updatedChannel.name}`);
      });
    });
  }));
}
