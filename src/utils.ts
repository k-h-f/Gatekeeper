import { Client, TextChannel } from 'discord.js';

/**
 * This util function will send a message to the error text channel on the Gatekeepers Discord channel
 * @param client Discord Client
 * @param message This message to send
 */
export const logError = (client: Client, message: string) => {
  const errorTextChannel = client.channels.cache.get(
    '1010315886177046578'
  ) as TextChannel;
  errorTextChannel.send(message);
};
