module.exports = {
    name: "messageCreate",
    execute(message, client, command) {
        //get prefix from config.json
        const {prefix} = require("../config.json");
        if (message.author.bot) return;
        if (message.channel.type === "dm") return channel.send("You can't use commands in DMs!");
        if (message.author.id == "761303183350956112") {
            //Find channel ID
            let channel2 = client.channels.cache.get("890767208597295114");
            //Send message
            channel2.send(message.author.username+" said:\n"+message.content);
        }

        //Check if the message starts with the prefix
        if (message.content.startsWith(prefix)) {
            //Get the command and the args
            let command = message.content.split(" ")[0].slice(prefix.length);
            let args = message.content.split(" ").slice(1);
            //Find command in command.json
            let cmd = client.commands.get(command);
            if (cmd) {
                cmd.execute(client, message, args);
            } else {
                //Send message
                message.channel.send("Command ``"+command+"`` not found!");
            }
            /*
            if (cmd) {
                //Check if the command is enabled
                if (cmd.enabled) {
                    //Check if the command is in the guild
                    if (cmd.guildOnly && message.channel.type === "text") {
                        //Check if the user has the permission
                        if (message.member.hasPermission(cmd.permissions)) {
                            //Check if the command is in cooldown
                            if (cmd.cooldown.has(message.author.id)) {
                                //Send message
                                message.channel.send(`You need to wait ${cmd.cooldown.get(message.author.id) - Date.now()} more milliseconds to use this command.`);
                            } else {
                                //Run the command
                                cmd.run(client, message, args);
                                //Add the user to the cooldown
                                cmd.cooldown.set(message.author.id, Date.now() + cmd.cooldownTime);
                            }
                        } else {
                            //Send message
                            message.channel.send("You don't have the permission to use this command.");
                        }
                    } else {
                        //Run the command
                        cmd.run(client, message, args);
                        //Add the user to the cooldown
                        cmd.cooldown.set(message.author.id, Date.now() + cmd.cooldownTime);
                    }
                } else {
                    //Send message
                    message.channel.send("This command is disabled.");
                }
            } else {
                //Send message
                message.channel.send("This command doesn't exist.");
            }
            */
        }
    }
};