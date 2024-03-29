import { Message, MessageEmbed } from "discord.js";

export let Help = async (message: Message): Promise<void> => {
  await message.react("😡");
  await message.channel.send({
    content: `${message.author} Fine, like moving the castle isn\'t hard enough!`,
    embeds: [helpEmbed],
  });
};

let helpEmbed = new MessageEmbed()
  .setColor("#dc2f02")
  .setTitle("Commands")
  .setURL("https://github.com/andreidimaano/Calcifer")
  .setFooter("Contact Andrei Dimaano (aka shaquilleoatmeal)")
  .setTimestamp()
  .addFields(
    { name: "c: pom [number]", value: "start an x minute pomodoro timer" },
    {
      name: "c: pom [number] break [number]",
      value: "start an x minute pomodoro timer and y minute break timer",
    },
    {
      name: "c: group [number] ",
      value: "start an x minute group pomodoro timer ",
    },
    {
      name: "c: group [number] break [number]",
      value: "start group pomodoro with break",
    },
    { name: "c: cancel", value: "cancel your pomodoro timer" },
    {
      name: "c: cancel group",
      value: "cancel your group timer (must be author)",
    },
    { name: "c: productivity", value: "check your working stats!" }
  );
