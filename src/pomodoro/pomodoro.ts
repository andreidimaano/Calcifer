import { Message, User, MessageEmbed } from "discord.js";

let startEmbed = (time: number) => {
    return new MessageEmbed()
    .setColor('#dc2f02')
    .setTitle('Pomodoro')
    .setTimestamp()
    .addFields(
        { name: `:tomato: Your timer is set to ${time} minutes :tomato:`, value: ':blush: Happy Studying! :blush:'},
    )
}

let endEmbed = new MessageEmbed()
    .setColor('#dc2f02')
    .setTitle('Pomodoro')
    .setTimestamp()
    .addFields(
        { name: `:tomato: Congrats on finishing a pomodoro session :tomato:`, value: ':blush: enjoy your break! :blush:' }
    )

let removeMember = (array: string[], author_tag: string) :string[] => {
    console.log('function called');
    let index = array.indexOf(author_tag);
    if(index > -1) {
        return array.splice(index, 1);
    }

    return array;
};

let currentlyStudying = (author_tag: string) :boolean => {
    return (currentMembersStudying.find(member_tag => member_tag === author_tag)) ? true : false;
};

let currentMembersStudying: string[] = [];


export let Pomodoro = async ( message: Message, time?: number) => {
    let timer = (time && time <= 50 && time >= 10) ? time : 25
    
    console.log(timer);
    //check if currentlyStudying
    if(currentlyStudying(message.author.tag)) {
        console.log(currentMembersStudying);
        return await message.reply('You\'re already studying!');
    }
    
    //if not currentlyStudying start Pomodoro
    //(1) update currentMembersStudying
    currentMembersStudying.push(message.author.tag);
    //(2) send confirmation timer
    let errorMessage = (time && (time > 50 || time < 10)) ? 'timer specified is not within time limits, timer set to 25\n' : '';     
    await message.reply(errorMessage ,startEmbed(timer));

    setTimeout(async () => {
        await message.channel.send(message.author, endEmbed);
        removeMember(currentMembersStudying, message.author.tag);
        console.log(currentMembersStudying);
    }, 60000 * timer);
}



