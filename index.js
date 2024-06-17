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

const yourUserId = "1148829804527890483"; // Put your useridhere! 

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options, user } = interaction;
  const userId = user.id;

  if (userId !== yourUserId) {
    interaction.reply({
      content: "You are not authorized to use this command.",
      ephemeral: true,
    });
    return;
  }

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
      }, 1000);
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
