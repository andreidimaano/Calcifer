import { Client, Collection, Intents } from "discord.js";
import mongoose from "mongoose";
import { updateDatabase } from "./command/pomodoro/Pomodoro";
import { mongoUrl, timeFactor, userWorking } from "./constants";
import { GuildModel } from "./database/models/DiscordGuild";
import { UserWorkingModel } from "./database/models/UserWorking";
import { deleteAllGroups } from "./database/resolvers/GroupPomodoroResolver";
import { createGuild, updateGuild } from "./database/resolvers/GuildResolver";
import { deleteAllCanceled } from "./database/resolvers/UserCanceledResolver";
import { deleteUsersOnBreak } from "./database/resolvers/UserOnBreakResolver";
import { deleteUserWorking } from "./database/resolvers/UserStudyingResolver";
import { onMessage } from "./invokers/MessageInvoker";
import fs from "fs";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
require("dotenv").config();

const intents = [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
  Intents.FLAGS.GUILD_INVITES,
  Intents.FLAGS.GUILD_VOICE_STATES,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
];

const client = new Client({ intents: intents });
const main = async () => {
  await mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  client.login(process.env.TESTTOKEN);
  const rest = new REST({ version: "9" }).setToken(process.env.TESTTOKEN!);

  const commands = new Map();
  const commandFiles = fs
    .readdirSync("./src/commands")
    .filter((file) => file.endsWith(".ts"));
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    commands.set(command.data.name, command);
    console.log(commands);
  }

  const clientId = "692223953581768725";
  // const guildId = "758878595262185525"

  await rest.put(Routes.applicationCommands(clientId), { body: commands });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  });

  client.on("ready", async () => {
    await client.user?.setActivity({
      type: "PLAYING",
      name: " | c: help",
    });
    console.log(`Logged in as ${client.user?.tag}!`);

    if (!(client.user?.tag === "SpongeBob#9136")) {
      await deleteAllGroups();

      let membersWorking = await UserWorkingModel.find({});

      membersWorking.forEach((user) => {
        if ((user as userWorking).guildId) {
          console.log(user);
          updateDatabase(
            (user as userWorking).guildId,
            (user as userWorking).discordId,
            (user as userWorking).discordTag,
            (user as userWorking).minutes
          );
          deleteUserWorking((user as userWorking).discordId);
        }
      });

      await deleteAllCanceled();
      await deleteUsersOnBreak();
    }
  });

  client.on("messageCreate", async (message) => {
    try {
      if (message.author.bot) return;
      console.log(message);
      await onMessage(message);
    } catch (error) {
      console.log(error);
    }
  });

  client.on("guildCreate", async (guildData) => {
    try {
      let guildExists = await GuildModel.exists({ guildId: guildData.id });
      if (!guildExists) {
        await createGuild(guildData);
      }
    } catch (error) {
      console.log(error);
    }
  });

  client.on("guildMemberRemove", async (guildMember) => {
    await updateGuild(guildMember.guild);
  });

  client.on("guildMemberAdd", async (guildMember) => {
    await updateGuild(guildMember.guild);
  });
};

main();
