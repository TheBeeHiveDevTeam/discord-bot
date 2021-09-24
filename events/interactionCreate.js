const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const { staffcode } = require("../config.json");

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        console.log(interaction);
        console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);

        if (interaction.isSelectMenu()) {
            //Menu
            return;
        }

        if (interaction.isButton()) {
            if (interaction.customId == "removenasa") await interaction.reply({ content:"Remove button not working",ephemeral: true })
            return;
        }

        if (interaction.isCommand()) {
            //Slash commands

            const command = client.commands.get(interaction.commandName);
            console.log(interaction.commandName)
            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    },
};