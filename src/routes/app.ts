import { FastifyInstance } from "fastify";

export default async (fastify: FastifyInstance) => {

  fastify.get("/", async () => {
    return { status: "up" }
  })

  fastify.post("/request", async (req) => {
    console.log(req.body)

    return { status: "ok" }
  })

}