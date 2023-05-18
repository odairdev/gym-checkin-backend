import { MakeSearchGymUseCase } from "@/use-cases/factories/make-search-gyms-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

interface searchGymsQueryParams {
  query: string,
  page: number
}

export async function searchGyms(request: FastifyRequest<{ Querystring: searchGymsQueryParams}>, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1)
  })

  const { query, page } = searchGymsQuerySchema.parse(request.query)

  try {
    const searchGymsUseCase = MakeSearchGymUseCase()

    const gyms = await searchGymsUseCase.execute({query, page})

    return reply.status(200).send(gyms)
  } catch(err) {
    return reply.status(500)
  }
}