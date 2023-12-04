# rtsp-to-discord

This project uses [Bun](https://bun.sh). It streams video chunks from an RTSP source to a Discord channel using a webhook.

## Getting Started

1. 🛠️ Install dependencies:

    ```bash
    bun install
    ```

2. 📝 Set up your environment variables in a `.env` file:

    ```env
    RTSP_URL="your_rtsp_stream_url_here"
    DISCORD_WEBHOOK_URL="your_discord_webhook_url_here"
    ```

3. ▶️ Run the project:

    ```bash
    bun run index.ts
    ```

## Dependencies

- [Zod](https://github.com/colinhacks/zod) - Used for validation of environment variables.
- [FFmpeg](https://ffmpeg.org/) - Handles the RTSP stream and formats it into MPEGTS.
- [Discord.js](https://discord.js.org/) - Utilized for interacting with Discord via webhooks.

## Usage

The application sends video chunks smaller than 25MB to a Discord channel via a webhook. Adjust the `batchSize` variable in the code to control the size of chunks.

Feel free to modify the code according to your specific requirements.

**Note**: Ensure that your RTSP stream and Discord webhook URLs are correctly configured in the `.env` file.

## License

This project is licensed under the [MIT License](LICENSE).



