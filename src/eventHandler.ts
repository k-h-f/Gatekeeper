import { Client, Guild, GuildMemberRoleManager, TextChannel } from 'discord.js';
import * as commandModules from './commands/commandFiles';
import { Emojis, Roles } from './enums';
import { logError } from './utils';

/**
 * EventHandler handles all Discord events in one place by taking a Discord client and attaches
 * listeners to specific events on the client. Each method is an particular event found from
 * this list: https://discord-ts.js.org/docs/general/events/
 * More information about events found here:
 * https://github.com/amishshah/discord.js-guide/blob/master/development/understanding-events.md
 */
class EventHandler {
  private client: Client<boolean>;
  private commands;

  /**
   * @param client Discord client instance
   */
  constructor(client: Client<boolean>) {
    this.client = client;
    this.commands = Object(commandModules);
  }

  /**
   * This method initialises all the listeners for the events that we're interested in
   * If you want to add a new event, make sure to invoke the method here
   * Otherwise, the event won't be listened to
   */
  initEvents() {
    this.ready();
    this.interactionCreate();
    this.messageReactionAdd();
    this.guildMemberAdd();
  }

  getRoles(guild: Guild) {}

  /**
   * When the client is ready, this event is triggered
   */
  ready() {
    this.client.once('ready', () => {
      console.log('READY');
    });
  }

  /**
   * When a message from a user that is a command
   */
  interactionCreate() {
    this.client.on('interactionCreate', async (interaction) => {
      if (!interaction.isCommand()) {
        return;
      }

      const role = interaction.member?.roles as GuildMemberRoleManager;
      const isAdmin = role.cache.some((role) => role.name === Roles.ADMIN);

      const { commandName } = interaction;
      isAdmin
        ? this.commands[commandName].execute(interaction, this.client)
        : interaction.reply('This command is for debugging purposes only');
    });
  }

  /**
   * When a user reacts to a message
   */
  messageReactionAdd() {
    this.client.on('messageReactionAdd', async (reaction, user) => {
      const casualRole = reaction.message.guild?.roles.cache.find(
        (role) => role.name === Roles.CASUAL
      );
      const pugRole = reaction.message.guild?.roles.cache.find(
        (role) => role.name === Roles.PUG
      );
      const guestRole = reaction.message.guild?.roles.cache.find(
        (role) => role.name === Roles.GUEST
      );

      if (!casualRole || !pugRole || !guestRole) {
        logError(
          this.client,
          'Casual, Pug and Guest roles could missing in messageReactionAdd event'
        );
        return;
      }

      const guildMember = reaction.message.guild?.members.cache.get(user.id);

      const isGuest = guildMember!.roles.cache.some(
        (role) => role.name === Roles.GUEST
      );

      if (isGuest) {
        guildMember?.roles.remove(guestRole);
      }

      switch (reaction.emoji.name) {
        case Emojis.CASUAL:
          reaction.message.guild?.members.cache
            .get(user.id)
            ?.roles.add(casualRole);
          break;
        case Emojis.PUGGER:
          reaction.message.guild?.members.cache
            .get(user.id)
            ?.roles.add(pugRole);
          break;
      }
    });
  }

  /**
   * When a user is added to the server
   */
  guildMemberAdd() {
    this.client.on('guildMemberAdd', (member) => {
      console.log('Guild added');
      const guestRole = member.guild?.roles.cache.find(
        (role) => role.name === Roles.GUEST
      );

      if (!guestRole) {
        logError(
          this.client,
          'Gatekeeper cannot assign new members with guest role'
        );
        return;
      }

      member.roles.add(guestRole);
    });
  }
}

export default EventHandler;
