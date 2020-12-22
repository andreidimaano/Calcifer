import { MessageEmbed } from "discord.js";

export let helpEmbed = new MessageEmbed()
    .setColor('#dc2f02')
    .setTitle('Commands')
    .setDescription('Here is the list of commands available')
    .setURL('https://github.com/andreidimaano/Calcifer')
    .setFooter('Contact Andrei Dimaano (aka shaquilleoneil)')
    .setTimestamp()
    .addFields(
        { name: 'c: help', value: 'lists commands'},
        { name: '\u200B', value: '\u200B' },
        { name: 'c: pomodoro', value: 'start 25 minute pomodoro timer'},
        { name: '\u200B', value: '\u200B' },
        { name: 'c: pomodoro [number]', value: 'start [number from 10 to 50] minute pomodoro timer'},
        { name: '\u200B', value: '\u200B' },
        { name: 'c: cook', value: 'for the memes'},
        { name: '\u200B', value: '\u200B' },
    )