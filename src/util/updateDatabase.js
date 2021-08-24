const {
  createUser,
  updateUser,
  userExists,
} = require("../database/resolvers/UserResolver");

module.exports = {
  updateDatabase: async (guildId, discordId, discordTag, minutesStudied) => {
    let userData = {
      guildId: guildId,
      discordId: discordId,
      discordTag: discordTag,
    };

    let isUser = await userExists(userData);
    if (!isUser) {
      createUser(userData, minutesStudied);
    } else {
      updateUser(userData, minutesStudied);
    }
  },
};
