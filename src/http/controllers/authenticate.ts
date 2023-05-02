import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersReposiotory } from '@/repositories/prisma/prisma-users-repository'
import { z } from "zod";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { AuthenticationError } from "@/use-cases/errors/authentication-error";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const getAuthenticationBodySchema = z.object({
    email: z.string().email(),
    password: z.string()
  })

  const {email, password} = getAuthenticationBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersReposiotory()
    const authenticateUsecase = new AuthenticateUseCase(usersRepository)

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