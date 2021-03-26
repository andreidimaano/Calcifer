import { Message } from 'discord.js'
import { CancelGroup } from '../command/cancel/CancelGroup';
import { CancelPomodoro } from '../command/cancel/CancelPomodoro';
import { Cook } from '../command/cook/Cook';
import { Default } from '../command/default/Default';
import { GroupPomodoro } from '../command/group/GroupPomodoro';
import { Help } from '../command/help/help';
import { Pomodoro } from '../command/pomodoro/Pomodoro'
import { Productivity } from '../command/productivity/productivity';
import { prefix } from '../constants';
import { isGroupBreak } from '../database/resolvers/GroupBreakResolver';
import { groupExists } from '../database/resolvers/GroupPomodoroResolver';
import { isOnBreak } from '../database/resolvers/UserOnBreakResolver';
import { isWorking } from '../database/resolvers/UserStudyingResolver';
import { parseArguments } from './messageParser';

export interface Arguments {
    command: string | undefined;
    workTime?: number;
    breakTime?: number;
    isGroup?: boolean;
}

export const onMessage = async (message: Message ) : Promise<void> => {
    if (!message.guild) return;
    if (message.author.bot) return;
    if(!canHandleMessage(message)) return;
    let args = parseArguments(message.content.toLowerCase());

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
        case ('pom'):
        case ('pomodoro'): {
            let validPomodoro = await canStartPomodoro(message);
            if(validPomodoro) {
                (!args.workTime)? await Pomodoro(message, 25) : await Pomodoro(message, args.workTime, args.breakTime);
            }
            break;
        }
        case 'group' : {
            let validGroupPomodoro = await canStartGroup(message);
            if(validGroupPomodoro) {
                await GroupPomodoro(message, args.workTime, args.breakTime);
            }
            break;
        }
        case ('cancel'): {
            (args.isGroup) ? await CancelGroup(message) : await CancelPomodoro(message);
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

let canStartGroup = async (message: Message) => {
    let connected = message.member?.voice?.channelID;

    //check if groupPomodoro already exists in database
    let channelId = message.channel.id;
    let groupPomInProgress = await groupExists(channelId);
    let groupBreakInProgress = await isGroupBreak(channelId);
    if(groupPomInProgress) {
        await message.reply('Group Pomdoro in Progress');
        return false;
     } else if (groupBreakInProgress) {
        await message.reply('Group Break in Progress');
        return false;
    }else if(connected === null) {
        await message.reply('You are not connected to a voice channel');
        return false;
    } else if (!message.member?.voice?.channel?.name.includes('group')) {
        await message.reply('You are not connected to a group pomodoro voice channel');
        return false;
    } else if(message.channel.type === 'text' && !message.channel.name.includes('group')) {
        await message.reply('You can only start a group pomodoro in the group text channel');
        return false;
    }

    return true;
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
    return (!message.author.bot && message.content.toLowerCase().startsWith(prefix));
}



