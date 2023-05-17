import { makeFetchMembersCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-members-checkIns-history-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

interface checkinHistoryQueryParams {
  page: number
}

export async function checkinHistory(request: FastifyRequest<{ Querystring: checkinHistoryQueryParams}>, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1)
  })

  const { page } = searchGymsQuerySchema.parse(request.query)

  try {
    const fetchMembersCheckInUseCase = makeFetchMembersCheckInsHistoryUseCase()

    const { checkIns } = await fetchMembersCheckInUseCase.execute({userId: request.user.sub, page})

    return reply.status(200).send(checkIns)
  } catch(err) {
    return reply.status(500)
  }
}