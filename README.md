# A Discord Spam Pinging bot

A simple Discord bot that pings a specified user until you run a stop command. Made to get someone's attention and ask them a question.

![Ping Bot](https://github.com/premiumfrog/pinger/assets/128558360/58939ef1-f787-4271-b9ee-565b87352530)

## Features

- Pings a user every few seconds
- Stops pinging when you run the stop command
- Built with `discord.js` and `node.js`
- Ability to set it to your own userid to allow only you to initiate the pings

## Prerequisites

- Have [Node.js](https://nodejs.org/) Have installed on your machine
- A Discord bot token. You can get one from the [Discord Developer Portal](https://discord.com/developers/applications)

## Setup

1. **Clone the repository:**

    ```sh
    git clone https://github.com/premiumfrog/pinger.git
    cd pinger
    ```

2. **Install the required dependencies:**

    ```sh
    npm install discord.js
    ```

3. **Update the `config.json` file in the directory with your bot token, client ID, and guild ID:**

    ```json
    {
      "token": "YOUR_BOT_TOKEN",
      "clientId": "YOUR_CLIENT_ID",
      "guildId": "YOUR_GUILD_ID"
    }
    ```

    Replace `YOUR_BOT_TOKEN`, `YOUR_CLIENT_ID`, and `YOUR_GUILD_ID` with your bot's token, client ID, and the ID of the guild where you want to register the command.

4. **Run the bot:**

    ```sh
    node bot.js
    ```

## Usage

1. **Start annoying the fuck out of someone:**

    Use the `/ping` command followed by the username or Discord ID of the user you want to ping.

    ```
    /ping @username
    ```

2. **Stop pinging the user:**

    Use the `/stopping` command to stop the pinging.

    ```
    /stopping
    ```


