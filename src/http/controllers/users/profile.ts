import { makeGetUserProfileUseCase } from "@/use-cases/factories/make-get-user-profile-use-case";
import { FastifyReply, FastifyRequest } from "fastify";


export async function profile(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getUserProfileUseCase = makeGetUserProfileUseCase()
    const { user } = await getUserProfileUseCase.execute(request.user.sub)

    return reply.status(200).send({
      user: {
        ...user,
        password_hash: undefined
      }
    })
  } catch(err) {
    throw new Error('Not Found')
  }
}