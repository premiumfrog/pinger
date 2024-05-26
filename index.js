const {
  Client,
  GatewayIntentBits,
  Partials,
  SlashCommandBuilder,
  REST,
  Routes,
} = require("discord.js");
const { token, clientId, guildId } = require("./config.json");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

let pinging = false;
let intervalId = null;
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// Registering slash commands
const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Ping a user")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The user to ping")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("stopping")
    .setDescription("Stop pinging the user"),
].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === "ping") {
    const user = options.getUser("target");

    if (!pinging) {
      pinging = true;
      interaction.reply({
        content: `Started pinging ${user}`,
        ephemeral: true,
      });

      intervalId = setInterval(() => {
        interaction.channel.send(`${user}`);
      }, 3000); // Pings every 3 seconds
    } else {
      interaction.reply({
        content: `Already pinging ${user}`,
        ephemeral: true,
      });
    }
  } else if (commandName === "stopping") {
    if (pinging) {
      clearInterval(intervalId);
      pinging = false;
      interaction.reply({ content: "Stopped pinging", ephemeral: true });
    } else {
      interaction.reply({
        content: "No ongoing pinging to stop",
        ephemeral: true,
      });
    }
  }
});

client.login(token);
