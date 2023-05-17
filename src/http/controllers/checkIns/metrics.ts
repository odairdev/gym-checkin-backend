import { makeFetchMembersCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-members-checkIns-history-use-case";
import { makeGetUserMetricsUseCase } from "@/use-cases/factories/make-get-user-metrics-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";



export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getUserMetricsUseCase = makeGetUserMetricsUseCase()

    const { checkIns } = await getUserMetricsUseCase.execute({userId: request.user.sub})

    return reply.status(200).send(checkIns)
  } catch(err) {
    return reply.status(500)
  }
}