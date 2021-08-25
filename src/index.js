// require the needed discord.js classes
require("dotenv").config();
const { Client, Intents } = require("discord.js");
const mongoose = require("mongoose");

const { setCommands } = require("./util/setCommands");
const { handleMessage } = require("./util/handleMessage");
const { canStartPomodoro, canStartGroup } = require("./util/canStart");
const { GuildModel } = require("./database/models/Guild");
const { UserWorkingModel } = require("./database/models/User");
const { deleteAllGroups } = require("./database/resolvers/GroupPomodoroResolver");
const { updateDatabase } = require("./util/updateDatabase")
const { createGuild, updateGuild } = require("./database/resolvers/GuildResolver");
const { deleteAllCanceled } = require("./database/resolvers/UserCanceledResolver");
const { deleteUsersOnBreak } = require("./database/resolvers/UserOnBreakResolver");
const { deleteUserWorking } = require("./database/resolvers/UserWorking");

const main = async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  const client = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_VOICE_STATES,
    ],
  });
  setCommands(client);
  await client.login(process.env.DISCORDTOKEN);

  client.once("ready", async () => {
    console.log("Ready!");
    await client.user.setActivity({
      type: "LISTENING",
      name: "/pomodoro",
    });

    if (!(client.user?.tag === "SpongeBob#9136")) {
      await deleteAllGroups();

      let membersWorking = await UserWorkingModel.find({});

      membersWorking.forEach((user) => {
        if (user.guildId) {
          console.log(user);
          updateDatabase(
            user.guildId,
            user.discordId,
            user.discordTag,
            user.minutes
          );
          deleteUserWorking(user.discordId);
        }
      });

      await deleteAllCanceled();
      await deleteUsersOnBreak();
    }
  });

  client.on("interactionCreate", async (interaction) => {
    try {
      if (interaction.isButton()) {
        const { customId } = interaction;
        console.log(customId);
        if (customId === "pomodoro") {
          await client.commands.get(customId).execute(interaction, {
            work: 25,
            rest: 0,
            error: { pom: "", rest: "" },
          });
        } else if (customId === "group") {
          await client.commands.get(customId).execute(interaction, {
            work: 25,
            rest: 0,
            error: { pom: "", rest: "" },
          });
        } else {
          await client.commands.get(customId).execute(interaction);
        }
      }

      if (interaction.isCommand()) {
        const { commandName } = interaction;
        if (!client.commands.has(commandName)) return;

        try {
          await client.commands.get(commandName).execute(interaction);
        } catch (error) {
          console.error(error);
          return interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
          });
        }
      }
    } catch {
      console.log(error);
    }
  });

  client.on("messageCreate", async (message) => {
    try {
      if (message.author.bot) return;
      let options = await handleMessage(message);
      if(options === null) {
        options = {};
      }
      options.message = message;
      let { command } = options;
      let interaction = null;

      if (command === "group") {
        let validGroupPomodoro = await canStartGroup(message);
        if (validGroupPomodoro) {
          if (!options.work) {
            options.work = 25;
          }
          await client.commands.get("group").execute(interaction, options);
        }
        return;
      }

      if (command === "pom" || command === "pomodoro") {
        let validPomodoro = await canStartPomodoro(message);
        if (validPomodoro) {
          if (!options.work) {
            options.work = 25;
          }
          await client.commands.get("pomodoro").execute(interaction, options);
        }
        return;
      }

      if (!client.commands.has(command)) {
        if (command === "alltime" || command === "leaderboards") {
          await client.commands
            .get("leaderboard")
            .execute(interaction, options);
          return;
        } else if (command === "cancel") {
          options.isGroup
            ? await client.commands
                .get("cancelgroup")
                .execute(interaction, options)
            : await client.commands
                .get("cancelpom")
                .execute(interaction, options);
          return;
        }
      }
      
      if(client.commands.get(command) === undefined) return;

      await client.commands.get(command).execute(interaction, options);
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
