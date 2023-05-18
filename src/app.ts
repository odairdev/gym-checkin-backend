import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { ZodError } from 'zod'
import { UserRoutes } from "./http/controllers/users/usersRoutes";
import { env } from "./env";
import { GymsRoutes } from "./http/controllers/gyms/gymsRoutes";
import { CheckInRoutes } from "./http/controllers/checkIns/checkInRoutes";

const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false
  },
  sign: {
    expiresIn: '10m'
  }
})

app.register(fastifyCookie)

app.register(UserRoutes, {
  prefix: '/users'
})

app.register(GymsRoutes, {
  prefix: '/gyms'
})

app.register(CheckInRoutes, {
  prefix: '/checkin'
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