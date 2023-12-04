import { AttachmentBuilder, WebhookClient } from 'discord.js'
import ffmpeg from 'fluent-ffmpeg'

import { envSchema } from './zod'

envSchema.parse(process.env)

console.log('Start!')

const batchSize = 1000

const webhookClient = new WebhookClient({
  url: process.env.DISCORD_WEBHOOK_URL,
})

const rtsp = ffmpeg(process.env.RTSP_URL)
  .inputFormat('rtsp')
  .inputOptions('-rtsp_transport', 'tcp')
  .videoCodec('copy')
  .audioCodec('copy')
  .outputFormat('mpegts')
  .pipe()

let chunksLength = 0
const chunks: Buffer[] = []

rtsp.on('data', (chunk: Buffer) => {
  chunksLength++

  chunks.push(chunk)

  if (chunksLength % batchSize === 0) {
    sendWebHook(chunks)

    chunks.splice(0, chunks.length)
  }
})

rtsp.on('end', () => {
  if (chunks.length > 0) {
    sendWebHook(chunks)
  }
})

const sendWebHook = async (chunks: Buffer[]) => {
  const name = `${Date.now().toString()}.ts`

  const fileBlob = new Blob(chunks)

  const arrayBuffer = await fileBlob.arrayBuffer()

  const attachment = new AttachmentBuilder(Buffer.from(arrayBuffer), {
    name,
  })

  const message = await webhookClient.send({ files: [attachment] })

  console.log(`${message.author.username} ➡️ ${name}`)
}
