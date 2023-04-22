import { mkdir } from 'fs/promises'
import { Context, Schema } from 'koishi'
import { join } from 'path'
import { writeHeapSnapshot } from 'v8'

export const name = 'heapsnapshot'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  ctx
    .command('heapsnapshot', {
      authority: 4,
    })
    .action(async ({ session }) => {
      await session.send('Generating heap snapshot...')

      const dir = join(process.cwd(), 'data/dumps')
      const fileName = `${new Date().getTime()}.heapsnapshot`
      const filePath = join(dir, fileName)

      await mkdir(dir, { recursive: true })

      writeHeapSnapshot(filePath)

      return `Generated at: data/dumps/${fileName}`
    })
}
