require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
const mongoose = require("mongoose");
const { GuildModel } = require("./database/models/Guild");
const { UserSchema } = require("./database/models/User");

const main = async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  const supabaseUrl = "https://sgdnfnoervqwhowpfjif.supabase.co";
  const supabaseKey = process.env.SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  return;
};

// create user
const createUser = async (supabase, userData, minutesStudied) => {
  let { data, error } = await supabase
  .from('Users')
  .insert([
    { minutesStudied, ...userData }
  ])

  if (!error) {
    console.log("inserted user data:", data[0]);
  } else {
    console.log("error creating user:", error);
  }
}

// create guild
const createGuild = async (supabase, guildData) => {
  let { data, error } = await supabase
    .from('Guilds')
    .insert([
      { ...guildData }
    ])

  if (!error) {
    console.log("inserted guild data:", data[0]);
  } else {
    console.log("error creating guild:", error);
  }
}

// read user minutes
const readUserMinutes = async (supabase, guildId, discordId) => {
  let {data, error} = await supabase
  .from("Users")
  .select("minutesStudied")
  .match({ guildId, discordId});

  if (!error) {
    // console.log("user minutes data:", data[0].minutesStudied);
    return (data[0].minutesStudied);
  } else {
    console.log("error fetching user minutes Data: ", error);
  }
  

  return error;
}

// read user
const userExists = async (supabase, guildId, discordId) => {
  if(supabase){
    let {data, error} = await supabase
    .from("Users")
    .select()
    .match({ guildId, discordId});

    if(!error) {
      if(data.length) {
        return true;
      }
    } else {
      console.log("error fetching user: ", error);
    }
  }

  return false;
}

// read top 10
const readLeaderboard = async (supabase, guildId) => {
  let { data, error } = await supabase
    .from('Users')
    .select()
    .match({guildId})
    .order('minutesStudied', {ascending: false})
    .range(0, 9)

  if(!error) {
    // console.log('data', data)
    return data
  } else {
    console.log('error:', error)
  }

  return null;
}


// update user minutes
const updateMinutes = async (supabase, guildId, discordId, minutes) => {
  let minutesStudied = await readUserMinutes(supabase, guildId,  discordId);
  let newMinutesStudied = minutesStudied + minutes;

  let { data, error } = await supabase
    .from('Users')
    .update({ minutesStudied: newMinutesStudied })
    .match({ guildId: guildId, discordId: discordId });

  if (!error) {
    console.log("updated user data:", data);
  } else {
    console.log("error:", error);
  }
};

// update user

// update guild member count
const updateGuildMemberCount = async (supabase, guildId, newCount) => {
  const { data, error } = await supabase
    .from('Guilds')
    .update({ guildMemberCount: newCount })
    .match({ guildId: guildId })

    if (!error) {
      console.log("updated guild data:", data);
    } else {
      console.log("error updating guild:", error);
    }
}

// delete user minutes

// delete user
const deleteUser = async (supabase, guildId, discordId) => {
  const { data, error } = await supabase
    .from('Users')
    .delete()
    .match({ guildId: guildId, discordId: discordId })

    if (!error) {
      console.log("deleted user data:", data);
    } else {
      console.log("error deleting user:", error);
    }
}

const deleteGuild = async (supabase, guildId) => {
  const { data, error } = await supabase
    .from('Guilds')
    .delete()
    .match({ guildId: guildId })

    if (!error) {
      console.log("deleted guild data:", data);
    } else {
      console.log("error deleted guild:", error);
    } 
}


const migrateData = async (supabase) => {
  const { data, error } = await supabase
    .from("Guilds")
    .select()
    // .range(1000, 2279);

  if (error) {
    console.log("error getting data: ", error);
  } else {
    console.log("data received");
  }

  for (const guild of data) {
    let guildName = (guild.guildId + "users").toLowerCase();
    let UserModel = mongoose.model(guildName, UserSchema);

    let users = await UserModel.find().exec();

    if (users.length !== 0) {
      let i = 1;
      for (const user of users) {
        let userData = {
          guildId: guild.guildId,
          discordTag: user.discordTag,
          discordId: user.discordId,
          minutesStudied: user.minutesStudied,
        };

        console.log("user data", userData);

        let { data, error } = await supabase.from("Users").insert([userData]);

        if (!error) {
          console.log("guild", guild.guildId);
          console.log("i", i);
          i++;
        } else {
          console.log("error:", error);
        }
      }
    } else {
      console.log("users do not exist in database");
      console.log("guildid", guild.guildId);
    }
  }
};

main();

module.exports = {
  createUser,
  createGuild,
  readUserMinutes,
  readLeaderboard,
  userExists,
  updateMinutes,
  updateGuildMemberCount,
  deleteGuild,
  deleteUser
}
