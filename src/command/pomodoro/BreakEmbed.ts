import { MessageEmbed } from "discord.js"

export let startBreakEmbed = (time: number) => {
    return new MessageEmbed()
    .setColor('#dc2f02')
    .setTitle('Pomodoro')
    .setTimestamp()
    .addFields(
        { name: `:timer: Your break timer is set to ${time} minutes :timer:`, value: 'Type c: cancel if you\'d like to cancel your break'},
    )
}

export let endBreakEmbed = new MessageEmbed()
    .setColor('#dc2f02')
    .setTitle('Pomodoro')
    .setTimestamp()
    .addFields(
        { name: `:timer: Your break has finished! :timer:`, value: ':blush: Hope you enjoyed your break! :blush:' }
    )