const Discord = require('discord.js');
require('dotenv').config()
const bot = new Discord.Client();
const maps = ['Inferno', 'Train', 'Mirage', 'Nuke', 'Overpass', 'Dust 2', 'Vertigo', 'Cache'];
var currentPlayers = [];
bot.login(process.env.BOT_TOKEN);

bot.on('ready', () => {
    console.log(`${bot.user.tag} logged in.`)
})

bot.on('message', msg => {
    switch(msg.content.toLowerCase()) {
        case "!scrim":
            generateScrim(msg.member.voice.channel, msg.channel);
            break;
        case "!teams":
            console.log(currentPlayers);
            msg.channel.send(shuffleUnevenTeams(currentPlayers));
            break;
        case "!map":
            msg.channel.send(`Map: ${randomizeMap()}`);
    }
})

function shuffleUnevenTeams(players) {
    for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = players[i];
        players[i] = players[j];
        players[j] = temp;
    }
    const teams = {Team1: players.slice(0,5).join(', '), Team2: players.slice(5,10).join(', ') }
    return `Team 1: ${teams.Team1} \nTeam 2: ${teams.Team2}`
}

function generateScrim(voiceChannel, textChannel) {
    const players = getMembersInVoiceChannel(voiceChannel);
    currentPlayers=players;
    const teams = randomizeTeams(players);
    const map = randomizeMap();
    textChannel.send(`Team 1: ${teams.Team1}\nTeam 2: ${teams.Team2}\n\nMap: ${map}`);
}

function getMembersInVoiceChannel(channel) {
    return channel.members.map(member => member.user.username);
}

function randomizeTeams(members) {
    for (var i = members.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = members[i];
        members[i] = members[j];
        members[j] = temp;
    }
    return {Team1: members.slice(0,5), Team2: members.slice(5,10) }
}

function randomizeMap() {
    return maps[Math.floor(Math.random() * (maps.length))];
}