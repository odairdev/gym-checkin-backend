import fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import { UserRoutes } from "./routes/users";

const app = fastify()

app.register(UserRoutes, {
  prefix: '/users'
})

const prisma = new PrismaClient()

export {app}