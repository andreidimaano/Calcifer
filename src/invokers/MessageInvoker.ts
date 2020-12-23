import { Message } from 'discord.js'
import { CancelPomodoro } from '../command/cancel/CancelPomodoro';
import { Cook } from '../command/cook/Cook';
import { Default } from '../command/default/Default';
import { Help } from '../command/help/Help';
import { Pomodoro } from '../command/pomodoro/Pomodoro'

interface Arguments {
    command: string | undefined;
    time?: number;
    //add other arguments later
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

    console.log(args);
    switch(args.command) {
        case ('pom'): {
            (!args.time) ? await Pomodoro(message, 25) : await Pomodoro(message, args.time);
            break;
        }
        case ('pomodoro'): {
            (!args.time) ? await Pomodoro(message, 25) : await Pomodoro(message, args.time);
            break;
        }
        case ('cancel'): {
            await CancelPomodoro(message);
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
    return (!message.author.bot && message.content.startsWith('c: '));
}

let parseArguments = (messageContent: string) : Arguments => {
    //remove command prefix
    let content = messageContent.slice(3);
    let args = content.split(' ').map((argument) => argument.trim());
    let time = undefined;
    let command = undefined;

    if(args.length <= 2){
        command = args[0].toLowerCase();
        if(args.length > 1) {
            //case for pom pom macro
            if(typeof args[1] === "string" && isNaN(args[1] as any)){
                if(args[1] == 'pom'){
                    time = 50;
                }
            //case for pomodoro [time]
            } else {
                time = parseInt(args[1]);
            }
        }
    }
    return {
        command: command,
        time: time
    };
};

