import { z } from 'zod'

export const envSchema = z.object({
  RTSP_URL: z.string(),
  DISCORD_WEBHOOK_URL: z.string(),
})

export type Env = z.infer<typeof envSchema>
