import dotenv from 'dotenv';
dotenv.config();

import './commands/deploy-commands';

// Require the necessary discord.js classes
import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { getConfig } from './config/getConfig';
import EventHandler from './eventHandler';

const DISCORD_TOKEN = getConfig().DISCORD_TOKEN;

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessageReactions
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

const eventHandler = new EventHandler(client);
eventHandler.initEvents();

// Login to Discord with your client's token
client.login(DISCORD_TOKEN).catch((error) => {
  console.log(error);
});
