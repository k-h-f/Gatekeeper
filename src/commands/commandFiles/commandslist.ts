import {
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
  SlashCommandBuilder
} from 'discord.js';
import * as commandModules from '.';

export const data = new SlashCommandBuilder()
  .setName('commandslist')
  .setDescription('Sends a DM to the user who requested the commands list');

export const execute = async (
  interaction: ChatInputCommandInteraction,
  client: Client
) => {
  const fields = Object.values(commandModules).map((module) => {
    return { name: `/${module.data.name}`, value: module.data.description };
  });

  const helpEmbed = new EmbedBuilder();
  helpEmbed
    .setTitle('Diamond IV Gatekeepers Guild Discord bot command list')
    .addFields(fields)
    .setFooter({ text: 'Bot is still in early-development' });

  interaction.user.send({ embeds: [helpEmbed] });
};
