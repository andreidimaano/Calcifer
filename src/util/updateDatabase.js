const {
  // createUser,
  // updateUser,
  // userExists,
} = require("../database/resolvers/UserResolver");

const {createUser, updateMinutes, userExists} = require("../database");

module.exports = {
  updateDatabase: async (guildId, discordId, discordTag, minutesStudied, supabase) => {
    let userData = {
      guildId: guildId,
      discordId: discordId,
      discordTag: discordTag,
    };

    // console.log('supabase: ', supabase);

    let isUser = await userExists(supabase, guildId, discordId);
    if (!isUser) {
      // console.log('no user')
      createUser(supabase, userData, minutesStudied);
    } else {
      // console.log('user')
      updateMinutes(supabase, guildId, discordId, minutesStudied);
      // updateUser(userData, minutesStudied);
    }
  },
};
