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
exports.Pomodoro = void 0;
const discord_js_1 = require("discord.js");
let startEmbed = (time) => {
    return new discord_js_1.MessageEmbed()
        .setColor('#dc2f02')
        .setTitle('Pomodoro')
        .setTimestamp()
        .addFields({ name: `:tomato: Your timer is set to ${time} minutes :tomato:`, value: ':blush: Happy Studying! :blush:' });
};
let endEmbed = new discord_js_1.MessageEmbed()
    .setColor('#dc2f02')
    .setTitle('Pomodoro')
    .setTimestamp()
    .addFields({ name: `:tomato: Congrats on finishing a pomodoro session :tomato:`, value: ':blush: enjoy your break! :blush:' });
let removeMember = (array, author_tag) => {
    //console.log('function called');
    let index = array.indexOf(author_tag);
    if (index > -1) {
        return array.splice(index, 1);
    }
    return array;
};
let currentlyStudying = (author_tag) => {
    return (currentMembersStudying.find(member_tag => member_tag === author_tag)) ? true : false;
};
let currentMembersStudying = [];
let Pomodoro = (message, time) => __awaiter(void 0, void 0, void 0, function* () {
    let timer = (time && time <= 50 && time >= 10) ? time : 25;
    //console.log(timer);
    //check if currentlyStudying
    if (currentlyStudying(message.author.tag)) {
        //console.log(currentMembersStudying);
        return yield message.reply('You\'re already studying!');
    }
    //if not currentlyStudying start Pomodoro
    //(1) update currentMembersStudying
    currentMembersStudying.push(message.author.tag);
    //(2) send confirmation timer
    let errorMessage = (time && (time > 50 || time < 10)) ? 'timer specified is not within time limits, timer set to 25\n' : '';
    yield message.reply(errorMessage, startEmbed(timer));
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        yield message.channel.send(message.author, endEmbed);
        removeMember(currentMembersStudying, message.author.tag);
        //console.log(currentMembersStudying);
    }), 60000 * timer);
});
exports.Pomodoro = Pomodoro;
