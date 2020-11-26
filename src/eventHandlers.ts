import {Message, User, Guild, MessageEmbed } from 'discord.js'
import { Pomodoro } from './pomodoro/pomodoro'

interface Arguments {
    command: string;
    time?: number;
    //add other arguments later
}

let helpEmbed = new MessageEmbed()
    .setColor('#dc2f02')
    .setTitle('Commands')
    .setDescription('Here are the list of commands available')
    .setURL('https://github.com/andreidimaano/Calcifer')
    .setFooter('Contact Andrei Dimaano (aka shaquilleoneil)')
    .setTimestamp()
    .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: 'c: help', value: 'lists commands'},
        { name: '\u200B', value: '\u200B' },
        { name: 'c: pomodoro', value: 'start 25 minute pomodoro timer'},
        { name: '\u200B', value: '\u200B' },
        { name: 'c: pomodoro [number]', value: 'start [number from 10 to 50] minute pomodoro timer'},
        { name: '\u200B', value: '\u200B' },
    )


export const onMessage = async (
    message: Message, 
    clientUser: User
) : Promise<void> => {
    if (!message.guild) return;
    if(!canHandleMessage(message)) return;
    let args = parseArguments(message.content);
    try {
        await executeCommand(message, clientUser, args);
    } catch (error) {
        await message.channel.send(error.message);
    }

}

let canHandleMessage = (message: Message) : boolean => {
    return (!message.author.bot && message.content.startsWith('c: '));
}

let parseArguments = (messageContent: string) : Arguments => {
    //remove command prefix
    let content = messageContent.slice(3);
    let args = content.split(' ').map((argument) => argument.trim());
    
    let time = (args.length >= 2) ? parseInt(args[1]) : undefined;

    console.log(`args: ${args}`);
    return {
        command: args[0],
        time: time
    };
};

let executeCommand = async (message: Message, clientUser: User, args: Arguments) => {

    console.log(args);
    //(1) no discord guild exists
    if(!message.guild) return;
    //(2) pomodoro Command
    if(args.command == "pomodoro") {
        await Pomodoro(message, args.time);
    }

    //(3) cook Command for the memes
    if(args.command == "cook") {
        await message.reply('I don\'t cook! I\'m a scary and powerful fire demon!')
    }
    //(3) help Command
    if(args.command == "help"){
        await message.react('😡');
        await message.channel.send(`${message.author} Fine, like moving the castle isn\'t hard enough!`, helpEmbed);
    }
    
}
