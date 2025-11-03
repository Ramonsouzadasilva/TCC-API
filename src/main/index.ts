import { Server } from "./server"

const bootstrap = async () => {
  const server = new Server()

  process.on("SIGINT", async () => {
    await server.shutdown()
    process.exit(0)
  })

  process.on("SIGTERM", async () => {
    await server.shutdown()
    process.exit(0)
  })

  await server.start()
}

bootstrap()
