import { FastifyInstance } from "fastify";
import { createGym } from "./createGym";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export async function GymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT)
  
  app.post('/', createGym)
}