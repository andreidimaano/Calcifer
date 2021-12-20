require("dotenv").config();
const mongoose = require("mongoose");
const { getPriority } = require("os");
const { GuildModel } = require("./database/models/Guild");
const { UserSchema } = require("./database/models/User");

const main = async () => {
  await mongoose.connect(
    "mongodb+srv://admin:JK1e4qWhJa6QkkoT@cluster0.tsvf2.mongodb.net/Calcifer?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  );

  queryAllGuilds();
};

const queryAllGuilds = async () => {
  let totalUsers = 0;
  await GuildModel.find({}, (err, guilds) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Guilds:", guilds.length);
      guilds.forEach(async (guild) => {
        let User = mongoose.model(
          (guild.guildId + "users").toLowerCase(),
          UserSchema
        );

        await User.count({}, (err, count) => {
          totalUsers += count;
        });
      });
    }
    console.log("total users: ", totalUsers);
  });
};

main();
