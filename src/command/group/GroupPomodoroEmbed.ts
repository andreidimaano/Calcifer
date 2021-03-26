import { MessageEmbed } from "discord.js"

export let startGroupEmbed = (time: number) => {
    return new MessageEmbed()
    .setColor('#dc2f02')
    .setTitle('Pomodoro')
    .setTimestamp(Date.now())
    .addFields(
        { name: `:tomato: Group Timer is set to ${time} minutes :tomato:`, value: ':blush: Happy Working Titans! :blush:'},
    )
}

export let endGroupEmbed = new MessageEmbed()
    .setColor('#dc2f02')
    .setTitle('Pomodoro')
    .setTimestamp()
    .addFields(
        { name: `:tomato: Congrats on finishing a Group pomodoro session :tomato:`, value: ':blush: enjoy your breaks! :blush:' }
    )