# Gatekeeper
 Discord Bot for the World of Warcraft guild Diamond IV Gatekeepers

# Features
* Assigns new comers with the `Guest` role
* Assigns users to two different roles (Pug or Casual) depending on what reaction was made by the user

# Upcoming Features
* N/A

# Running the Application
This application is a standard NodeJS application that that uses `discord.js` module, [link](https://discord.js.org/#/) to module and you can consider this application as the actual Discord bot

## Prerequisites
* NodeJS, this application was developed using Node 16, so prefably use this version

## Starting an local environment
1. Install packages - `npm install`
2. Copy the `.env.defaults` file and rename it to `.env`. This will be your enviornment variables file
   * `DISCORD_TOKEN` - This is the bot's token that is needed in order to start. If you're using this project as a template for another bot, you can generate your new tokens for your own application using this [guide](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token)
3. Run the dev start command - `npm run dev`
4. You should see 'READY' in the console logs. This means the bot is up and running
