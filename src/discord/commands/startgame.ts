import {Command} from "../command";
import {Message, Client, RichEmbed} from 'discord.js';

const condition = (message: Message, args: Array<string>, client: Client, data?: any) => {
    return message.member.roles.some(i => i.name === "Admin" || i.name === "Officer");
};

const started = function (message: Message): RichEmbed {
    return new RichEmbed({
        title: 'Harbinger Admin | Game Started',
        description: `Starting the game. Added Human to all members.

        *Welcome to the apocalypse. Good luck surviving.*
        `
    }).setColor(message.guild.roles.find('name', 'Admin').color);
};

const execute = async (message: Message, args: Array<string>, client: Client, data?: any) => {
    for (const member of message.guild.members) {
        if (member[1].roles.some(i => i.name === 'Admin')) {
            continue;
        }

        await member[1].addRole(message.guild.roles.find(i => i.name === "Human"));

        let roles = message.guild.roles.filter(i => i.name.toLowerCase() === "Zombie" ||
            i.name.toLowerCase() === "Plague Zombie" ||
            i.name.toLowerCase() === "Radiation Zombie");
        await member[1].removeRoles(roles);
    }
    message.channel.send(started(message));
};


const startgame = new Command('startgame', condition, execute, ['begingame']);

export default startgame;