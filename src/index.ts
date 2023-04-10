import dotenv from 'dotenv'
dotenv.config()

import fastify from 'fastify'
import autoLoad from '@fastify/autoload'
import { join } from 'path'

const app = fastify()

app.register(autoLoad, { dir: join(__dirname, "routes"), options: { prefix: "/api" }})

const init = async () => {
  const port = parseInt(process.env.PORT || "3000")
  const host = process.env.ADDRESS || "127.0.0.1"
  const address = await app.listen({ port, host })
  console.log(`Server launched on ${address}`)
}
init()