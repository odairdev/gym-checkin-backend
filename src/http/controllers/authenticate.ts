import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { AuthenticationError } from "@/use-cases/errors/authentication-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const getAuthenticationBodySchema = z.object({
    email: z.string().email(),
    password: z.string()
  })

  const {email, password} = getAuthenticationBodySchema.parse(request.body)

  try {
    const authenticateUsecase = makeAuthenticateUseCase()

    await authenticateUsecase.execute({email, password})

    return reply.status(200).send()
  } catch(err) {
    if(err instanceof AuthenticationError) {
      return reply.status(403).send({ message: err.message})
    } else {
      return reply.status(500).send()
    }
  }
}