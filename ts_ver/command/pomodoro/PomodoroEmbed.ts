import { MessageEmbed } from "discord.js";

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

export let endEmbed = new MessageEmbed()
  .setColor("#dc2f02")
  .setTitle("Pomodoro")
  .setTimestamp()
  .addFields({
    name: `:tomato: Congrats on finishing a pomodoro session :tomato:`,
    value: ":blush: enjoy your break! :blush:",
  });
