import { makeFetchNearbyGymsUseCase } from "@/use-cases/factories/make-fetch-nearby-gyms";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function nearbyGyms(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymBodySchema = z.object({
    userLatitude: z.coerce.number(),
    userLongitude: z.coerce.number()
  })

  const { userLatitude, userLongitude } = nearbyGymBodySchema.parse(request.body)

  try {
    const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()

    const gyms = await fetchNearbyGymsUseCase.execute({userLatitude, userLongitude})

    return reply.status(200).send(gyms)
  } catch(err) {
    return reply.status(500)
  }
}