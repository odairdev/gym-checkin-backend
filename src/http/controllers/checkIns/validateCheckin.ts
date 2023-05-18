
import { LateCheckInValidationError } from "@/use-cases/errors/late-check-in-validation-error";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeValidateCheckInUseCase } from "@/use-cases/factories/make-validate-checkIn-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";



export async function validateCheckin(request: FastifyRequest, reply: FastifyReply) {
  const createCheckinBodySchema = z.object({
    checkInId: z.string().uuid()
  })

  const { checkInId } = createCheckinBodySchema.parse(request.params)

  try {
    const validateCheckInUseCase = makeValidateCheckInUseCase()

    await validateCheckInUseCase.execute({checkInId})

    return reply.status(204)
  } catch(err) {
    if(err instanceof ResourceNotFoundError || err instanceof LateCheckInValidationError) {
      return reply.status(400).send({message: err.message})
    } else {
     return reply.status(500)
    }
  }
}