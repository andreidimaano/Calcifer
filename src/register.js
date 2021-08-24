const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();
const fs = require("fs");

const commands = [];
const commandFiles = fs
  .readdirSync("./src2/commands")
  .filter((file) => file.endsWith(".js"));

// Place your client and guild ids here
const clientId = "781277794826715176";

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(process.env.DISCORDTOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(clientId), { body: commands });

    // await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
    //   body: commands,
    // });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
