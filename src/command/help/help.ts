import { Message, MessageEmbed } from "discord.js";

export let Help = async (message: Message) : Promise<void> => {
    await message.react('😡');
    await message.channel.send(
        `${message.author} Fine, like moving the castle isn\'t hard enough!`, 
        helpEmbed
    );
}

let helpEmbed = new MessageEmbed()
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
        { name: 'c: pomodoro [number]', value: 'start [number from 10 to 120] minute pomodoro timer'},
        { name: '\u200B', value: '\u200B' },
        { name: 'c: pom pom', value: 'start 50 minute pomodoro timer'},
        { name: '\u200B', value: '\u200B' },
        { name: 'c: pom', value: 'start 25 minute pomodoro timer'},
        { name: '\u200B', value: '\u200B' },
        { name: 'c: cancel', value: 'cancel your pomodoro timer'},
        { name: '\u200B', value: '\u200B' },
        { name: 'c: productivity', value: 'check how much you have been working'},
        { name: '\u200B', value: '\u200B' },
        { name: 'c: cook', value: 'for the memes'},
        { name: '\u200B', value: '\u200B' },
    )