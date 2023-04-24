import { register } from '@/http/controllers/register'
import { FastifyInstance} from 'fastify'

export async function UserRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    return reply.send({
      message: "Working"
    })
  })

  app.post('/', register)
}