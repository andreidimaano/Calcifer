import { Message, MessageEmbed } from "discord.js";
import { getUserMinutes } from "../../database/resolvers/GuildResolver";
import { UserDoc } from "../../types";
import { minutesToHours } from "../productivity/productivity";

export let allTime = async (message: Message): Promise<void> => {
  let users = await getUserMinutes(message.guild!.id);
  await message.channel.send({ embeds: [allTimeEmbed(users!)] });
};

export let startEmbed = (time: number) => {
  return new MessageEmbed()
    .setColor("#dc2f02")
    .setTitle("Pomodoro")
    .setTimestamp(Date.now())
    .addFields({
      name: `:tomato: Your timer is set to ${time} minutes :tomato:`,
      value: ":blush: Happy Working! :blush:",
    });
};

let allTimeEmbed = (users: UserDoc[]) => {
  let rank = "";
  let minutes = "";
  for (let i = 0; i < users.length; i++) {
    let n = (i + 1).toString();
    if (i == 0) {
      n = ":first_place:";
    } else if (i == 1) {
      n = ":second_place:";
    } else if (i == 2) {
      n = ":third_place:";
    }

    rank += `${i > 2 ? n + "." : n} ${users[i].discordTag} \n`;

    let time = minutesToHours(users[i].minutesStudied);
    minutes += `${time} \n`;
  }
  console.log(rank);
  return new MessageEmbed()
    .setColor("#dc2f02")
    .setTitle("All Time Leaderboard")
    .setTimestamp(Date.now())
    .addFields(
      { name: "Rankings", value: rank, inline: true },
      { name: "Total Pomodoro Time", value: minutes, inline: true }
    );
};
