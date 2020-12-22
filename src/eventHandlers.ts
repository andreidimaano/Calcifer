import {Message, User, Guild, MessageEmbed } from 'discord.js'
import { Cook } from './command/cook/Cook';
import { Default } from './command/default/Default';
import { helpEmbed } from './command/help/Help';
import { Pomodoro } from './command/pomodoro/Pomodoro'

interface Arguments {
    command: string;
    time?: number;
    //add other arguments later
}

export const onMessage = async (message: Message ) : Promise<void> => {
    if (!message.guild) return;
    if(!canHandleMessage(message)) return;
    let args = parseArguments(message.content);

    try {
        await executeCommand(message, args);
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
    
    let time = undefined;
    if(args.length >= 2) {
        if(typeof args[1] === "string" && isNaN(args[1] as any)){
            if(args[1] == 'pom'){
                time = 50;
            }
        } else {
            time = parseInt(args[1]);
        }
    }
    return {
        command: args[0].toLowerCase(),
        time: time
    };
};

let executeCommand = async (message: Message, args: Arguments) => {
    //(1) no discord guild exists
    if(!message.guild) return;

    switch(args.command) {
        case 'pomodoro': {
            await Pomodoro(message, args.time);
            break;
        }
        case 'pom' : {
            console.log(args);
            (!args.time) ? await Pomodoro(message, 25) : await Pomodoro(message, args.time);
            break; 
        }
        case 'cook' : {
            await Cook(message);
            break;
        }
        case 'help' : {
            await message.react('😡');
            await message.channel.send(
                `${message.author} Fine, like moving the castle isn\'t hard enough!`, 
                helpEmbed
            );
            break;
        }
        default : {
            await Default(message);
        }
    }
    
}
