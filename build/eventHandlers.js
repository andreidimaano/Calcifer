"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onMessage = void 0;
const discord_js_1 = require("discord.js");
const pomodoro_1 = require("./pomodoro/pomodoro");
let helpEmbed = new discord_js_1.MessageEmbed()
    .setColor('#dc2f02')
    .setTitle('Commands')
    .setDescription('Here are the list of commands available')
    .setURL('https://github.com/andreidimaano/Calcifer')
    .setFooter('Contact Andrei Dimaano (aka shaquilleoneil)')
    .setTimestamp()
    .addFields({ name: '\u200B', value: '\u200B' }, { name: 'c: help', value: 'lists commands' }, { name: '\u200B', value: '\u200B' }, { name: 'c: pomodoro', value: 'start 25 minute pomodoro timer' }, { name: '\u200B', value: '\u200B' }, { name: 'c: pomodoro [number]', value: 'start [number from 10 to 50] minute pomodoro timer' }, { name: '\u200B', value: '\u200B' });
const onMessage = (message, clientUser) => __awaiter(void 0, void 0, void 0, function* () {
    if (!message.guild)
        return;
    if (!canHandleMessage(message))
        return;
    let args = parseArguments(message.content);
    try {
        yield executeCommand(message, clientUser, args);
    }
    catch (error) {
        yield message.channel.send(error.message);
    }
});
exports.onMessage = onMessage;
let canHandleMessage = (message) => {
    return (!message.author.bot && message.content.startsWith('c: '));
};
let parseArguments = (messageContent) => {
    //remove command prefix
    let content = messageContent.slice(3);
    let args = content.split(' ').map((argument) => argument.trim());
    let time = (args.length >= 2) ? parseInt(args[1]) : undefined;
    //console.log(`args: ${args}`);
    return {
        command: args[0].toLowerCase(),
        time: time
    };
};
let executeCommand = (message, clientUser, args) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(args);
    //(1) no discord guild exists
    if (!message.guild)
        return;
    //(2) pomodoro Command
    if (args.command == "pomodoro") {
        yield pomodoro_1.Pomodoro(message, args.time);
    }
    //(3) cook Command for the memes
    if (args.command == "cook") {
        yield message.reply('I don\'t cook! I\'m a scary and powerful fire demon!');
    }
    //(3) help Command
    if (args.command == "help") {
        yield message.react('😡');
        yield message.channel.send(`${message.author} Fine, like moving the castle isn\'t hard enough!`, helpEmbed);
    }
});
