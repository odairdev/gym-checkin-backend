import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { AuthenticationError } from "@/use-cases/errors/authentication-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true });

  try {
    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: request.user.sub,
        },
      }
    );

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: request.user.sub,
          expiresIn: "7d",
        },
      }
    );

    return reply
      .status(200)
      .setCookie("refreshToken:", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .send({ token });
  } catch (err) {
    if (err instanceof AuthenticationError) {
      return reply.status(403).send({ message: err.message });
    } else {
      return reply.status(500).send();
    }
  }
}
