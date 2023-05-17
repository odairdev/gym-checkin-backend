import fastify from "fastify";
import { ZodError } from 'zod'
import { UserRoutes } from "./http/controllers/users/usersRoutes";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { GymsRoutes } from "./http/controllers/gyms/gymsRoutes";

const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET
})

app.register(UserRoutes, {
  prefix: '/users'
})

app.register(GymsRoutes, {
  prefix: '/gyms'
})

app.setErrorHandler((error, request, reply) => {
  if(error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.format()})
  }

  if(env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({message: 'Internal server error.'})
})

export {app}