import { prefix } from "../constants";
import { Arguments } from "./MessageInvoker";

export let parseArguments = (messageContent: string) : Arguments => {
    //remove command prefix
    let content = messageContent.slice(prefix.length);
    let args = content.split(' ').map((argument) => argument.trim());
    let workTime = 0, breakTime = 0;
    let command = 'default';

    if(args.length == 4 && args[2] == 'break') {
        command = args[0].toLowerCase();
        let parsedWorkTime = parseInt(args[1]);
        let parsedBreakTime = parseInt(args[3]);
        workTime = (isNaN(parsedWorkTime)) ? 0 : parsedWorkTime;
        breakTime = (isNaN(parsedBreakTime)) ? 0 : parsedBreakTime;
    } 
    
    else if(args.length <= 2){
        command = args[0].toLowerCase();
        if(args.length > 1) {
            //case for pom pom macro
            if(typeof args[1] === "string" && isNaN(args[1] as any)){
                if(args[1] == 'pom'){
                    workTime = 50;
                }
            //case for pomodoro [time]
            } else {
                workTime = parseInt(args[1]);
            }
        }
    }

    
    return {
        command: command,
        workTime: workTime,
        breakTime: breakTime
    };
};
