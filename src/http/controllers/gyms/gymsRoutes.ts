import { FastifyInstance } from "fastify";
import { createGym } from "./createGym";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { searchGyms } from "./searchGyms";
import { nearbyGyms } from "./nearbyGyms";
import { verifyRole } from "@/http/middlewares/verify-role";

export async function GymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT)
  
  app.post('/', {onRequest: verifyRole('ADMIN')}, createGym)
  app.get('/search', searchGyms)
  app.post('/nearby', nearbyGyms)
}