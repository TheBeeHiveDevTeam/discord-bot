const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = require('./config.json');
const fs = require('fs');

const { clientId, guildId } = require("./config.json")

const commands = [];
const commandFiles = fs.readdirSync('./slash').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./slash/${file}`);
	console.log(command)

	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');
		console.log(commands)
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
