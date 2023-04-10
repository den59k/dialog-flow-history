import { FastifyInstance } from "fastify";
import { response } from "../utils/response";

export default async (fastify: FastifyInstance) => {

  fastify.get("/", async () => {
    return { status: "up" }
  })

  fastify.post("/request", async (req) => {

    const body = req.body as any
    const {action, parameters} = body.queryResult

    if (action === "electricOnOff") {
      const on = parameters.action === "enable"
      return response([
        `Хорошо, ${on? "включаю": "выключаю"} ${parameters.electric}`,
        `${on? "Включаю": "Выключаю"} ${parameters.electric}`,
        `Окей, ${parameters.electric} ${on? "выключен": "включен"}`
      ])
    }

    if (action === "whoIs") {
      return response([
        `Я точно не знаю, но думаю, что ${parameters.person} - хороший человек!`
      ])
    }

    return response("Здесь просто тест")
  })

}