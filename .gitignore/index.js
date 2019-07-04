const Discord = require('discord.js'); 
const client = new Discord.Client();

const fs = require('fs');

client.login("NTgyMjU1MzU2MDAxMTI0NDAz.XPRsmg.b5UQxHsVIVZODmX8FCYmJ26K3Gc"); //mon token

client.commands = new Discord.Collection();
// pour faire une direction vers les autre dossier
fs.readdir("./Commandes/", (error, f) => {
    if(error) console.log(error);

    let commandes = f.filter(f => f.split(".").pop() === "js");
    if(commandes.length <= 0) return console.log("Aucune commande trouvée!");

    commandes.forEach((f) => {

        let commande = require(`./Commandes/${f}`);
        console.log(`${f} commande chargé!`);
    
    client.commands.set(commande.help.name, commande);
    });
});

fs.readdir("./Events/", (error, f) => {
    if(error) console.log(error);
    console.log(`${f.length} events en chargement`);

    f.forEach((f) => {
        const events = require(`./Events/${f}`);
        const event = f.split(".")[0];

    client.on(event, events.bind(null, client));
    });
});
