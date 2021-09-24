const Discord = require('discord.js');
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'],intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { token } = require('./config.json');
const fs = require('fs');

//http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&Format=Png&username=
//https://api.roblox.com/users/get-by-username?username=
//After = put user name

//Slash command loading
require("./slash");
//require("./slash2");


client.commands = new Collection();

const _commandFiles = fs.readdirSync('./slash').filter(file => file.endsWith('.js'));
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of _commandFiles) {
	const command = require(`./slash/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	console.log(command);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}


client.login(token);
