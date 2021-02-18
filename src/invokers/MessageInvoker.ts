import { Message } from 'discord.js'
import { CancelPomodoro } from '../command/cancel/CancelPomodoro';
import { Cook } from '../command/cook/Cook';
import { Default } from '../command/default/Default';
import { Help } from '../command/help/help';
import { PomodoroTimer } from '../command/pomodoro/pomodoroTimer'
import { Productivity } from '../command/productivity/productivity';
import { prefix } from '../constants';
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
            (!args.workTime) ? await PomodoroTimer(message, 25) : await PomodoroTimer(message, args.workTime, args.breakTime);
            break;
        }
        case ('pomodoro'): {
            (!args.workTime) ? await PomodoroTimer(message, 25) : await PomodoroTimer(message, args.workTime, args.breakTime);
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

let canHandleMessage = (message: Message) : boolean => {
    return (!message.author.bot && message.content.startsWith(prefix));
}



