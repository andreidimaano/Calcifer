import { Message } from 'discord.js'
import { CancelPomodoro } from '../command/cancel/CancelPomodoro';
import { Cook } from '../command/cook/Cook';
import { Default } from '../command/default/Default';
import { Help } from '../command/help/help';
import { Pomodoro } from '../command/pomodoro/Pomodoro'
import { Productivity } from '../command/productivity/productivity';
import { prefix } from '../constants';
import { isOnBreak } from '../database/resolvers/UserOnBreakResolver';
import { isWorking } from '../database/resolvers/UserStudyingResolver';
import { parseArguments } from './messageParser';

export interface Arguments {
    command: string | undefined;
    workTime?: number;
    breakTime?: number;
}

export const onMessage = async (message: Message ) : Promise<void> => {
    if (!message.guild) return;
    if (message.author.bot) return;
    if(!canHandleMessage(message)) return;
    let args = parseArguments(message.content);

    try {
        await executeCommand(message, args);
    } catch (error) {
        await message.channel.send(error.message);
    }

}

let executeCommand = async (message: Message, args: Arguments) => {
    //(1) no discord guild exists
    if(!message.guild) return;

    console.log(`author: ${message.author.tag}`);
    console.log('args: ', args);
    switch(args.command) {
        case ('pom'): {
            let validPomodoro = await canStartPomodoro(message);
            (!args.workTime && validPomodoro) ? await Pomodoro(message, 25) : await Pomodoro(message, args.workTime, args.breakTime);
            break;
        }
        case ('pomodoro'): {
            let validPomodoro = await canStartPomodoro(message);
            (!args.workTime && validPomodoro) ? await Pomodoro(message, 25) : await Pomodoro(message, args.workTime, args.breakTime);
            break;
        }
        case ('cancel'): {
            await CancelPomodoro(message);
            break;
        }
        case ('productivity'): {
            await Productivity(message);
            break;
        }
        case 'cook' : {
            await Cook(message);
            break;
        }
        case 'help' : {
            await Help(message);
            break;
        }
        default: {
            await Default(message);
        }
    }
    
}

let canStartPomodoro = async (message: Message) => {
    let authorId = message.author.id;
    let currentlyWorking = await isWorking(authorId);
    if(currentlyWorking) {
        await message.reply('You\'re already working!');
        return false;
    }

    let currentlyOnBreak = await isOnBreak(authorId);
    if(currentlyOnBreak) {
        await message.reply('You\'re on break!');
        return false;
    }

    return true;
}


let canHandleMessage = (message: Message) : boolean => {
    return (!message.author.bot && message.content.startsWith(prefix));
}



