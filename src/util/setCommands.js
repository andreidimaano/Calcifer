const { Collection } = require("discord.js");
const fs = require("fs");

module.exports = {
  setCommands: (client) => {
    client.commands = new Collection();

    const commandFiles = fs
      .readdirSync("./src/commands")
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const command = require(`../commands/${file}`);
      client.commands.set(command.data.name, command);
    }
  },
};
