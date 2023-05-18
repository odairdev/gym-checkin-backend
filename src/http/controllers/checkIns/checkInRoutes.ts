import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { createCheckIn } from "./createCheckIn";
import { validateCheckin } from "./validateCheckin";
import { checkinHistory } from "./checkinHistory";
import { metrics } from "./metrics";

export async function CheckInRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT)
  
  app.post('/:gymId/create', createCheckIn)
  app.patch('/:checkInId/validate', validateCheckin)
  app.get('/history', checkinHistory)
  app.get('/metrics', metrics)
}