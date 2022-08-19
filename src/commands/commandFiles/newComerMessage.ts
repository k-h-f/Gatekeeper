import {
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
  SlashCommandBuilder,
  TextChannel
} from 'discord.js';
import { EmojiIds } from '../enums';

/**
 * This command should only be used to maintain the new comer's message. It is to assign roles for new comers
 */

const CHANNEL_ID = 'channel_id';

export const data = new SlashCommandBuilder()
  .setName('newcomermessage')
  .addStringOption((option) =>
    option
      .setName(CHANNEL_ID)
      .setDescription('Channel ID that the message will be sent to')
      .setRequired(true)
  )
  .setDescription('Will send the new comer message to a specific channel');

export const execute = async (
  interaction: ChatInputCommandInteraction,
  client: Client
) => {
  const channelId = interaction.options.getString(CHANNEL_ID);

  const channel = client.channels.cache.find(
    (channel) => channel.id === channelId
  ) as TextChannel;

  const newComerMessageEmbed = new EmbedBuilder();
  newComerMessageEmbed
    .setTitle('Welcome to the Diamond IV Gatekeepers Guild Discord server')
    .addFields({
      name: 'Assiging your role',
      value:
        'Before you can continue using our Discord server, please assign yourself the correct role by reacting to one of the emojis in this message.'
    })
    .addFields(
      { name: 'Casual', value: EmojiIds.CASUAL, inline: true },
      { name: 'Pugger', value: EmojiIds.PUGGER, inline: true }
    );

  channel.send({ embeds: [newComerMessageEmbed] }).then((embedMessage) => {
    embedMessage.react(EmojiIds.CASUAL);
    embedMessage.react(EmojiIds.PUGGER);
  });
};
