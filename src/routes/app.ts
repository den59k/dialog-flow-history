import { FastifyInstance } from "fastify";
import { response } from "../utils/response";
import fs from 'fs'

export default async (fastify: FastifyInstance) => {

  fastify.get("/", async () => {
    return { status: "up" }
  })

  const personsInfo = JSON.parse(fs.readFileSync(process.cwd()+"/persons.json", "utf-8") || "{}")
  const personsMap = new Map()
  for (let [ key, value ] of Object.entries<any>(personsInfo)) {
    personsMap.set(key.toLowerCase(), value)
    for (let synonim of (value.synonym || [])) {
      personsMap.set(synonim.toLowerCase(), value)
    }
  }

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
      const person = personsMap.get(parameters.person.name.toLowerCase())
      if (person) {
        return response(person.about)
      }
      return response([
        `Я точно не знаю, но думаю, что ${parameters.person.name} - хороший человек!`
      ])
    }

    return response("Здесь просто тест")
  })

}